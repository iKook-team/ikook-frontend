"use client";

import React from "react";

import { Checkout } from "@/components/checkout/checkout";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 flex justify-center">
      <div className="max-w-[1062px] mx-auto">
        <Checkout bookingId={1} />
      </div>
    </div>
  );
};

export default CheckoutPage;
