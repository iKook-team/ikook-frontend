import React from "react";

import { RevenueMetrics } from "@/components/revenue/revenue-metrics";
import { WithdrawHistory } from "@/components/revenue/withdrawal-history";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <RevenueMetrics />
        <WithdrawHistory />
      </main>
    </div>
  );
};

export default Index;
