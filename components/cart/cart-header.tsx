import React from "react";

interface CartHeaderProps {
  title: string;
}

export const CartHeader: React.FC<CartHeaderProps> = ({ title }) => {
  return (
    <header>
      <h1 className="text-black text-xl font-medium">{title}</h1>
    </header>
  );
};