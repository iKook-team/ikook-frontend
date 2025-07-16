import React from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

interface MetricCardProps {
  title: string;
  amount: string;
}

const MetricCard = ({ title, amount }: MetricCardProps) => (
  <div className="flex gap-24 items-center px-5 py-2 w-72 rounded-md border border-solid border-stone-300 max-md:min-w-[250px] max-md:w-[calc(33%_-_8px)] max-sm:w-full">
    <div className="flex flex-col items-start min-w-0">
      <p className="text-base text-zinc-800 whitespace-nowrap overflow-hidden text-ellipsis w-full">{title}</p>
      <p className="text-2xl font-bold text-zinc-800">{amount}</p>
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
    <section className="w-full max-w-4xl mx-auto px-5 py-6">
      <h1 className="text-2xl font-bold text-black mb-6">Revenue</h1>

      <div className="flex gap-4 w-full">
        <MetricCard title="Available Balance" amount={formatAmount(earnings?.balance)} />
        <MetricCard title="Withdraw" amount={formatAmount(earnings?.total_withdrawals)} />
        <MetricCard title="Total" amount={formatAmount(earnings?.total_earnings)} />
      </div>
    </section>
  );
};
