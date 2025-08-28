"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiCopy } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { BookingCard } from "./booking-card";

import useBookings from "@/hooks/useBookings";
import { useAuthStore } from "@/lib/store/auth-store";

const STATUS_OPTIONS = [
  "Upcoming",
  "Enquiries",
  "Pending",
  "Completed",
  "Cancelled",
];

export const MyBookingsPage: React.FC = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>("Upcoming");
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout>();

  const { bookings, loading, error, totalCount, refetch } = useBookings({
    status: selectedStatus,
  });
  const { user } = useAuthStore();
  const referralCode = user?.username || "-";

  const handleCheckReferral = () => {
    router.push("/referrals");
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(referralCode);
    setShowCopiedTooltip(true);

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    copyTimeoutRef.current = setTimeout(() => {
      setShowCopiedTooltip(false);
    }, 2000);
  };

  return (
    <div className="flex overflow-hidden flex-col bg-zinc-50">
      <main className="flex flex-col self-center mt-9 w-full max-w-[1114px] max-md:max-w-full">
        <h1 className="self-start ml-28 text-2xl font-semibold leading-none text-black max-md:ml-2.5">
          My Bookings
        </h1>
        {!user?.identity_verified ? (
          <section
            className="flex justify-center items-center self-center mt-8 w-full max-w-[885px] box-border bg-[#1C58FC] pt-4 pb-[16.808px] px-[15px] rounded-[10px] max-md:max-w-full max-md:px-3 max-md:py-4 max-sm:h-auto max-sm:min-h-[60px] max-sm:px-2.5 max-sm:py-3"
            role="banner"
            aria-label="Identity verification notification"
          >
            <div className="flex items-center gap-3.5 w-full max-sm:flex-col max-sm:gap-2.5">
              <div className="flex-shrink-0" role="img" aria-label="Shield icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 shrink-0"
                >
                  <path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" fill="white" fillOpacity="0.9" />
                  <path d="M9 12l2 2 4-4" stroke="#1C58FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex items-center gap-6 flex-1 max-sm:flex-col max-sm:gap-3 max-sm:items-center max-sm:w-full">
                <p className="text-white text-sm font-normal leading-5 max-sm:text-xs max-sm:text-center">
                  Verify your identity to complete your profile and ensure a safe experience.
                </p>
                <div className="flex items-start ml-auto">
                  <button
                    onClick={() => router.push("/verification")}
                    className="px-3.5 py-2 bg-white text-[#1C58FC] rounded-lg text-sm font-medium hover:bg-gray-100"
                    aria-label="Verify identity"
                  >
                    Verify now
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="flex flex-wrap gap-5 justify-between self-center mt-8 max-w-full w-[885px]">
            <div className="flex flex-col justify-center px-3 py-5 text-xs bg-amber-100 rounded-lg text-neutral-700">
              <div className="flex gap-3 items-center">
                <Image
                  alt="Payment refundable icon"
                  className="object-contain shrink-0 self-stretch my-auto"
                  height={20}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/75d3ec646f092868067adae007d588e6b96a5773?placeholderIfAbsent=true"
                  width={20}
                />
                <p className="self-stretch my-auto w-[335px]">
                  Payment is fully refundable{" "}
                  <span style={{ fontWeight: 700 }}>12 days </span>before the
                  event
                </p>
              </div>
            </div>
            <div className="flex gap-7 items-center px-2 py-2 rounded-lg border border-solid border-[color:var(--Primary,#FCC01C)] min-h-[55px]">
              <div className="flex flex-col self-stretch my-auto text-xs">
                <div className="text-neutral-500">Your referral code</div>
                <div className="flex gap-2 items-center self-start mt-1.5 font-bold text-black whitespace-nowrap">
                  <div className="self-stretch my-auto text-black">
                    {referralCode}
                  </div>
                  <div className="relative">
                    <FiCopy
                      className="w-4 h-4 text-gray-500 cursor-pointer hover:text-amber-400 transition-colors"
                      onClick={handleCopyClick}
                    />
                    {showCopiedTooltip && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Copied!
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckReferral}
                className="overflow-hidden gap-2 self-stretch px-4 py-2.5 my-auto text-sm font-semibold leading-none text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] hover:bg-amber-500 transition-colors"
              >
                Check referral
              </button>
            </div>
          </section>
        )}

        <nav className="flex gap-4 items-start self-start mt-9 ml-28 text-xs font-medium text-zinc-950 max-md:max-w-full">
          <div className="flex flex-wrap gap-2.5 items-start min-w-60 max-md:max-w-full">
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

        <section className="self-center mt-9 max-w-full w-[887px]">
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
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
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
