import React from "react";

import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

interface Transaction {
  id: string | number;
  transaction_type: string;
  amount: string | number;
  created_at: string;
  // Optionally: gateway, status, reference, etc.
}

interface TransactionListProps {
  transactions: Transaction[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  const { user } = useAuthStore();
  const currencySymbol = getCurrencySymbol({
    currency: user?.currency,
    country: user?.country,
  });

  return (
    <section
      className="mt-[35px] max-md:max-w-full"
      aria-label="Transaction history"
    >
      {transactions.map((transaction, index) => (
        <article
          key={transaction.id}
          className="justify-center items-stretch border flex w-full max-w-[885px] flex-col overflow-hidden px-[18px] py-1.5 rounded-md border-solid border-[#CFCFCE] max-md:max-w-full"
          style={{ marginTop: index > 0 ? "8px" : "0" }}
        >
          <div className="flex items-center justify-between flex-wrap max-md:max-w-full">
            <div className="self-stretch font-normal my-auto">
              <div className="text-black text-base">
                {transaction.transaction_type}
              </div>
              <time
                className="text-[#6F6E6D] text-xs"
                dateTime={transaction.created_at}
              >
                {formatDate(transaction.created_at)}
              </time>
            </div>
            <div className="text-[#323335] text-[19px] font-medium self-stretch my-auto">
              {currencySymbol}
              {transaction.amount}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
