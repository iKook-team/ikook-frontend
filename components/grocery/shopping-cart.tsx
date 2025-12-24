"use client";
import * as React from "react";

import { CartItem } from "./cart-item";

import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { formatNumber } from "@/lib/format";

interface CartItemData {
  id: string;
  name: string;
  price: string;
  quantity: number;
  isSelected: boolean;
}

interface ShoppingCartProps {
  items: CartItemData[];
  onToggleSelect: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onContinue: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onToggleSelect,
  onRemoveItem,
  onContinue,
}) => {
  const { market } = useMarket();
  const cfg = React.useMemo(() => getMarketConfig(market), [market]);
  const selectedItems = items.filter((item) => item.isSelected);
  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const parsePrice = (s: string): number => {
    if (!s) return 0;
    const n = parseFloat(String(s).replace(/[^0-9.]/g, ""));

    return Number.isFinite(n) ? n : 0;
  };

  const rawSubtotal = selectedItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0,
  );
  const subtotal = rawSubtotal;
  const platformFee = subtotal * 0.025;
  const total = subtotal + platformFee;

  const fmt = (n: number) => formatNumber(n, market);

  return (
    <aside className="w-[36%] ml-5 max-md:w-full max-md:ml-0">
      <div className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] w-full bg-white mx-auto px-[19px] py-7 rounded-[15px] border-solid max-md:mt-10">
        <div className="max-md:mr-[5px]">
          <h2 className="text-[#030302] text-[19px] font-semibold">
            Your pick
          </h2>
          <p className="text-[#6F6E6D] text-xs font-normal mt-1">
            Here are your groceries selection
          </p>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/28c6627150e4f2e985572ad5c5ef7da2fef444e1?placeholderIfAbsent=true"
          className="aspect-[333.33] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-3.5 max-md:mr-1"
          alt=""
        />
        <div className="mt-[22px]">
          {items.map((item, index) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              isSelected={item.isSelected}
              onToggleSelect={onToggleSelect}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
        <div className="text-[#323335] mt-[41px] max-md:mt-10">
          <div className="text-sm font-normal leading-none">
            <div className="flex gap-[40px_86px]">
              <div className="text-[#323335] w-[209px]">{totalItems} items</div>
              <div className="text-[#323335] text-right w-[35px]">
                {cfg.currencySymbol}
                {fmt(subtotal)}
              </div>
            </div>
            <div className="flex gap-[40px_73px] mt-3">
              <div className="text-[#323335] w-[209px]">Platform fee 2.5%</div>
              <div className="text-[#323335] text-right w-12">
                {cfg.currencySymbol}
                {fmt(platformFee)}
              </div>
            </div>
            {/* Delivery removed per request */}
          </div>
          <div className="w-full max-w-[331px] text-base font-medium whitespace-nowrap mt-[17px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/8f46afeac2620856dd07b20a735a96df5b2f333a?placeholderIfAbsent=true"
              className="aspect-[333.33] object-contain w-full stroke-[1px] stroke-[#E7E7E7]"
              alt=""
            />
            <div className="flex gap-[40px_74px] mt-[7px]">
              <div className="text-[#323335] w-[209px]">TOTAL</div>
              <div className="text-[#323335] text-right w-12">
                {cfg.currencySymbol}
                {fmt(total)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-base text-white font-bold whitespace-nowrap mt-[7px] rounded-lg">
          <button
            onClick={onContinue}
            disabled={selectedItems.length === 0}
            aria-disabled={selectedItems.length === 0}
            className={`text-white self-stretch border border-[color:var(--Yellow-Pry,#FCC01C)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] min-w-60 w-[331px] gap-2 overflow-hidden px-5 py-3 rounded-lg border-solid transition-colors ${
              selectedItems.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#FCC01C] hover:bg-[#e6ac19]"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </aside>
  );
};
