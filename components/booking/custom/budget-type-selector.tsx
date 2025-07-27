"use client";
import * as React from "react";

interface BudgetTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const BudgetTypeSelector: React.FC<BudgetTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="self-start mt-7">
      <label
        htmlFor="budgetType"
        className="text-base font-medium text-neutral-700"
      >
        Budget type
      </label>
      <div className="flex flex-col mt-4">
        <div className="flex gap-3 items-center">
          <div className="flex justify-center items-center self-stretch my-auto w-5">
            <input
              type="radio"
              name="budgetType"
              value="flexible"
              checked={selectedType === "flexible"}
              onChange={(e) => onTypeChange(e.target.value)}
              className="flex self-stretch my-auto w-5 h-5 bg-white rounded-xl border border-solid border-[color:var(--Gray-100,#CFCFCE)] min-h-5"
            />
          </div>
          <label
            htmlFor="budgetType"
            className="self-stretch my-auto text-base font-medium text-slate-700"
          >
            Flexible
          </label>
        </div>
        <div className="flex gap-3 items-center self-start mt-3">
          <div className="flex justify-center items-center self-stretch my-auto w-5">
            <input
              type="radio"
              name="budgetType"
              value="fixed"
              checked={selectedType === "fixed"}
              onChange={(e) => onTypeChange(e.target.value)}
              className="flex self-stretch my-auto w-5 h-5 bg-white rounded-xl border border-solid border-[color:var(--Gray-100,#CFCFCE)] min-h-5"
            />
          </div>
          <label
            htmlFor="budgetType"
            className="self-stretch my-auto text-base font-medium text-slate-700"
          >
            Fixed
          </label>
        </div>
      </div>
    </div>
  );
};
