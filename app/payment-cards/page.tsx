"use client";

import React from "react";

import { PaymentsList } from "@/components/payment/payments-list";
import BackButton from "@/components/common/BackButton";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative flex flex-col items-center">
        <div className="w-[662px] max-w-full mt-4">
          <BackButton fallback="/settings" />
        </div>
        <PaymentsList />
      </main>
    </div>
  );
};

export default Index;
