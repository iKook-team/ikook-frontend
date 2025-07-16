import React from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

interface TransactionItemProps {
  title: string;
  date: string;
  amount: string;
  status: string;
}

const getStatusStyle = (status: string) => {
  const s = status?.toLowerCase() || "";
  if (s.includes("pending")) return "bg-yellow-100 text-yellow-700";
  if (s.includes("completed") || s.includes("success")) return "bg-emerald-100 text-green-600";
  if (s.includes("failed") || s.includes("reject")) return "bg-red-100 text-red-600";
  return "bg-gray-100 text-gray-600";
};

const TransactionItem = ({
  title,
  date,
  amount,
  status,
}: TransactionItemProps) => (
  <div className="flex justify-center items-center pt-3 pr-4 pb-3 pl-5 w-full rounded-md border border-solid border-stone-300">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-4">
      <div className="flex flex-col gap-1 items-start">
        <p className="text-sm leading-5 text-zinc-800">{title}</p>
        <p className="text-xs text-zinc-800">{date}</p>
      </div>
      <div className="flex flex-col items-end max-sm:flex-row max-sm:gap-3 max-sm:items-start">
        <p className="overflow-hidden text-base font-bold text-ellipsis text-zinc-800">
          {amount}
        </p>
        <div className={`flex gap-2.5 justify-center items-center p-1 rounded ${getStatusStyle(status)}`}>
          <span className="text-xs font-semibold">{status}</span>
        </div>
      </div>
    </div>
  </div>
);

interface WithdrawHistoryProps {
  withdrawals?: any[];
  onWithdraw?: () => void;
}

export const WithdrawHistory: React.FC<WithdrawHistoryProps> = ({ withdrawals = [], onWithdraw }) => {
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-base font-semibold text-zinc-800">
          Withdraw History
        </h2>
        <button className="flex gap-2 justify-center items-center px-3.5 py-2 bg-white rounded-lg border border-solid shadow-sm border-stone-300 hover:bg-gray-50 transition-colors">
          <span className="text-sm font-bold text-slate-700">See all</span>
        </button>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {withdrawals.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No withdrawals yet.</div>
        ) : (
          withdrawals.map((withdrawal, index) => (
            <TransactionItem
              key={withdrawal.id || index}
              title={withdrawal.bank_detail?.bank_name ? `Withdrawal to ${withdrawal.bank_detail.bank_name}` : "Withdrawal"}
              date={new Date(withdrawal.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              amount={formatAmount(withdrawal.amount)}
              status={withdrawal.status}
            />
          ))
        )}
      </div>

      <button
        className="flex justify-center items-center px-28 py-3 h-12 bg-amber-400 rounded-lg border-amber-400 border-solid shadow-sm mt-4"
        onClick={onWithdraw}
      >
        <span className="text-base font-bold leading-6 text-white">
          Withdraw fund
        </span>
      </button>
    </section>
  );
};
