import * as React from "react";

interface ProgressStepProps {
  label: string;
  isCompleted?: boolean;
  className?: string;
}

export function ProgressStep({
  label,
  isCompleted = true,
  className = "",
}: ProgressStepProps) {
  return (
    <div
      className={`flex relative flex-col shrink-0 gap-1 items-start ${className}`}
    >
      <div className="relative h-1 w-full">
        <div className="absolute top-0 left-0 shrink-0 h-1 rounded bg-neutral-200 w-full" />
        {isCompleted && (
          <div className="absolute top-0 left-0 shrink-0 h-1 bg-green-600 rounded-lg w-full" />
        )}
      </div>
      <div className="flex relative gap-0.5 items-center">
        <div className="flex relative gap-0.5 items-center">
          <div className="relative w-1.5 h-1.5 rounded-full border-green-600 border-solid border-[0.603px] stroke-[0.603px] stroke-green-600" />
          <div className="relative text-xs leading-3 text-neutral-700">
            <div className="text-xs text-neutral-700">{label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
