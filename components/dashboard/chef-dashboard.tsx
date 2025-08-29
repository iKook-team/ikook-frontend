"use client";
import React, { useState } from "react";

import { BookingCard } from "./booking-card";
import { DocumentNotification } from "./document-notification";

import useBookings from "@/hooks/useBookings";

const STATUS_OPTIONS = [
  "Upcoming",
  "Enquiries",
  "Pending",
  "Completed",
  "Cancelled",
];

export const MyBookingsPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("Upcoming");
  const { bookings, loading, error, totalCount, refetch } = useBookings({
    status: selectedStatus,
  });

  return (
    <div className="flex overflow-hidden flex-col bg-zinc-50">
      <main className="flex flex-col self-center mt-9 w-full max-w-[1114px] max-md:max-w-full">
        <h1 className="self-start ml-28 text-2xl font-semibold leading-none text-black max-md:ml-2.5">
          My Bookings
        </h1>

        <section className="flex self-center mt-8 max-w-full w-[885px]">
          <DocumentNotification />
        </section>

        <nav className="flex gap-4 items-start mt-9 md:ml-28 ml-0 text-xs font-medium text-zinc-950 w-full">
          <div className="flex flex-wrap gap-2.5 items-start w-full">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                className={`overflow-hidden gap-2 self-stretch px-3.5 py-2 border-solid rounded-[30.689px] ${
                  selectedStatus === status
                    ? "text-white bg-amber-400 border-[1.534px] border-[color:var(--Primary-200,#F9DF98)]"
                    : "text-zinc-950 border-[0.767px] border-[color:var(--Black-200,#CFCFCE)]"
                }`}
                onClick={() => setSelectedStatus(status)}
                type="button"
              >
                {status}
              </button>
            ))}
          </div>
        </nav>

        <section className="self-center md:mt-9 mt-2 max-w-full w-[887px]">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading bookings...
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                onClick={refetch}
                type="button"
              >
                Retry
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No bookings found for this status.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-1.5">
              {bookings.map((booking, idx) => (
                <BookingCard key={idx} booking={booking} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyBookingsPage;
