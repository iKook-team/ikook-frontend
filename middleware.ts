import { NextRequest, NextResponse } from "next/server";

import { mapCountryCodeToMarket } from "./lib/market";

// Cookie name for storing the market
const MARKET_COOKIE = "ikook_market";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const override = url.searchParams.get("market");

  if (override === "NG" || override === "GB" || override === "ZA") {
    const res = NextResponse.next();

    res.cookies.set(MARKET_COOKIE, override, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false,
      sameSite: "lax",
    });
    // Clean the URL (remove query) by redirecting
    url.searchParams.delete("market");

    return NextResponse.redirect(url);
  }
  // If cookie already set, continue
  const existing = req.cookies.get(MARKET_COOKIE)?.value;

  if (existing === "NG" || existing === "GB" || existing === "ZA") {
    return NextResponse.next();
  }

  // Try common edge headers first
  let country =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    undefined;

  // Fallback for local/dev or providers without geo headers: public IP lookup
  if (!country) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1200); // ~1.2s safety
      const res = await fetch("https://ipapi.co/json/", {
        signal: controller.signal,
      });

      clearTimeout(timeout);
      if (res.ok) {
        const data = (await res.json()) as { country_code?: string };

        country = (data.country_code || "").toUpperCase() || undefined;
      }
    } catch {
      // ignore and fall back to default GB below
    }
  }

  let market = mapCountryCodeToMarket(country);

  // Dev-friendly default if configured
  if (!country) {
    const devDefault = process.env.NEXT_PUBLIC_DEFAULT_MARKET;

    if (devDefault === "NG" || devDefault === "GB" || devDefault === "ZA") {
      market = devDefault;
    }
  }

  const res = NextResponse.next();

  res.cookies.set(MARKET_COOKIE, market, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: false,
    sameSite: "lax",
  });
  // Debug headers to verify detection in DevTools Network tab
  if (country) res.headers.set("x-ikook-country", country);
  res.headers.set("x-ikook-market", market);

  return res;
}

export const config = {
  matcher: ["/:path*"],
};
