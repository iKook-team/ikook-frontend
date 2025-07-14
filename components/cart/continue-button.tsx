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
    <div className="flex w-full justify-end pr-5 mt-3">
      <div className="text-base text-white font-semibold whitespace-nowrap">
        <button
          className="text-white border border-[color:var(--Yellow-Pry,#FCC01C)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-[#FCC01C] px-7 py-3 rounded-lg border-solid max-md:px-5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e6ac19] transition-colors w-full sm:w-auto"
          disabled={disabled}
          type="button"
          onClick={onClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
