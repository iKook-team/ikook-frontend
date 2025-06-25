"use client";

import React from "react";

import { PaymentSuccess } from "@/components/booking/payment-success";

const PaymentPage = () => {
  const handleSendMessage = () => {
    // Handle send message logic here
    // Implementation for sending message will go here
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-[655px]">
        <PaymentSuccess
          chefName="Chef Name"
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
