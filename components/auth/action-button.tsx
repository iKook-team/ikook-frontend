"use client";

import React, { useState } from "react";

export type UserType = "host" | "chef" | null;

interface ActionButtonsProps {
  onSelectionChange?: (selection: UserType) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSelectionChange,
}) => {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleSelection = (type: UserType) => {
    setSelectedType(type);
    onSelectionChange?.(type);
  };

  return (
    <div className="flex flex-col items-start gap-3 w-[508px] h-[108px] mb-[26px] max-md:w-full max-sm:w-full max-sm:mb-5">
      <button
        type="button"
        onClick={() => handleSelection("host")}
        className={`text-white text-base font-bold leading-6 w-[508px] gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] cursor-pointer transition-all duration-200 px-[113px] py-3 rounded-lg border-solid max-md:w-full max-md:px-5 max-md:py-3 max-sm:text-[15px] max-sm:w-full max-sm:px-5 max-sm:py-3.5 ${
          selectedType === "host"
            ? "bg-[#FCC01C] border-[#FCC01C] ring-2 ring-[#FCC01C] ring-opacity-50"
            : "bg-[#FCC01C] border-[#FCC01C] hover:bg-[#e6ac19]"
        }`}
        aria-pressed={selectedType === "host"}
      >
        Join iKooK as a Host
      </button>
      <button
        type="button"
        onClick={() => handleSelection("chef")}
        className={`text-[#FCC01C] text-base font-bold leading-6 w-[508px] gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] cursor-pointer transition-all duration-200 px-[113px] py-3 rounded-lg border-solid border-[#FCC01C] max-md:w-full max-md:px-5 max-md:py-3 max-sm:text-[15px] max-sm:w-full max-sm:px-5 max-sm:py-3.5 ${
          selectedType === "chef"
            ? "bg-[#FCC01C] text-white ring-2 ring-[#FCC01C] ring-opacity-50"
            : "bg-white hover:bg-[#FCC01C] hover:text-white"
        }`}
        aria-pressed={selectedType === "chef"}
      >
        Join iKooK as a Chef
      </button>
    </div>
  );
};
