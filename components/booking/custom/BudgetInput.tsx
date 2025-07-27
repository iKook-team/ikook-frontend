"use client";
import * as React from "react";

interface BudgetInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const BudgetInput: React.FC<BudgetInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <div className="w-full max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <label
            htmlFor="budget"
            className="text-base font-medium text-neutral-700"
          >
            Your Budget
          </label>
          <div className="flex flex-wrap mt-1.5 w-full text-base whitespace-nowrap bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Gray-100,#CFCFCE)] max-md:max-w-full">
            <div className="self-start py-2.5 pr-3 pl-3.5 rounded-lg text-neutral-700">
              £
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="overflow-hidden flex-1 shrink gap-2 self-stretch px-3.5 py-2.5 h-full bg-white rounded-none border border-solid basis-0 border-[color:var(--Gray-100,#CFCFCE)] min-w-60 text-stone-950 max-md:max-w-full outline-none"
              placeholder="1,500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
