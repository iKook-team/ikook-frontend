import React from "react";

interface CartHeaderProps {
  title: string;
  subtitle?: string;
}

export const CartHeader: React.FC<CartHeaderProps> = ({ title, subtitle }) => {
  return (
    <header>
      <h1 className="text-black text-xl font-medium">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 text-base mt-1">{subtitle}</p>
      )}
    </header>
  );
};