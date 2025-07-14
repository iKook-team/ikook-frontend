"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import BookingDetails from "@/components/dashboard/booking-details";
import BookingSummary from "@/components/dashboard/booking-summary";
import { useBooking } from "@/hooks/useBookings";
import { useAuthStore } from "@/lib/store/auth-store";

export default function BookingDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { booking, loading, error } = useBooking(id || undefined);
  const { userType } = useAuthStore();

  return (
    <div className="flex overflow-hidden flex-col bg-zinc-50">
      <main className="self-center mt-9 max-w-full w-[885px]">
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading booking details...
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : !booking ? (
          <div className="text-center py-12 text-gray-500">
            No booking found.
          </div>
        ) : (
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[57%] max-md:ml-0 max-md:w-full">
              <BookingDetails
                booking={booking}
                userType={userType ?? undefined}
              />
            </div>
            <div className="ml-5 w-[43%] max-md:ml-0 max-md:w-full">
              <BookingSummary
                booking={booking}
                userType={userType ?? undefined}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
