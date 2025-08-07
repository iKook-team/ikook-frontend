"use client";

import React, { useEffect, useState } from "react";
import { referralsService } from "@/lib/api/referrals";
import { toast } from "sonner";

const ReferralStats = () => {
  const [rewardData, setRewardData] = useState<{
    totalBonus: string;
    totalReferrals: number;
    referralCode: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        const response = await referralsService.getReferralReward();
        if (response.status) {
          setRewardData({
            totalBonus: response.data.total_bonus || "0.00",
            totalReferrals: response.data.total_referrals,
            referralCode: response.data.referral_code,
          });
        }
      } catch (error) {
        console.error("Failed to fetch referral reward data:", error);
        toast.error("Failed to load referral data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewardData();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full max-w-[885px] mt-8 sm:px-6 mx-auto">
        <div className="animate-pulse flex flex-col md:flex-row gap-6 w-full bg-[#FFFCF5] p-6 rounded-lg">
          <div className="h-20 bg-gray-200 rounded w-1/2"></div>
          <div className="h-20 bg-gray-200 rounded w-1/2"></div>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full max-w-[885px] mt-8 sm:px-6 mx-auto">
      <div className="flex flex-col md:flex-row gap-6 w-full bg-[#FFFCF5] p-6 rounded-lg">
        <div className="flex-1">
          <div className="text-[#323335] text-sm font-normal mb-1">
            Rewarded amount
          </div>
          <div className="text-[#323335] text-2xl font-bold">
            £{rewardData?.totalBonus || "0.00"}
          </div>
        </div>

        <div className="flex-1 border border-solid border-[#CFCFCE] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-black text-xs font-normal">Total referred</span>
            <span className="text-black text-xs font-normal">
              {rewardData?.totalReferrals || 0} friend{rewardData?.totalReferrals !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="w-full h-2.5 bg-[#D9D9D9] rounded-md overflow-hidden mb-2">
            <div 
              className="h-full bg-[#FCC01C] rounded-md" 
              style={{ width: `${rewardData?.totalReferrals || 0}%` }}
            />
          </div>

          <div className="text-black text-xs font-normal text-center">
            £0.00 used bonus
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralStats;
