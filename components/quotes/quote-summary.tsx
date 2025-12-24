"use client";
import * as React from "react";

import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { formatNumber } from "@/lib/format";

type QuoteSummaryProps = {
  total?: number; // numeric total in base currency
  dateText?: string; // formatted date string to display
  addressText?: string; // formatted address to display
  guestsText?: string; // formatted guests text (e.g., "10 Guests")
  breakdownGuests?: number; // numeric guests for breakdown
  breakdownPricePerPerson?: number; // price per person for breakdown
  breakdownSubtotal?: number; // subtotal before fees
  breakdownPlatformFee?: number; // platform fee amount
  children?: React.ReactNode; // optional footer actions (e.g., Pay Quote button)
};

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({
  total,
  dateText,
  addressText,
  guestsText,
  breakdownGuests,
  breakdownPricePerPerson,
  breakdownSubtotal,
  breakdownPlatformFee,
  children,
}) => {
  const { market } = useMarket();
  const cfg = React.useMemo(() => getMarketConfig(market), [market]);
  const formattedTotal = React.useMemo(() => {
    const t = typeof total === "number" && !Number.isNaN(total) ? total : 0;

    return `${cfg.currencySymbol}${formatNumber(t, market)}`;
  }, [cfg, total, market]);

  return (
    <aside className="px-8 pt-10 pb-20 w-full bg-white rounded-2xl border border-solid shadow-2xl border-neutral-200 max-md:px-5 max-md:mt-7">
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-start self-start text-sm leading-none text-black">
          {dateText ? (
            <div className="flex gap-2 items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                alt="Calendar icon"
              />
              <span className="self-stretch my-auto">{dateText}</span>
            </div>
          ) : null}
          {addressText ? (
            <div className="flex gap-2 items-center self-stretch mt-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/1420f97bee27b190a8f78da5d687cc5ea7c2de9a?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                alt="Location icon"
              />
              <span className="self-stretch my-auto">{addressText}</span>
            </div>
          ) : null}
          {guestsText ? (
            <div className="flex gap-2 items-center mt-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/70435404a95f8790c51695afdaf73c024aa768ca?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                alt="Guests icon"
              />
              <span className="self-stretch my-auto">{guestsText}</span>
            </div>
          ) : null}
        </div>
        <div className="mt-7 max-w-full text-zinc-800 w-[303px]">
          {typeof breakdownSubtotal === "number" ||
          typeof breakdownPlatformFee === "number" ? (
            <div className="text-base font-medium">
              {typeof breakdownSubtotal === "number" && (
                <div className="flex gap-10 items-start">
                  <span className="text-zinc-800 w-[209px]">Subtotal</span>
                  <span className="text-right text-zinc-800 w-[80px]">
                    {cfg.currencySymbol}
                    {formatNumber(Number(breakdownSubtotal), market)}
                  </span>
                </div>
              )}
              {typeof breakdownPlatformFee === "number" && (
                <div className="flex gap-10 items-start mt-3">
                  <span className="text-zinc-800 w-[209px]">
                    Platform fee 2.5%
                  </span>
                  <span className="w-[80px] text-right text-zinc-800">
                    {cfg.currencySymbol}
                    {formatNumber(Number(breakdownPlatformFee), market)}
                  </span>
                </div>
              )}
            </div>
          ) : null}
          <div className="mt-4 w-full text-lg font-semibold leading-loose whitespace-nowrap max-w-[303px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a401bdc98c55df73597b51ec2e9e16b011631081?placeholderIfAbsent=true"
              className="object-contain w-full aspect-[333.33] stroke-[1px] stroke-neutral-200"
              alt="Divider line"
            />
            <div className="flex gap-9 items-start mt-2">
              <span className="text-zinc-800 w-[209px]">TOTAL</span>
              <span className="text-right text-zinc-800">{formattedTotal}</span>
            </div>
          </div>
        </div>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </aside>
  );
};
