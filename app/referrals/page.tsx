import React from "react";

import ReferralStats from "@/components/referrals/referral-stats";
import ReferralList from "@/components/referrals/referral-list";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFB] relative">
      <main className="w-full relative">
        <div className="px-[278px] max-md:px-5 max-sm:px-4">
          <h1 className="text-black text-2xl font-bold leading-8 mt-[35px] mb-8 max-sm:text-xl">
            Referral
          </h1>

          <ReferralStats />
          <ReferralList />
        </div>
      </main>
    </div>
  );
};

export default Index;
