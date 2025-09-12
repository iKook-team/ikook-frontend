"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useMarket } from "@/lib/market-context";
import type { MarketCode } from "@/lib/market";

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
  const { market } = useMarket();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    () => COUNTRIES.find((c) => c.code === market) || COUNTRIES[1]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync UI when market changes elsewhere
  useEffect(() => {
    const next = COUNTRIES.find((c) => c.code === market);
    if (next && next.code !== selectedCountry.code) {
      setSelectedCountry(next);
    }
  }, [market]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center space-x-2 px-2 py-1 rounded select-none cursor-default"
        aria-label={`Selected country: ${selectedCountry.name}. Country selection is disabled.`}
      >
        <span className="text-lg" aria-hidden="true">
          {selectedCountry.flag}
        </span>
        <span className="text-ikook-secondary text-sm font-medium">
          {selectedCountry.name}
        </span>
        <ChevronDown className="w-3 h-3 text-ikook-secondary opacity-40" aria-hidden="true" />
      </div>
    </div>
  );
};
