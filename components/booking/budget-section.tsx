import React from "react";

import { getCurrencySymbol } from "@/lib/utils/currency";
import { useAuthStore } from "@/lib/store/auth-store";
import { useMarket } from "@/lib/market-context";
import { formatNumber } from "@/lib/format";

interface BudgetSectionProps {
  chefName: string;
  minBudgetPerPerson: number;
  guestCount: number;
  totalPrice: number;
  menu: any;
}

export const BudgetSection: React.FC<BudgetSectionProps> = ({
  chefName,
  minBudgetPerPerson,
  guestCount,
  totalPrice,
  menu,
}) => {
  console.log("Menu data in BudgetSection:", menu?.chef);
  const { market } = useMarket();
  const user = useAuthStore((s) => s.user);
  const currencySymbol = getCurrencySymbol({
    currency:
      user?.currency ||
      menu?.chef?.chef_details?.currency ||
      menu?.chef?.currency,
    country:
      user?.country ||
      menu?.chef?.chef_details?.country ||
      menu?.chef?.country ||
      "United Kingdom",
  });

  return (
    <section className="w-[613px] h-[97px] bg-[#FFFCF5] rounded-lg relative">
      <div className="inline-flex items-center gap-3 absolute w-[582px] h-[60px] left-5 top-4">
        <div className="w-[30px] h-[30px] relative">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" fill="#FDEEC5" />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[9px] left-[9px]"
          >
            <path
              d="M6 4V7M6 8.5V8.505M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6Z"
              stroke="#A07A13"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="w-[540px] text-[#3F3E3D] text-sm font-semibold leading-5">
          {chefName} minimum budget per person for this event is{" "}
          {currencySymbol}
          {formatNumber(minBudgetPerPerson, market)}. Based on your number of
          guests ({guestCount}), the price for this event is about{" "}
          <span className="font-bold">
            {currencySymbol}
            {formatNumber(totalPrice, market)}
          </span>
          .<br />
          You can always negotiate the price with the chef.
        </div>
      </div>
    </section>
  );
};
