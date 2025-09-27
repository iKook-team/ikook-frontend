"use client";

import React from "react";

interface ContinueButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <div className="flex w-full justify-end px-4 sm:pr-5 mt-3">
      <button
        className="text-white border border-[#FCC01C] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 bg-[#FCC01C] px-6 sm:px-7 py-3 rounded-lg border-solid disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e6ac19] transition-colors w-full sm:w-auto text-base font-semibold"
        disabled={disabled}
        type="button"
        onClick={onClick}
      >
        Continue
      </button>
    </div>
  );
};
