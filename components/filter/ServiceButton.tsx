"use client";

import * as React from "react";

import clsx from "clsx";

interface ServiceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  variant?: "default" | "active";
}

const ServiceButton = React.forwardRef<HTMLButtonElement, ServiceButtonProps>(
  ({ className, children, isActive = false, variant = "default", ...props }, ref) => {
    return (
      <button
        className={clsx(
          "self-stretch border gap-2.5 overflow-hidden px-[18px] py-2.5 rounded-[40px] border-solid text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive || variant === "active"
            ? "text-white bg-[#FCC01C] border-[#F9DF98] border-2"
            : "text-[#060605] border-[#CFCFCE] border hover:bg-gray-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ServiceButton.displayName = "ServiceButton";

export { ServiceButton };