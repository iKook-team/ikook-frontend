"use client";
import * as React from "react";
import { format } from "date-fns";
import { parseISO } from "date-fns/parseISO";

interface BookingDetailsProps {
  onClose: () => void;
  event?: {
    title: string;
    start: string | Date;
    end: string | Date;
    hasBooking: boolean;
    booking?: {
      id: string;
      service: string;
      host_user: string;
    };
  } | null;
}

function BookingDetails({ onClose, event }: BookingDetailsProps) {
  if (!event) return null;

  const startDate =
    typeof event.start === "string" ? parseISO(event.start) : event.start;
  const endDate =
    typeof event.end === "string" ? parseISO(event.end) : event.end;

  const dateString = format(startDate, "d MMMM yyyy").toUpperCase();
  const timeString =
    `${format(startDate, "EEEE, h a")} - ${format(endDate, "h a")}`.toUpperCase();

  const hasBooking = event.hasBooking && event.booking;

  return (
    <div className="relative h-[308px] w-[306px]">
      {/* Background container */}
      <div className="absolute inset-0 bg-white rounded-xl shadow-2xl overflow-hidden" />

      {/* Header */}
      <header className="absolute left-0 h-[41px] top-[18px] w-[306px]">
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="306" height="2" viewBox="0 0 306 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="header-divider" style="width: 306px; height: 0px; stroke-width: 1px; stroke: rgba(0, 0, 0, 0.10); position: absolute; left: 0px; top: 41px"> <path d="M0 1L306 1" stroke="black" stroke-opacity="0.1"></path> </svg>',
          }}
        />

        <button
          onClick={onClose}
          className="absolute right-4 top-0"
          aria-label="Close booking details"
        >
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-icon" style="width: 20px; height: 20px"> <path d="M10.0003 1.66797C5.39199 1.66797 1.66699 5.39297 1.66699 10.0013C1.66699 14.6096 5.39199 18.3346 10.0003 18.3346C14.6087 18.3346 18.3337 14.6096 18.3337 10.0013C18.3337 5.39297 14.6087 1.66797 10.0003 1.66797ZM13.5837 13.5846C13.5066 13.6619 13.415 13.7232 13.3142 13.765C13.2134 13.8068 13.1053 13.8283 12.9962 13.8283C12.887 13.8283 12.7789 13.8068 12.6781 13.765C12.5773 13.7232 12.4858 13.6619 12.4087 13.5846L10.0003 11.1763L7.59199 13.5846C7.43618 13.7404 7.22485 13.828 7.00449 13.828C6.78414 13.828 6.57281 13.7404 6.41699 13.5846C6.26118 13.4288 6.17364 13.2175 6.17364 12.9971C6.17364 12.888 6.19513 12.78 6.23689 12.6792C6.27864 12.5784 6.33984 12.4868 6.41699 12.4096L8.82533 10.0013L6.41699 7.59297C6.26118 7.43715 6.17364 7.22582 6.17364 7.00547C6.17364 6.78511 6.26118 6.57378 6.41699 6.41797C6.57281 6.26215 6.78414 6.17462 7.00449 6.17462C7.22485 6.17462 7.43618 6.26215 7.59199 6.41797L10.0003 8.8263L12.4087 6.41797C12.4858 6.34082 12.5774 6.27962 12.6782 6.23786C12.779 6.19611 12.887 6.17462 12.9962 6.17462C13.1053 6.17462 13.2133 6.19611 13.3141 6.23786C13.4149 6.27962 13.5065 6.34082 13.5837 6.41797C13.6608 6.49512 13.722 6.58671 13.7638 6.68752C13.8055 6.78832 13.827 6.89636 13.827 7.00547C13.827 7.11458 13.8055 7.22262 13.7638 7.32342C13.722 7.42422 13.6608 7.51582 13.5837 7.59297L11.1753 10.0013L13.5837 12.4096C13.9003 12.7263 13.9003 13.2596 13.5837 13.5846Z" fill="#323335"></path> </svg>',
            }}
          />
        </button>

        <div className="absolute top-0 h-5 text-sm leading-5 left-[23px] text-zinc-800 w-full pr-4">
          {dateString}
        </div>
        <div className="absolute h-5 text-xs leading-5 left-[23px] text-zinc-800 top-[17px] w-full pr-4">
          {timeString}
        </div>
      </header>

      {/* Availability section - Removed as it's not part of the API */}
      <div className="absolute left-0 h-[30px] top-[75px] w-[306px]">
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="306" height="2" viewBox="0 0 306 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="section-divider" style="width: 306px; height: 0px; stroke-width: 1px; stroke: rgba(0, 0, 0, 0.10); position: absolute; left: 0px; top: 30px"> <path d="M0 1L306 1" stroke="black" stroke-opacity="0.1"></path> </svg>',
          }}
        />
        <div className="absolute top-0 text-xs h-[18px] left-[23px] text-zinc-800 w-full">
          {hasBooking ? "Booked" : "Available"}
        </div>
      </div>

      {/* Booking section */}
      <section className="absolute left-0 h-[45px] top-[111px] w-[306px]">
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="306" height="2" viewBox="0 0 306 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="section-divider" style="width: 306px; height: 0px; stroke-width: 1px; stroke: rgba(0, 0, 0, 0.10); position: absolute; left: 0px; top: 45px"> <path d="M0 1L306 1" stroke="black" stroke-opacity="0.1"></path> </svg>',
          }}
        />

        <h3 className="absolute top-0 text-xs h-[18px] left-[23px] text-zinc-800 w-[49px]">
          Booking
        </h3>
        <p className="absolute top-5 h-3 text-xs left-[23px] text-zinc-800 text-opacity-40 w-[223px]">
          No booking to see. Your visibility attracts more bookings
        </p>
      </section>

      {/* Booking Details */}
      <section className="absolute h-[120px] left-[23px] top-[163px] w-[264px]">
        {hasBooking ? (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-zinc-800">
              Booking Details
            </h3>
            <div className="text-xs text-zinc-600 space-y-1">
              <p>
                <span className="font-medium">Service:</span>{" "}
                {event.booking?.service}
              </p>
              <p>
                <span className="font-medium">Host:</span>{" "}
                {event.booking?.host_user}
              </p>
              <p>
                <span className="font-medium">Status:</span> Confirmed
              </p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-zinc-600">
            <p>No booking details available.</p>
            <p className="text-xs text-zinc-400 mt-1">
              Your availability is visible to potential guests.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default BookingDetails;
