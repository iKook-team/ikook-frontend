"use client";

import React from "react";

import BookingDetails from "@/components/dashboard/booking-details";
import BookingSummary from "@/components/dashboard/booking-summary";

export default function BookingDetailsPage() {
  return (
    <div className="flex overflow-hidden flex-col bg-zinc-50">

      <main className="self-center mt-9 max-w-full w-[885px]">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[57%] max-md:ml-0 max-md:w-full">
            <BookingDetails />
          </div>
          <div className="ml-5 w-[43%] max-md:ml-0 max-md:w-full">
            <BookingSummary />
          </div>
        </div>
      </main>

    </div>
  );
}
