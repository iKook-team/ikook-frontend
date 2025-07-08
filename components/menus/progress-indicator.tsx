"use client";

import React from "react";

interface ProgressStep {
  label: string;
  completed: boolean;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps }) => {
  return (
    <div className="flex flex-wrap gap-10 items-start self-center text-xs leading-none text-neutral-700 max-md:max-w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col grow shrink items-start whitespace-nowrap w-[76px]">
          <div className="flex gap-0.5 items-center">
            <div className="flex gap-0.5 items-center self-stretch my-auto">
              <div
                className={`flex shrink-0 self-stretch my-auto w-1.5 border border-green-600 border-solid stroke-[0.603px] stroke-green-600 ${
                  step.completed ? "h-[7px]" : "h-1.5"
                }`}
              />
              <div className="self-stretch my-auto text-neutral-700">
                {step.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
