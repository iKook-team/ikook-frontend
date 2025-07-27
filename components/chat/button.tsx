import * as React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  const baseClasses =
    "font-semibold rounded-lg border border-solid shadow-sm transition-colors";

  const variantClasses = {
    primary: "text-white bg-amber-400 border-amber-400 hover:bg-amber-500",
    secondary: "text-amber-400 bg-white border-amber-400 hover:bg-amber-50",
    outline: "text-amber-400 border-amber-400 hover:bg-amber-50",
  };

  const sizeClasses = {
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
