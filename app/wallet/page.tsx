"use client";

import React, { useState } from "react";

import { WalletBalance } from "@/components/wallet/wallet-balance";
import { TransactionTabs } from "@/components/wallet/transaction-tabs";
import { TransactionList } from "@/components/wallet/transaction-list";

interface Transaction {
  id: string;
  type: string;
  date: string;
  amount: string;
}

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"redeemed" | "debits">("redeemed");

  const redeemedTransactions: Transaction[] = [
    {
      id: "1",
      type: "Gift voucher",
      date: "15 October, 2023",
      amount: "£1,000",
    },
    {
      id: "2",
      type: "Gift voucher",
      date: "15 October, 2023",
      amount: "£1,000",
    },
    {
      id: "3",
      type: "Gift voucher",
      date: "15 October, 2023",
      amount: "£1,000",
    },
    {
      id: "4",
      type: "Gift voucher",
      date: "15 October, 2023",
      amount: "£1,000",
    },
    {
      id: "5",
      type: "Gift voucher",
      date: "15 October, 2023",
      amount: "£1,000",
    },
    {
      id: "6",
      type: "Gift voucher",
      date: "15 October, 2023",
      amount: "£1,000",
    },
    {
      id: "7",
      type: "Gift voucher",
      date: "15 October, 2023",
      amount: "£1,000",
    },
    {
      id: "8",
      type: "Gift voucher",
      date: "15 October, 2023",
      amount: "£1,000",
    },
    {
      id: "9",
      type: "Gift voucher",
      date: "15 October, 2023",
      amount: "£1,000",
    },
  ];

  const debitsTransactions: Transaction[] = [
    {
      id: "10",
      type: "Service charge",
      date: "14 October, 2023",
      amount: "-£50",
    },
    {
      id: "11",
      type: "Processing fee",
      date: "13 October, 2023",
      amount: "-£25",
    },
    {
      id: "12",
      type: "Transaction fee",
      date: "12 October, 2023",
      amount: "-£15",
    },
  ];

  const currentTransactions =
    activeTab === "redeemed" ? redeemedTransactions : debitsTransactions;

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] flex justify-center max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="flex w-[885px] max-w-full flex-col items-stretch mt-[35px] px-4">
        <h1 className="text-black text-2xl font-semibold leading-none">
          Wallet
        </h1>

        <WalletBalance />

        <TransactionTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <TransactionList transactions={currentTransactions} />
      </main>
    </div>
  );
};

export default Index;
