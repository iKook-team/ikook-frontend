"use client";

import React from "react";

interface NavigationButtonsProps {
  onBack: () => void;
  onContinue: () => void;
  canContinue?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onContinue,
  canContinue = true,
}) => {
  return (
    <div className="flex gap-[22px] text-base font-semibold whitespace-nowrap mt-3">
      <button
        type="button"
        onClick={onBack}
        className="text-[#FCC01C] border border-[#FCC01C] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden px-11 py-3 rounded-lg border-solid max-md:px-5 hover:bg-[#FCC01C] hover:text-white transition-colors"
      >
        Back
      </button>
      <button
        type="submit"
        onClick={onContinue}
        disabled={!canContinue}
        className="text-white border border-[#FCC01C] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-[#FCC01C] px-7 py-3 rounded-lg border-solid max-md:px-5 hover:bg-[#E6AC19] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};