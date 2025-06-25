"use client";
import * as React from "react";

import { BudgetInput } from "./BudgetInput";
import { BudgetTypeSelector } from "./budget-type-selector";

interface BudgetFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
}

export const BudgetForm: React.FC<BudgetFormProps> = ({ onNext, onBack }) => {
  const [budget, setBudget] = React.useState("1,500");
  const [budgetType, setBudgetType] = React.useState("flexible");

  const handleContinue = () => {
    onNext({ budget: budget, budgetType });
  };

  return (
    <section className="flex flex-col items-center px-14 pt-9 pb-20 mt-16 max-w-full bg-white rounded-2xl border border-solid shadow-lg border-[color:var(--Black-100,#E7E7E7)] w-[654px] max-md:px-5 max-md:mt-10">
      <header className="ml-2.5 text-2xl font-bold leading-none text-black">
        Budget
      </header>
      <div className="flex flex-col self-stretch mt-14 max-md:mt-10 max-md:max-w-full">
        <BudgetInput 
          value={budget} 
          onChange={setBudget} 
        />
        <BudgetTypeSelector 
          selectedType={budgetType} 
          onTypeChange={setBudgetType} 
        />
      </div>
      <div className="flex gap-6 items-start mt-64 text-base font-semibold whitespace-nowrap max-md:mt-10">
        <button
          type="button"
          onClick={onBack}
          className="overflow-hidden gap-2 self-stretch px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="overflow-hidden gap-2 self-stretch px-5 py-3 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-500 transition-colors"
        >
          Continue
        </button>
      </div>
    </section>
  );
};
