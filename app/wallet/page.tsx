"use client";

import React, { useState, useEffect } from "react";

import { WalletBalance } from "@/components/wallet/wallet-balance";
import { TransactionTabs } from "@/components/wallet/transaction-tabs";
import { TransactionList } from "@/components/wallet/transaction-list";
import { paymentsService } from "@/lib/api/payments";

interface Transaction {
  id: string | number;
  transaction_type: string;
  amount: string | number;
  created_at: string;
}

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"redeemed" | "debits">("redeemed");
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      setError(null);
      try {
        const walletDetails = await paymentsService.getWalletDetails();
        const txData = await paymentsService.getWalletTransactions();

        setWallet(walletDetails);
        setTransactions(txData.results || []);
      } catch (err: any) {
        setError("Failed to load wallet data");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  // Filter transactions by type for tabs
  const redeemedTransactions = transactions.filter(
    (tx) => tx.transaction_type === "Credit",
  );
  const debitsTransactions = transactions.filter(
    (tx) => tx.transaction_type !== "Credit",
  );
  const currentTransactions =
    activeTab === "redeemed" ? redeemedTransactions : debitsTransactions;

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] flex justify-center px-2 sm:px-4">
      <main className="w-full max-w-4xl flex flex-col items-stretch py-4 sm:py-8 px-2 sm:px-4">
        <h1 className="text-black text-xl sm:text-2xl font-semibold leading-none mb-4 sm:mb-6">
          Wallet
        </h1>
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading wallet data...</div>
        ) : error ? (
          <div className="mt-8 text-red-500">{error}</div>
        ) : (
          <>
            <WalletBalance balance={wallet?.balance} />
            {transactions.length > 0 ? (
              <>
                <TransactionTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
                <TransactionList transactions={currentTransactions} />
              </>
            ) : (
              <div className="text-center py-12 text-gray-500 px-4">
                No transactions found in your wallet yet.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
