import React from "react";

interface TransactionItemProps {
  title: string;
  date: string;
  amount: string;
  status: string;
}

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
        <div className="flex gap-2.5 justify-center items-center p-1 bg-emerald-100 rounded">
          <span className="text-xs text-green-600">{status}</span>
        </div>
      </div>
    </div>
  </div>
);

export const WithdrawHistory = () => {
  const transactions = [
    {
      title: "Withdrawal to Bank",
      date: "17/10/2022",
      amount: "£432",
      status: "Successful",
    },
    {
      title: "Withdrawal to Bank",
      date: "17/10/2022",
      amount: "£432",
      status: "Successful",
    },
    {
      title: "Withdrawal to Bank",
      date: "17/10/2022",
      amount: "£432",
      status: "Successful",
    },
    {
      title: "Withdrawal to Bank",
      date: "17/10/2022",
      amount: "£432",
      status: "Successful",
    },
    {
      title: "Withdrawal to Bank",
      date: "17/10/2022",
      amount: "£432",
      status: "Successful",
    },
    {
      title: "Withdrawal to Bank",
      date: "17/10/2022",
      amount: "£432",
      status: "Successful",
    },
    {
      title: "Withdrawal to Bank",
      date: "17/10/2022",
      amount: "£432",
      status: "Successful",
    },
  ];

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
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            title={transaction.title}
            date={transaction.date}
            amount={transaction.amount}
            status={transaction.status}
          />
        ))}
      </div>

      <button className="flex justify-center items-center px-28 py-3 h-12 bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm mt-4">
        <span className="text-base font-bold leading-6 text-white">
          Withdraw fund
        </span>
      </button>
    </section>
  );
};
