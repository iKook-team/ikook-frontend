"use client";

import type { MarketCode } from "@/lib/market";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useMarket } from "@/lib/market-context";

type Country = {
  code: string;
  name: string;
  flag: string;
};

const COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
];

export const LocationSelector: React.FC = () => {
  const { market, setMarket } = useMarket();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    () => COUNTRIES.find((c) => c.code === market) || COUNTRIES[1],
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync UI when market changes elsewhere
  useEffect(() => {
    const next = COUNTRIES.find((c) => c.code === market);

    if (next && next.code !== selectedCountry.code) {
      setSelectedCountry(next);
    }
  }, [market]);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onDocClick);
    }

    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const setMarketCookie = (code: MarketCode) => {
    try {
      document.cookie = `ikook_market=${code}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`;
      document.cookie = `ikook_market_src=user; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    } catch {
      // ignore cookie errors
    }
  };

  const onSelect = (country: Country) => {
    setSelectedCountry(country);
    const code = country.code as MarketCode;

    setMarket(code);
    setMarketCookie(code);
    setOpen(false);

    // If user switched country while on the explore page, navigate back to home
    if (pathname && pathname.startsWith("/explore")) {
      router.push("/");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-50 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCC01C]"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Selected country: ${selectedCountry.name}. Click to change country.`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <span className="text-lg" aria-hidden="true">
          {selectedCountry.flag}
        </span>
        <span className="text-ikook-secondary text-sm font-medium">
          {selectedCountry.name}
        </span>
        <ChevronDown
          className="w-3 h-3 text-ikook-secondary"
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select country"
          className="absolute right-0 mt-1 w-48 rounded-md border bg-white shadow-lg z-50 py-1"
        >
          {COUNTRIES.map((c) => (
            <li
              key={c.code}
              role="option"
              aria-selected={c.code === selectedCountry.code}
            >
              <button
                type="button"
                className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-50 ${
                  c.code === selectedCountry.code ? "bg-gray-50" : ""
                }`}
                onClick={() => onSelect(c)}
              >
                <span className="text-lg" aria-hidden>
                  {c.flag}
                </span>
                <span className="text-sm text-ikook-secondary">{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
