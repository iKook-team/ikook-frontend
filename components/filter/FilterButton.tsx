"use client";

import * as React from "react";

import { ChevronDown } from "lucide-react";

import clsx from "clsx";

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showIcon?: boolean;
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, children, showIcon = true, ...props }, ref) => {
    return (
      <button
        className={clsx(
          "justify-center items-center border border-[#CFCFCE] flex gap-2 overflow-hidden text-black whitespace-nowrap px-[18px] py-2.5 rounded-[40px] border-solid text-base font-medium transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="self-stretch my-auto">{children}</span>
        {showIcon && (
          <ChevronDown className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto" />
        )}
      </button>
    );
  }
);

FilterButton.displayName = "FilterButton";

export { FilterButton }