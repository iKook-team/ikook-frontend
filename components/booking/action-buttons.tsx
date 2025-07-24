import React from 'react';

interface ActionButtonsProps {
  onBack?: () => void;
  onContinue?: () => void;
  continueDisabled?: boolean;
  continueText?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBack,
  onContinue,
  continueDisabled = false,
  continueText = 'Continue'
}) => {
  return (
    <div className="inline-flex items-start gap-[22px] w-[276px] h-12">
      <button
        type="button"
        onClick={onBack}
        className="flex justify-center items-center gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] px-11 py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#FCC01C] hover:bg-opacity-10 transition-colors"
      >
        <span className="text-[#FCC01C] text-base font-semibold leading-6">
          Back
        </span>
      </button>
      <button
        type="submit"
        onClick={onContinue}
        disabled={continueDisabled}
        className={`flex justify-center items-center gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] px-7 py-3 rounded-lg border-solid transition-colors ${
          continueDisabled
            ? 'bg-gray-300 border-gray-300 cursor-not-allowed'
            : 'bg-[#FCC01C] border-[#FCC01C] hover:bg-[#E6AC19]'
        }`}
      >
        <span className={`text-base font-semibold leading-6 ${
          continueDisabled ? 'text-gray-500' : 'text-white'
        }`}>
{continueText}
        </span>
      </button>
    </div>
  );
};