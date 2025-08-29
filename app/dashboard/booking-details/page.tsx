"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import BookingDetails from "@/components/dashboard/booking-details";
import BookingSummary from "@/components/dashboard/booking-summary";
import { useBooking } from "@/hooks/useBookings";
import { useAuthStore } from "@/lib/store/auth-store";
import BackButton from "@/components/common/BackButton";

export default function BookingDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { booking, loading, error } = useBooking(id || undefined);
  const { userType } = useAuthStore();
  const backFallback =
    userType === "host"
      ? "/dashboard/host"
      : userType === "chef"
        ? "/dashboard/chef"
        : "/dashboard";

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <main className="container mx-auto mt-6 px-4 sm:px-6 lg:px-8 max-w-5xl w-full">
        <div className="mb-4">
          <BackButton fallback={backFallback} />
        </div>
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
          <div className="flex gap-6 md:gap-8 flex-col md:flex-row">
            <div className="md:w-[57%] w-full">
              <BookingDetails
                booking={booking}
                userType={userType ?? undefined}
              />
            </div>
            <div className="md:w-[43%] w-full">
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
