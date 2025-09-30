"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { referralsService } from "@/lib/api/referrals";
import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString("en-US", options);
};

const ReferralList = () => {
  const [referrals, setReferrals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((s) => s.user);
  const currencySymbol = getCurrencySymbol(user || undefined);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await referralsService.getReferralList();

        setReferrals(response.data?.results || []);
      } catch (error) {
        console.error("Failed to fetch referrals:", error);
        setError("Failed to load referral history. Please try again later.");
        toast.error("Failed to load referral history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full max-w-[885px] mx-auto mt-8 px-4 sm:px-6">
        <h2 className="text-lg font-semibold mb-4">Referral History</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse h-16 bg-gray-100 rounded-lg"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-[885px] mx-auto mt-8 px-4 sm:px-6">
        <h2 className="text-lg font-semibold mb-4">Referral History</h2>
        <div className="text-center py-8 text-gray-500">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (referrals.length === 0) {
    return (
      <section className="w-full max-w-[885px] mx-auto mt-8 px-4 sm:px-6">
        <h2 className="text-lg font-semibold mb-4">Referral History</h2>
        <div className="text-center py-8 text-gray-500">
          <p>You have no referrals yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[885px] mx-auto mt-8 px-4 sm:px-6">
      <h2 className="text-lg font-semibold mb-4">Referral History</h2>
      <div className="space-y-3 w-full">
        {referrals.map((referral) => (
          <article
            key={referral.id}
            className="flex items-center justify-between w-full p-4 border border-solid border-[#CFCFCE] rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-normal text-black truncate">
                {referral.referee?.first_name} {referral.referee?.last_name}
              </h3>
              <time className="text-xs font-normal text-[#6F6E6D]">
                {formatDate(referral.created_at)}
              </time>
            </div>
            <div className="text-lg font-normal text-[#323335] ml-4 whitespace-nowrap">
              {currencySymbol}
              {parseFloat(referral.reward_amount).toFixed(2)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReferralList;
