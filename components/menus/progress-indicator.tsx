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
  { id: "finish-upload", label: "Finish upload", isCompleted: true }
];

export function ProgressStepper({
  steps = defaultSteps,
  className = ""
}: ProgressStepperProps) {
  return (
    <section className={`box-border flex gap-16 items-start p-4 w-full max-w-[604px] max-md:flex-wrap max-md:gap-10 max-md:justify-center max-sm:flex-col max-sm:gap-5 max-sm:items-center ${className}`}>
      {steps.map((step, index) => {
        let stepClassName = "";

        // Apply specific widths based on step index to match the design
        switch (index) {
          case 0:
            stepClassName = "w-[95px]";
            break;
          case 1:
            stepClassName = "w-[93.1px]";
            break;
          case 2:
            stepClassName = "w-[95px]";
            break;
          case 3:
            stepClassName = "w-[95px]";
            break;
          default:
            stepClassName = "w-[95px]";
        }

        return (
          <ProgressStep
            key={step.id}
            label={step.label}
            isCompleted={step.isCompleted}
            className={stepClassName}
          />
        );
      })}
    </section>
  );
}
