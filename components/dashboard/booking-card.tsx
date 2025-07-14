"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { FaMoneyBillWave } from "react-icons/fa";

// Accept either a booking object or the old props for backward compatibility
export type BookingCardProps =
  | { booking: any }
  | {
      user: "host" | "chef";
      title: string;
      date: string;
      location: string;
      price: string;
      description: string;
      attendees: string;
      imageUrl: string;
    };

export const BookingCard: React.FC<BookingCardProps> = (props) => {
  const router = useRouter();

  // If booking prop is present, use new mapping
  if ("booking" in props) {
    const { booking } = props;
    const formattedDate = booking.created_at
      ? new Date(booking.created_at).toLocaleDateString()
      : "-";
    const formattedCost = booking.total_cost
      ? `₦${Number(booking.total_cost).toLocaleString()}`
      : "-";
    const location = booking.city || "-";
    const title = booking.chef_service || "-";
    const status = booking.status || "-";
    const attendees = booking.num_of_guests ? `${booking.num_of_guests} guests` : "-";
    const description = booking.description || "";
    const imageUrl = booking.imageUrl || "";
    const eventVenue = booking.event_venue || "-";

    return (
      <article className="flex flex-col px-px py-4 mx-auto w-full rounded-2xl border border-solid border-[color:var(--Black-200,#CFCFCE)] max-md:mt-9 max-md:max-w-full">
        <div className="flex flex-col items-start self-start ml-5 max-md:ml-2.5">
          <div className="flex gap-1 items-start px-2.5 py-1.5 text-xs text-black whitespace-nowrap bg-neutral-200 rounded-[30px]">
            <Image
              alt="Status icon"
              className="object-contain shrink-0 w-4 aspect-square"
              height={20}
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/854fbc987f04d5db1e66f0babdee9a8a8d18031e?placeholderIfAbsent=true"
              width={20}
            />
            <div>{status}</div>
          </div>
          <div className="mt-6">
            <div>
              <h3 className="text-xl font-semibold text-zinc-950">{title}</h3>
              <div className="flex gap-7 items-center mt-2 text-xs text-black">
                <div className="flex gap-2 items-center self-stretch my-auto">
                  <Image
                    alt="Date icon"
                    className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    height={20}
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
                    width={20}
                  />
                  <div className="self-stretch my-auto">{formattedDate}</div>
                </div>
                <div className="flex gap-2 items-center self-stretch my-auto">
                  <Image
                    alt="Location icon"
                    className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    height={20}
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/09ddc772831e94523cc11b4412b9637a74f404bf?placeholderIfAbsent=true"
                    width={20}
                  />
                  <div className="self-stretch my-auto">{location}</div>
                </div>
                <div className="flex gap-2 items-center self-stretch my-auto whitespace-nowrap">
                  <FaMoneyBillWave className="w-4 h-4 text-green-600" />
                  <div className="self-stretch my-auto">{formattedCost}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-7 items-center self-stretch mt-6 text-sm text-neutral-700">
            {/* Event venue and guests with vertical divider */}
            <div className="flex items-center gap-3">
              <span className="text-neutral-700">{eventVenue}</span>
              <span className="h-4 border-l border-gray-300 mx-2 inline-block align-middle"></span>
              <span className="text-neutral-700">{attendees}</span>
            </div>
          </div>
        </div>
        {(imageUrl && imageUrl.trim() !== "") ? (
          <Image
            alt={`Booking for ${title}`}
            className="object-contain mt-4 w-full aspect-[500] stroke-[1px] stroke-stone-300 max-md:max-w-full"
            height={20}
            src={imageUrl}
            width={20}
          />
        ) : (
          <Image
            alt="Default booking image"
            className="object-contain mt-4 w-full aspect-[500] stroke-[1px] stroke-stone-300 max-md:max-w-full"
            height={20}
            src="/chef.png"
            width={20}
          />
        )}
        <hr className="my-4 border-t border-gray-200 w-full" />
        <div className="flex gap-3 items-start self-end mt-4 mr-9 text-sm font-semibold leading-none max-md:mr-2.5">
          <div className="flex items-start whitespace-nowrap rounded-lg text-slate-700">
            <button
              className="overflow-hidden gap-2 self-stretch px-3.5 py-2 bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Gray-100,#CFCFCE)] text-slate-700"
              onClick={() => router.push("/chat")}
            >
              Message
            </button>
          </div>
          <div className="flex items-start text-white rounded-lg">
            <button
              className="overflow-hidden gap-2 self-stretch px-3.5 py-2 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)]"
              onClick={() => router.push(`/dashboard/booking-details?id=${booking.id}`)}
            >
              Booking details
            </button>
          </div>
        </div>
      </article>
    );
  }

  // fallback to old props for backward compatibility
  const { user, title, date, location, price, description, attendees, imageUrl } = props as any;
  return (
    <article className="flex flex-col px-px py-4 mx-auto w-full rounded-2xl border border-solid border-[color:var(--Black-200,#CFCFCE)] max-md:mt-9 max-md:max-w-full">
      <div className="flex flex-col items-start self-start ml-5 max-md:ml-2.5">
        <div className="flex gap-1 items-start px-2.5 py-1.5 text-xs text-black whitespace-nowrap bg-neutral-200 rounded-[30px]">
          <Image
            alt="Enquiry icon"
            className="object-contain shrink-0 w-4 aspect-square"
            height={20}
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/854fbc987f04d5db1e66f0babdee9a8a8d18031e?placeholderIfAbsent=true"
            width={20}
          />
          <div>Enquiry</div>
        </div>
        <div className="mt-6">
          <div>
            <h3 className="text-xl font-semibold text-zinc-950">{title}</h3>
            <div className="flex gap-7 items-center mt-2 text-xs text-black">
              <div className="flex gap-2 items-center self-stretch my-auto">
                <Image
                  alt="Date icon"
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                  height={20}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
                  width={20}
                />
                <div className="self-stretch my-auto">{date}</div>
              </div>
              <div className="flex gap-2 items-center self-stretch my-auto">
                <Image
                  alt="Location icon"
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                  height={20}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/09ddc772831e94523cc11b4412b9637a74f404bf?placeholderIfAbsent=true"
                  width={20}
                />
                <div className="self-stretch my-auto">{location}</div>
              </div>
              <div className="flex gap-2 items-center self-stretch my-auto whitespace-nowrap">
                <FaMoneyBillWave className="w-4 h-4 text-green-600" />
                <div className="self-stretch my-auto">{price}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-7 items-center self-stretch mt-6 text-sm text-neutral-700">
          <div className="self-stretch my-auto text-neutral-700">
            {description}
          </div>
          <Image
            alt="Attendees icon"
            className="object-contain shrink-0 self-stretch my-auto w-px aspect-[0.07] stroke-[1px] stroke-neutral-700"
            height={20}
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/45549a31d604ae605135c72056d382b3f2443fca?placeholderIfAbsent=true"
            width={20}
          />
          <div className="self-stretch my-auto text-neutral-700">
            {attendees}
          </div>
        </div>
      </div>
      {(imageUrl && imageUrl.trim() !== "") ? (
        <Image
          alt={`Booking for ${title}`}
          className="object-contain mt-4 w-full aspect-[500] stroke-[1px] stroke-stone-300 max-md:max-w-full"
          height={20}
          src={imageUrl}
          width={20}
        />
      ) : (
        <Image
          alt="Default booking image"
          className="object-contain mt-4 w-full aspect-[500] stroke-[1px] stroke-stone-300 max-md:max-w-full"
          height={20}
          src="/chef.png"
          width={20}
        />
      )}
      <hr className="my-4 border-t border-gray-200 w-full" />
      <div className="flex gap-3 items-start self-end mt-4 mr-9 text-sm font-semibold leading-none max-md:mr-2.5">
        <div className="flex items-start whitespace-nowrap rounded-lg text-slate-700">
          <button
            className="overflow-hidden gap-2 self-stretch px-3.5 py-2 bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Gray-100,#CFCFCE)] text-slate-700"
            onClick={() => router.push("/chat")}
          >
            Message
          </button>
        </div>
        <div className="flex items-start text-white rounded-lg">
          <button
            className="overflow-hidden gap-2 self-stretch px-3.5 py-2 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)]"
            onClick={() => router.push(`/dashboard/booking-details?id=${(props as any).id || ''}`)}
          >
            {user === "host" ? "Enquiry" : "Booking"} details
          </button>
        </div>
      </div>
    </article>
  );
};
