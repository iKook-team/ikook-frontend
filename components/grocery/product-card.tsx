"use client";
import * as React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  onAddToCart?: (product: { id: string; name: string; price: string }) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  const handleAddToCart = () => {
    onAddToCart?.({ id, name, price });
  };

  return (
    <article className="min-w-60 grow shrink w-[247px]">
      <div className="shadow-[0px_12px_24px_rgba(0,0,0,0)] flex flex-col items-stretch pb-[9px] rounded-[25px] border-[rgba(226,226,226,1)] border-solid border-2">
        <div className="bg-[rgba(234,234,234,1)] shadow-[0px_12px_24px_rgba(0,0,0,0)] flex flex-col items-stretch justify-center px-[25px] py-[34px] rounded-[25px] border-[rgba(226,226,226,1)] border-solid border-2 max-md:px-5">
          <img
            src={imageUrl}
            className="aspect-[1.56] object-contain w-full"
            alt={name}
          />
        </div>
        <div className="flex flex-col items-stretch text-lg text-[rgba(24,23,37,1)] font-semibold ml-4 mt-[25px] max-md:ml-2.5">
          <h3 className="leading-loose tracking-[0.2px]">{name}</h3>
          <p className="text-[rgba(124,124,124,1)] text-sm font-normal leading-[3] mt-[11px]">
            {description}
          </p>
          <div className="flex items-center justify-between mt-3.5">
            <span className="leading-9 tracking-[0.2px]">{price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-[#FCC01C] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#e6ac19] transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
