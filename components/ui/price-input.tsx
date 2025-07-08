"use client";

import React from "react";

interface PriceInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  currency?: string;
  className?: string;
}

export const PriceInput: React.FC<PriceInputProps> = ({
  label,
  placeholder = "Price per person",
  value,
  onChange,
  currency = "£",
  className = "",
}) => {
  return (
    <div className={`max-w-full w-[615px] ${className}`}>
      <div className="w-full max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <label className="text-base font-medium text-neutral-500">
            {label}
          </label>
          <div className="flex flex-wrap mt-1.5 w-full bg-white rounded-lg border border-solid shadow-sm border-stone-300 max-md:max-w-full">
            <div className="flex items-center self-start py-2.5 pr-3 pl-3.5 text-base whitespace-nowrap rounded-lg text-neutral-700">
              <div className="self-stretch my-auto text-neutral-700">
                {currency}
              </div>
            </div>
            <div className="flex overflow-hidden flex-1 shrink gap-2 items-center px-3.5 py-2.5 h-full text-base bg-white rounded-none border border-solid basis-0 border-stone-300 min-w-60 text-neutral-500 max-md:max-w-full">
              <input
                type="number"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 max-md:max-w-full bg-transparent border-none outline-none placeholder-neutral-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
