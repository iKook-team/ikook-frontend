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
    <div className={`flex flex-col w-full gap-1.5 sm:gap-2 ${className}`}>
      {/* Progress line */}
      <div className="relative w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
        {isCompleted && (
          <div
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: "100%" }}
          />
        )}
      </div>

      {/* Step indicator and label */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center justify-center w-4 h-4 rounded-full border ${isCompleted ? "border-green-500 bg-green-500" : "border-gray-300"}`}
        >
          {isCompleted && (
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
          {label}
        </span>
      </div>
    </div>
  );
}
