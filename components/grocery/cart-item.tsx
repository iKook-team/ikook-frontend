"use client";
import * as React from "react";

import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";

interface CartItemProps {
  id: string;
  name: string;
  price: string;
  quantity: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  isSelected,
  onToggleSelect,
  onRemove,
}) => {
  const { market } = useMarket();
  const cfg = React.useMemo(() => getMarketConfig(market), [market]);

  return (
    <div className="flex w-full max-w-[332px] flex-col items-stretch mt-4">
      <div className="flex gap-[27px]">
        <div className="flex min-w-60 items-center gap-3">
          <div className="self-stretch flex items-center justify-center w-5 my-auto">
            <button
              onClick={() => onToggleSelect(id)}
              className="aspect-[1] object-contain w-5 self-stretch my-auto"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dd643f28c0816ad4825961b6bbbe0212a45cea0d?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-5 self-stretch my-auto"
                alt={isSelected ? "Selected" : "Not selected"}
              />
            </button>
          </div>
          <div className="text-[#3F3E3D] text-xs font-medium self-stretch my-auto">
            {name} x{quantity}
          </div>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="rounded bg-[rgba(255,223,223,1)] flex gap-2.5 overflow-hidden px-[5px] py-1 hover:bg-[rgba(255,200,200,1)] transition-colors"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/38ca3e6bd70cdef8a0ade3aa7fc3a30373c593b8?placeholderIfAbsent=true"
            className="aspect-[0.92] object-contain w-[11px]"
            alt="Remove item"
          />
        </button>
      </div>
      <div className="z-10 gap-[3px] text-xs text-[rgba(61,61,61,1)] font-medium whitespace-nowrap tracking-[0.12px] leading-[22px] ml-8 max-md:ml-2.5">
        {cfg.currencySymbol}
        {price}
      </div>
    </div>
  );
};
