"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";

interface BookingSummaryProps {
  booking?: any;
  userType?: "host" | "chef";
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  booking,
  userType,
}) => {
  const router = useRouter();
  const { market } = useMarket();
  const marketCfg = getMarketConfig(market);

  if (!booking) {
    // fallback to old UI
    const user = "chef";
    const isUpcoming = "upcoming";
    const isEnquiry = "enquiry";
    const isCustom = true;

    return (
      <aside className="flex flex-col grow justify-center px-8 py-9 mt-9 w-full bg-white rounded-2xl border border-solid shadow-2xl border-[color:var(--Black-100,#E7E7E7)] max-md:px-5 max-md:mt-10">
        <div className="flex flex-col w-full">
          <button
            className="overflow-hidden gap-2 self-stretch px-10 py-3 max-w-full text-base font-semibold text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[310px] max-md:px-5"
            onClick={() => router.push("/chat")}
          >
            {user === "chef" ? "Message Host" : "Message Chef"}
          </button>
          {/* ...rest of fallback UI... */}
        </div>
      </aside>
    );
  }

  // Render from booking data
  const isUpcoming = booking.status === "Upcoming";
  const isEnquiry = booking.status === "Enquiries";
  const isCustom = booking.is_custom;
  const total = booking.total_cost !== undefined && booking.total_cost !== null
    ? `${marketCfg.currencySymbol}${Number(booking.total_cost).toLocaleString(marketCfg.locale)}`
    : "-";
  const guests = booking.num_of_guests || "-";
  const eventDate = booking.event_date || "-";
  const eventTime = booking.event_time || "-";
  const address = booking.address || "-";

  return (
    <aside className="flex flex-col grow justify-center px-8 py-9 mt-9 w-full bg-white rounded-2xl border border-solid shadow-2xl border-[color:var(--Black-100,#E7E7E7)] max-md:px-5 max-md:mt-10">
      <div className="flex flex-col w-full">
        <button
          className="overflow-hidden gap-2 self-stretch px-10 py-3 max-w-full text-base font-semibold text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[310px] max-md:px-5 hover:bg-amber-500 transition-colors"
          onClick={() => router.push("/chat")}
        >
          {userType === "chef" ? "Message Host" : "Message Chef"}
        </button>
        <div className="flex flex-col items-start self-start mt-8 text-sm leading-none text-black">
          <div className="flex gap-2 items-center">
            <Image
              alt="Calendar icon"
              className="object-contain shrink-0 self-stretch my-auto"
              height={16}
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
              width={16}
            />
            <span className="self-stretch my-auto">
              {eventDate} {eventTime}
            </span>
          </div>
          <div className="flex gap-2 items-center self-stretch mt-4">
            <Image
              alt="Location icon"
              className="object-contain shrink-0 self-stretch my-auto"
              height={16}
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d96ffdeb434bdcd9975f48a4eaec165b56e9ce8e?placeholderIfAbsent=true"
              width={16}
            />
            <span className="self-stretch my-auto">{address}</span>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <Image
              alt="Guests icon"
              className="object-contain shrink-0 self-stretch my-auto"
              height={16}
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/45283b32ce1ac86f65d64d8f95bf40d9b6067af1?placeholderIfAbsent=true"
              width={16}
            />
            <span className="self-stretch my-auto">{guests} Guests</span>
          </div>
        </div>
        <div className="mt-8 max-w-full text-zinc-800 w-[303px]">
          <div className="text-base font-medium">
            <div className="flex gap-10 items-start">
              <span className="text-zinc-800 w-[209px]">Total</span>
              <span className="text-right text-zinc-800 w-[35px]">{total}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full text-base font-semibold max-w-[310px]">
          {userType === "chef" &&
            booking.status?.toLowerCase() === "upcoming" && (
              <button className="overflow-hidden gap-2 self-stretch px-5 py-2.5 w-full bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Gray-100,#CFCFCE)] text-slate-700">
                Mark as completed
              </button>
            )}
          {userType === "chef" && isCustom && isEnquiry && (
            <button className="overflow-hidden gap-2 self-stretch px-5 py-2.5 mt-3 w-full text-white bg-black rounded-lg border border-solid shadow-sm border-[color:var(--Black,#020101)]">
              Send Quote
            </button>
          )}
          {userType === "host" &&
            booking.status?.toLowerCase() === "pending" && (
              <button
                onClick={() => {
                  // Navigate to checkout with booking ID and isCustomBooking flag
                  router.push(
                    `/booking/checkout?bookingId=${booking.id}${booking.is_custom ? "&isCustomBooking=true" : ""}`,
                  );
                }}
                className="overflow-hidden gap-2 self-stretch px-5 py-2.5 mt-3 w-full text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] hover:bg-amber-500 transition-colors"
              >
                Make Payment
              </button>
            )}
          {booking.status?.toLowerCase() === "completed" &&
            !booking.has_review && (
              <button
                onClick={() =>
                  router.push(
                    `/dashboard/reviews/create?bookingId=${booking.id}`,
                  )
                }
                className="overflow-hidden gap-2 self-stretch px-5 py-2.5 mt-3 w-full text-white bg-blue-500 rounded-lg border border-solid shadow-sm hover:bg-blue-600 transition-colors"
              >
                Create Review
              </button>
            )}
        </div>
      </div>
    </aside>
  );
};

export default BookingSummary;
