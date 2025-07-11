import React from "react";

export const CostSummary: React.FC = () => {
  return (
    <div className="mt-7 text-lg font-semibold leading-loose">
      <div className="flex gap-9 items-start">
        <span className="text-zinc-800 w-[209px]">Estimated cost</span>
        <span className="text-right text-zinc-800">£1,435</span>
      </div>
    </div>
  );
};
