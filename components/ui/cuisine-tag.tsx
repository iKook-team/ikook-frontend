"use client";

import React from "react";

interface CuisineTagProps {
  name: string;
  onRemove?: () => void;
}

export const CuisineTag: React.FC<CuisineTagProps> = ({ name, onRemove }) => {
  return (
    <div className="border border-[#F9DF98] gap-2.5 bg-[#FFFCF5] px-2.5 py-1 rounded-[40px] border-solid text-xs text-black font-normal">
      {name}
    </div>
  );
};