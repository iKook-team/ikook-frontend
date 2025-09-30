"use client";

import type { MarketCode } from "./market";

import React from "react";

const MARKET_COOKIE = "ikook_market";
const MARKET_SRC_COOKIE = "ikook_market_src"; // 'auto' | 'user'

export type MarketContextValue = {
  market: MarketCode;
  setMarket: (m: MarketCode) => void;
};

const MarketContext = React.createContext<MarketContextValue | undefined>(
  undefined,
);

function readMarketFromCookie(): MarketCode {
  if (typeof document === "undefined") return "GB";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${MARKET_COOKIE}=`));
  const value = match?.split("=")[1];

  if (value === "NG" || value === "GB" || value === "ZA") return value;

  return "GB";
}

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [market, setMarket] = React.useState<MarketCode>("GB");

  React.useEffect(() => {
    setMarket(readMarketFromCookie());
  }, []);

  // Client-side fallback: try to refine using ipapi, but do not override explicit user choice
  React.useEffect(() => {
    let cancelled = false;

    async function refineFromIp() {
      try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 1500);
        const res = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
        });

        clearTimeout(t);
        if (!res.ok) return;
        const data = (await res.json()) as { country_code?: string };
        const code = (data.country_code || "").toUpperCase();

        if (!code) return;
        const next =
          code === "NG" || code === "ZA" || code === "GB"
            ? (code as MarketCode)
            : "GB";

        if (!cancelled && next !== market) {
          setMarket(next);
          document.cookie = `ikook_market=${next}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`;
          // mark as auto so future sessions know it wasn't an explicit user choice
          document.cookie = `${MARKET_SRC_COOKIE}=auto; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`;
        }
      } catch {
        // ignore
      }
    }
    // Only attempt refinement if currently GB (default) AND there isn't a user override cookie
    const src =
      typeof document !== "undefined"
        ? document.cookie
            .split("; ")
            .find((r) => r.startsWith(`${MARKET_SRC_COOKIE}=`))
            ?.split("=")[1]
        : undefined;
    const userOverrode = src === "user";

    if (market === "GB" && !userOverrode) {
      refineFromIp();
    }

    return () => {
      cancelled = true;
    };
  }, [market]);

  const value = React.useMemo(() => ({ market, setMarket }), [market]);

  return (
    <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
  );
}

export function useMarket(): MarketContextValue {
  const ctx = React.useContext(MarketContext);

  if (!ctx) throw new Error("useMarket must be used within MarketProvider");

  return ctx;
}
