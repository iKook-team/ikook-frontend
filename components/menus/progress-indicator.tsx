import * as React from "react";

import { ProgressStep } from "./progress-step";

interface Step {
  id: string;
  label: string;
  isCompleted?: boolean;
}

interface ProgressStepperProps {
  steps?: Step[];
  className?: string;
}

const defaultSteps: Step[] = [
  { id: "details", label: "Details", isCompleted: true },
  { id: "menu-prices", label: "Menu & prices", isCompleted: true },
  { id: "menu-images", label: "Menu images", isCompleted: true },
  { id: "finish-upload", label: "Finish upload", isCompleted: true },
];

export function ProgressStepper({
  steps = defaultSteps,
  className = "",
}: ProgressStepperProps) {
  return (
    <section
      className={`w-full max-w-3xl mx-auto overflow-x-auto py-2 sm:py-4 ${className}`}
    >
      <div className="flex min-w-max w-full justify-between items-start gap-2 sm:gap-4 px-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 min-w-[80px] max-w-[120px]">
            <ProgressStep
              label={step.label}
              isCompleted={step.isCompleted}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
