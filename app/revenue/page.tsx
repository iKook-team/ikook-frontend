"use client";
import React, { useEffect, useState } from "react";

import { revenueService } from "@/lib/api/revenue";
import { RevenueMetrics } from "@/components/revenue/revenue-metrics";
import { WithdrawHistory } from "@/components/revenue/withdrawal-history";
import { WithdrawalModal } from "@/components/revenue/withdrawal-modal";
// import RevenueSummary from ... (assume your UI component)
// import WithdrawalHistory from ... (assume your UI component)

const RevenuePage = () => {
  const [earnings, setEarnings] = useState<any>(null);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const earningsData = await revenueService.getEarnings();
        const withdrawalsData = await revenueService.getWithdrawals();
        setEarnings(earningsData.data);
        setWithdrawals(withdrawalsData.data?.results || []);
      } catch (err: any) {
        setError(err.message || "Failed to load revenue data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            {/* Revenue summary section */}
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px] w-full">
                <span className="text-lg text-gray-600">Loading revenue...</span>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center min-h-[200px] w-full">
                <span className="text-red-500 text-lg">{error}</span>
              </div>
            ) : (
              <>
                <RevenueMetrics earnings={earnings} />
                <WithdrawHistory withdrawals={withdrawals} onWithdraw={() => setShowWithdrawModal(true)} />
                <WithdrawalModal
                  open={showWithdrawModal}
                  onClose={() => setShowWithdrawModal(false)}
                  availableBalance={parseFloat(earnings?.balance || "0")}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RevenuePage;
