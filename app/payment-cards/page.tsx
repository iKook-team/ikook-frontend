import React from "react";

import { PaymentsList } from "@/components/payment/payment-list";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen flex justify-center">
      <main className="relative">
        <PaymentsList />
      </main>
    </div>
  );
};

export default Index;
