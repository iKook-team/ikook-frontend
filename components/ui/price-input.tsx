"use client";

import React from "react";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";

interface PriceInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  currency?: string; // Optional override for currency symbol
}

export const PriceInput: React.FC<PriceInputProps> = ({
  label,
  placeholder = "Price per person",
  value,
  onChange,
  currency: currencyProp,
  className = "",
}) => {
  const { market } = useMarket();
  const marketConfig = getMarketConfig(market);
  const currencySymbol = currencyProp || marketConfig.currencySymbol;

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{currencySymbol}</span>
        </div>
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="block w-full pl-7 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
