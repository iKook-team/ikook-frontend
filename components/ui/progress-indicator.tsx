import React from "react";

interface ProgressStep {
  label: string;
  completed: boolean;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
}) => {
  return (
    <div className="flex gap-2 text-[8px] text-[#3F3E3D] font-normal leading-[18px] flex-wrap max-md:max-w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col grow shrink w-[161px]">
          <div className="flex items-center gap-1">
            <div
              className={`border self-stretch flex w-2.5 shrink-0 h-2.5 my-auto rounded-[10px] border-solid ${
                step.completed
                  ? "border-[rgba(18,161,50,0.5)]"
                  : "border-[rgba(63,62,61,0.3)]"
              }`}
            />
            <div className="text-[#3F3E3D] self-stretch my-auto">
              {step.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
