import React, { useState } from 'react';

interface BudgetFormProps {
  defaultBudget?: number;
  onBudgetChange?: (budget: number) => void;
  onBudgetTypeChange?: (type: 'flexible' | 'fixed' | 'Flexible' | 'Fixed') => void;
}

export const BudgetForm: React.FC<BudgetFormProps> = ({
  defaultBudget = 0,
  onBudgetChange,
  onBudgetTypeChange
}) => {
  const [budget, setBudget] = useState(defaultBudget);
  const [budgetType, setBudgetType] = useState<'flexible' | 'fixed' | null>(null);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, '')) || 0;
    setBudget(value);
    onBudgetChange?.(value);
  };

  const handleBudgetTypeChange = (type: 'flexible' | 'fixed') => {
    setBudgetType(type);
    // Convert to lowercase for internal state, but pass capitalized version to parent
    const capitalizedType = type === 'fixed' ? 'Fixed' : 'Flexible';
    onBudgetTypeChange?.(capitalizedType);
  };

  const formatBudget = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <form className="flex flex-col gap-8">
      <div className="flex w-[613px] flex-col items-start h-[74px]">
        <div className="flex flex-col items-start gap-1.5 self-stretch">
          <div className="flex flex-col items-start gap-1.5 self-stretch">
            <label htmlFor="budget" className="text-[#344054] text-base font-normal leading-6">
              Your budget
            </label>
            <div className="flex items-start self-stretch border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white rounded-lg border-solid border-[#D0D5DD]">
              <div className="flex items-center pl-3.5 pr-3 py-2.5 rounded-[8px_0px_0px_8px]">
                <span className="text-[#3F3E3D] text-base font-normal leading-6">
                  £
                </span>
              </div>
              <input
                id="budget"
                type="text"
                value={formatBudget(budget)}
                onChange={handleBudgetChange}
                className="flex items-center gap-2 flex-[1_0_0] self-stretch border bg-white px-3.5 py-2.5 rounded-[0px_8px_8px_0px] border-solid border-[#D0D5DD] text-[#101828] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-transparent"
                placeholder="Enter budget amount"
              />
            </div>
          </div>
        </div>
      </div>

      <fieldset className="inline-flex flex-col items-start gap-4 w-[98px] h-[100px]">
        <legend className="text-black text-base font-normal leading-6">
          Budget type
        </legend>
        <div className="flex flex-col items-start gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="budgetType"
                value="flexible"
                checked={budgetType === 'flexible'}
                onChange={() => handleBudgetTypeChange('flexible')}
                className="sr-only"
              />
              <div className={`w-5 h-5 border rounded-[10px] border-solid border-[#D0D5DD] ${
                budgetType === 'flexible' 
                  ? 'bg-[#FCC01C] border-[#FCC01C]' 
                  : 'bg-white'
              } flex items-center justify-center`}>
                {budgetType === 'flexible' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
            <span className="text-[#344054] text-base font-medium leading-6">
              Flexible
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="budgetType"
                value="fixed"
                checked={budgetType === 'fixed'}
                onChange={() => handleBudgetTypeChange('fixed')}
                className="sr-only"
              />
              <div className={`w-5 h-5 border rounded-[10px] border-solid border-[#D0D5DD] ${
                budgetType === 'fixed' 
                  ? 'bg-[#FCC01C] border-[#FCC01C]' 
                  : 'bg-white'
              } flex items-center justify-center`}>
                {budgetType === 'fixed' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
            <span className="text-[#344054] text-base font-medium leading-6">
              Fixed
            </span>
          </label>
        </div>
      </fieldset>
    </form>
  );
};