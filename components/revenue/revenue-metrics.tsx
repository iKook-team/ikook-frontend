import React from "react";

import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

interface MetricCardProps {
  title: string;
  amount: string;
}

const MetricCard = ({ title, amount }: MetricCardProps) => (
  <div className="flex gap-4 sm:gap-6 items-center px-4 py-3 sm:px-5 sm:py-4 w-full sm:w-auto rounded-md border border-solid border-stone-300 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex-1 min-w-0">
      <p className="text-sm sm:text-base text-zinc-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </p>
      <p className="text-xl sm:text-2xl font-bold text-zinc-800 mt-1">{amount}</p>
    </div>
    <div className="flex gap-2.5 items-start p-2 bg-stone-50 rounded-[40px]">
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<svg layer-name="coins" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="coin-icon" style="width: 16px; height: 16px"> <path d="M10.667 2.66536C10.667 3.40174 8.87613 3.9987 6.66699 3.9987C4.45785 3.9987 2.66699 3.40174 2.66699 2.66536M10.667 2.66536C10.667 1.92898 8.87613 1.33203 6.66699 1.33203C4.45785 1.33203 2.66699 1.92898 2.66699 2.66536M10.667 2.66536V5.33203M2.66699 2.66536V5.33203C2.66699 6.06841 4.45785 6.66536 6.66699 6.66536C8.87613 6.66536 10.667 6.06841 10.667 5.33203M13.3337 6.5895C13.3337 7.32588 11.5428 7.92283 9.33366 7.92283C7.12452 7.92283 5.33366 7.32588 5.33366 6.5895V9.25619M13.3337 6.5895C13.3337 6.00895 12.2206 5.51507 10.667 5.33203M13.3337 6.5895V9.25619C13.3337 9.99256 11.5428 10.5895 9.33366 10.5895C7.12452 10.5895 5.33366 9.99256 5.33366 9.25619M2.66699 10.5136C2.66699 11.25 4.45785 11.847 6.66699 11.847C8.87613 11.847 10.667 11.25 10.667 10.5136V13.1803C10.667 13.9167 8.87613 14.5137 6.66699 14.5137C4.45785 14.5137 2.66699 13.9167 2.66699 13.1803V10.5136ZM2.66699 10.5136C2.66699 9.93311 3.78007 9.43922 5.33366 9.25619" stroke="#FCC01C"></path> </svg>',
        }}
      />
    </div>
  </div>
);

interface RevenueMetricsProps {
  earnings: {
    balance?: string;
    total_withdrawals?: string;
    total_earnings?: string;
  };
}

export const RevenueMetrics: React.FC<RevenueMetricsProps> = ({ earnings }) => {
  const user = useAuthStore((s) => s.user);
  const currency = getCurrencySymbol({
    currency: (user as any)?.currency,
    country: (user as any)?.country,
  });
  // Helper to format amount with thousand separators
  const formatAmount = (amount?: string) => {
    if (!amount) return `${currency}0`;
    const num = Number(amount);

    if (isNaN(num)) return `${currency}0`;

    return `${currency}${num.toLocaleString()}`;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Revenue</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">Track your earnings and withdrawals</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard
          title="Available Balance"
          amount={formatAmount(earnings?.balance)}
        />
        <MetricCard
          title="Withdrawals"
          amount={formatAmount(earnings?.total_withdrawals)}
        />
        <MetricCard
          title="Total Earnings"
          amount={formatAmount(earnings?.total_earnings)}
        />
      </div>
    </section>
  );
};
