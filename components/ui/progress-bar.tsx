import React from "react";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = "",
}) => {
  return (
    <div className={`relative w-full h-1 ${className}`}>
      <div className="absolute inset-0 bg-[#F2F2F2] rounded-full" />
      <div
        className="absolute top-0 left-0 h-full bg-[#FCC01C] rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
};
