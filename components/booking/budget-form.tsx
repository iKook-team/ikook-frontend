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
    <form className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          Your budget
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">£</span>
          </div>
          <input
            id="budget"
            type="text"
            value={formatBudget(budget)}
            onChange={handleBudgetChange}
            className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-700">
          Is this a fixed or flexible budget?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleBudgetTypeChange('fixed')}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
              budgetType === 'fixed' 
                ? 'border-amber-500 bg-amber-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <span className="text-gray-900 font-medium">Fixed</span>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              budgetType === 'fixed' 
                ? 'bg-amber-500 border-amber-500' 
                : 'border-2 border-gray-300'
            }`}>
              {budgetType === 'fixed' && (
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M3.707 9.293a1 1 0 0 1-1.414 0l-1.5-1.5a1 1 0 0 1 1.414-1.414L3 7.086l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6z" />
                </svg>
              )}
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => handleBudgetTypeChange('flexible')}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
              budgetType === 'flexible' 
                ? 'border-amber-500 bg-amber-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <span className="text-gray-900 font-medium">Flexible</span>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              budgetType === 'flexible' 
                ? 'bg-amber-500 border-amber-500' 
                : 'border-2 border-gray-300'
            }`}>
              {budgetType === 'flexible' && (
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M3.707 9.293a1 1 0 0 1-1.414 0l-1.5-1.5a1 1 0 0 1 1.414-1.414L3 7.086l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6z" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};