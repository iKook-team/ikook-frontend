import React from "react";

import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { formatNumber } from "@/lib/format";

interface BudgetCardProps {
  amount: string;
  currency?: string;
  isFlexible?: boolean;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({
  amount,
  currency,
  isFlexible = true,
}) => {
  const { market } = useMarket();
  const marketCfg = getMarketConfig(market);
  const displayCurrency = currency ?? marketCfg.currencySymbol;
  const formattedAmount = (() => {
    const n = Number(amount);

    if (Number.isFinite(n)) return formatNumber(n, market);

    return amount;
  })();

  return (
    <section className="flex flex-col items-start gap-2.5 rounded w-full box-border bg-[#FFFCF5] p-2.5 max-md:w-full max-sm:p-3">
      <div className="flex items-center justify-between w-full max-md:flex-col max-md:items-start max-md:gap-3 max-sm:gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5 relative"
            role="img"
            aria-label="Budget warning indicator"
          >
            <div>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="budget-circle"
                style={{ width: "20px", height: "20px", flexShrink: 0 }}
              >
                <circle cx="10" cy="10.5" r="10" fill="#FDEEC5" />
              </svg>
            </div>
            <div>
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="budget-alert"
                style={{
                  width: "12px",
                  height: "12px",
                  flexShrink: 0,
                  position: "absolute",
                  left: "4px",
                  top: "4px",
                }}
              >
                <path
                  d="M6 4.5V7.5M6 9V9.005M11.5 6.5C11.5 9.53757 9.03757 12 6 12C2.96243 12 0.5 9.53757 0.5 6.5C0.5 3.46243 2.96243 1 6 1C9.03757 1 11.5 3.46243 11.5 6.5Z"
                  stroke="#A07A13"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-1 max-sm:gap-1.5">
            <label
              htmlFor="budget"
              className="text-[#3F3E3D] text-xs font-normal leading-[18px]"
            >
              Host budget
            </label>
            <div className="text-[#323335] text-[23px] font-semibold max-sm:text-xl">
              {displayCurrency}
              {formattedAmount}
            </div>
          </div>
        </div>
        {isFlexible && (
          <div className="flex items-center content-center gap-[4.853px] flex-wrap bg-[#FFFCF5] px-[12.134px] py-[8.089px] rounded-[20.223px] border-[1.011px] border-solid border-[#B7B7B6] max-md:self-start">
            <span className="text-[#060605] text-sm font-medium whitespace-nowrap max-sm:text-[13px]">
              Flexible
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
