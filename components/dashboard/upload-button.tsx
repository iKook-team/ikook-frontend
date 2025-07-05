import clsx from "clsx";
import * as React from "react";

interface UploadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const UploadButton = React.forwardRef<HTMLButtonElement, UploadButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <button
        className={clsx(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-white text-[#344054] border border-solid border-[#CFCFCE] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-gray-50": variant === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
          },
          "max-sm:px-3 max-sm:py-1.5 max-sm:text-xs",
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

UploadButton.displayName = "UploadButton";

export { UploadButton };