import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-[#FCC01C] text-white border border-[#FCC01C] hover:bg-[#E6AC19] focus:ring-[#FCC01C] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]",
        secondary:
          "bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 focus:ring-gray-500",
        outline:
          "bg-transparent text-[#FCC01C] border border-[#FCC01C] hover:bg-[#FCC01C] hover:text-white focus:ring-[#FCC01C]",
        ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-500",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        white:
          "bg-white text-[#323335] border border-gray-200 hover:bg-gray-50 focus:ring-gray-200",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "h-10 w-10",
        default: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
