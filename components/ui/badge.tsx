import clsx from "clsx";
import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "yellow";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
}) => {
  const baseClasses =
    "inline-flex items-center gap-1 font-medium text-center border border-solid rounded-full";

  const variantClasses = {
    default: "border-[#FDEEC5] bg-[#FFFCF5] text-[#060605]",
    yellow: "border-[#FDEEC5] bg-[#FFF9E8] text-[#BD9015]",
  };

  const sizeClasses = {
    sm: "text-[7px] px-[9px] py-[3px]",
    md: "text-[10px] px-2.5 py-[7px]",
  };

  return (
    <div
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
};
