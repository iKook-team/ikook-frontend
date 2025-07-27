"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { Checkout } from "@/components/checkout/checkout";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const isCustomBooking = searchParams.get("isCustomBooking") === "true";

  if (!bookingId) {
    return (
      <div className="min-h-screen w-full bg-gray-50 py-10 px-4 flex justify-center">
        <div className="max-w-[1062px] mx-auto text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">
            Booking ID is required
          </h1>
          <p>Please go back and try again with a valid booking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 flex justify-center">
      <div className="max-w-[1062px] mx-auto w-full">
        <Checkout
          bookingId={parseInt(bookingId, 10)}
          isCustomBooking={isCustomBooking}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
