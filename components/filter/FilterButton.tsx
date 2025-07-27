"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface FilterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  showIcon?: boolean;
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, children, showIcon = true, isActive, ...props }, ref) => {
    return (
      <button
        className={clsx(
          "inline-flex items-center justify-center gap-2 px-4 py-2.5 text-base font-medium transition-colors rounded-full border border-solid border-[#CFCFCE]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
          isActive
            ? "bg-black text-white hover:bg-gray-800"
            : "text-black hover:bg-gray-50",
          className,
        )}
        ref={ref}
        {...props}
      >
        <span className="my-auto">{children}</span>
        {showIcon && <ChevronDown className="w-4 h-4 my-auto" />}
      </button>
    );
  },
);

FilterButton.displayName = "FilterButton";

export { FilterButton };
