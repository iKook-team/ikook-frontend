import React from 'react';

interface Transaction {
  id: string;
  type: string;
  date: string;
  amount: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <section className="mt-[35px] max-md:max-w-full" aria-label="Transaction history">
      {transactions.map((transaction, index) => (
        <article
          key={transaction.id}
          className="justify-center items-stretch border flex w-full max-w-[885px] flex-col overflow-hidden px-[18px] py-1.5 rounded-md border-solid border-[#CFCFCE] max-md:max-w-full"
          style={{ marginTop: index > 0 ? '8px' : '0' }}
        >
          <div className="flex items-center justify-between flex-wrap max-md:max-w-full">
            <div className="self-stretch font-normal my-auto">
              <div className="text-black text-base">{transaction.type}</div>
              <time className="text-[#6F6E6D] text-xs" dateTime={transaction.date}>
                {transaction.date}
              </time>
            </div>
            <div className="text-[#323335] text-[19px] font-medium self-stretch my-auto">
              {transaction.amount}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
