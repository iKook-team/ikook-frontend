import React from "react";

import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";

interface MenuCardProps {
  title: string;
  price: string; // This should be the numeric price as a string
  cuisine: string;
  chefName: string;
  location: string;
  rating: string;
  reviewCount: string;
  imageUrl: string;
  chefImageUrl: string;
  userCurrency?: string; // deprecated
  userCountry?: string; // deprecated
}

export const MenuCard: React.FC<MenuCardProps> = ({
  title,
  price,
  cuisine,
  chefName,
  location,
  rating,
  reviewCount,
  imageUrl,
  chefImageUrl,
  userCurrency,
  userCountry,
}) => {
  // Use market-based currency symbol
  const { market } = useMarket();
  const currencySymbol = getMarketConfig(market).currencySymbol;

  // Format the price with the currency symbol
  const formattedPrice = (price: string): string => {
    // Remove any existing currency symbols and trim whitespace
    const numericValue = price.replace(/[^0-9.]/g, "").trim();

    // Format with 2 decimal places and add currency symbol
    return `${currencySymbol}${parseFloat(numericValue || "0").toFixed(2)}`;
  };

  return (
    <article className="shadow-[0px_4.942px_4.942px_0px_rgba(0,0,0,0.04)] min-w-60 grow shrink w-[340px] max-md:max-w-full">
      <div className="border flex w-full flex-col items-stretch bg-white pt-px pb-[17px] rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full">
        <div className="flex flex-col relative min-h-[257px] w-full pl-[11px] pr-[22px] py-[15px] rounded-[15px_15px_0px_0px] max-md:max-w-full max-md:pr-5">
          <img
            src={imageUrl}
            alt={title}
            className="absolute h-full w-full object-cover inset-0 rounded-[15px_15px_0px_0px]"
          />
          <div className="relative flex items-center text-[10px] text-[#323335] font-normal whitespace-nowrap text-center">
            <div className="self-stretch w-[71px] my-auto rounded-[30px]">
              <div className="justify-center items-center bg-white flex gap-2.5 overflow-hidden px-[13px] py-1 rounded-[30px]">
                <span className="self-stretch w-[45px] my-auto">{cuisine}</span>
              </div>
            </div>
          </div>
          <div className="relative flex items-center gap-[40px_119px] mt-[179px] max-md:mr-0.5 max-md:mt-10">
            <h3 className="text-white text-sm font-semibold leading-none self-stretch w-[219px] my-auto">
              {title}
            </h3>
            <div className="text-[#FCC01C] text-right text-base font-bold self-stretch my-auto">
              {formattedPrice(price)}
            </div>
          </div>
        </div>
        <div className="self-center flex justify-between w-full px-4 mt-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
              <img
                src={chefImageUrl}
                alt={`Chef ${chefName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-stretch mt-[5px]">
              <div className="text-[#323335] text-xs font-semibold">
                {chefName}
              </div>
              <div className="flex items-stretch gap-0.5 text-[10px] text-[#323335] font-normal whitespace-nowrap">
                <img
                  src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/c5276b0491d93a2d4dceeb6c4d8c347c0b8ac9f0?placeholderIfAbsent=true"
                  alt="Location"
                  className="aspect-[1] object-contain w-3 shrink-0 my-auto"
                />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <div className="text-[#323335] flex-shrink-0">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-[3px] text-sm font-medium whitespace-nowrap">
                <img
                  src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/e283742f164b06590d7e3cdbf1b827d9a1c134c6?placeholderIfAbsent=true"
                  alt="Rating"
                  className="aspect-[1.08] object-contain w-3.5 self-stretch shrink-0 my-auto"
                />
                <span className="text-[#323335] self-stretch w-[23px] my-auto">
                  {rating}
                </span>
              </div>
              <div className="text-[#323335] text-[10px] font-normal">
                ({reviewCount} Reviews)
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
