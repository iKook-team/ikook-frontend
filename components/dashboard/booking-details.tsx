"use client";

import React from "react";

import StatusBadge from "./status-badge";
import MenuSection from "./menu-section";
import { CustomDetailsForm } from "./custom-details";

interface BookingDetailsProps {
  booking: any;
  userType: "host" | "chef" | undefined;
}

export default function BookingDetails({
  booking,
  userType,
}: BookingDetailsProps) {
  const isCustom = true;
  const starterItems = [
    { id: "1", name: "Mediterranean Chicken Kebab with Garlic Sauce" },
    { id: "2", name: "Roasted Red Pepper Greek Yoghurt Hummus" },
  ];

  const mainItems = [
    { id: "3", name: "Mackerel with Lemon Olive Oil and Tomatoes" },
  ];

  const dessertItems = [
    { id: "4", name: "Mackerel with Lemon Olive Oil and Tomatoes" },
  ];

  return (
    <section className="flex flex-col w-full max-md:mt-7 max-md:max-w-full">
      <h1 className="self-start text-2xl font-semibold leading-none text-black">
        {booking.chef_service || "Booking"}
      </h1>

      <StatusBadge
        status={booking.status}
        iconSrc="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/854fbc987f04d5db1e66f0babdee9a8a8d18031e?placeholderIfAbsent=true"
      />

      <article className="flex flex-wrap gap-4 py-2.5 pr-14 pl-2 mt-7 bg-white rounded-md border-solid shadow-2xl border-[0.639px] border-[color:var(--Gray-50,#E7E7E7)] max-md:pr-5">
        <img
          src={booking.imageUrl || "/chef.png"}
          className="object-contain shrink-0 aspect-[1.12] w-[90px]"
          alt={booking.chef_service || "Booking image"}
        />
        <div className="flex flex-col grow shrink-0 self-start mt-1.5 basis-0 w-fit">
          <h2 className="text-base font-medium text-zinc-800">
            {booking.chef_service || "Booking"}
          </h2>
          <div className="self-start mt-2 text-neutral-500">
            <p className="text-sm font-medium text-neutral-500">
              {booking.chef?.full_name || "Chef"}
            </p>
            <div className="flex gap-1.5 items-center text-xs">
              <div className="flex gap-1 items-center self-stretch my-auto leading-none whitespace-nowrap">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/48f373518e10c0b3534860fa41fb6c9d3719ed1f?placeholderIfAbsent=true"
                  className="object-contain shrink-0 self-stretch my-auto w-3 rounded-md aspect-square"
                  alt="Location icon"
                />
                <span className="self-stretch my-auto text-neutral-500">
                  {booking.city || booking.event_venue || "-"}
                </span>
              </div>
              <div className="flex items-center self-stretch my-auto">
                <div className="flex gap-1 items-center self-stretch my-auto leading-none whitespace-nowrap">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3a7920c5b9d227c8dbe64880f673c564700efcc0?placeholderIfAbsent=true"
                    className="object-contain shrink-0 self-stretch my-auto w-3 rounded-md aspect-square"
                    alt="Rating icon"
                  />
                  <span className="self-stretch my-auto text-neutral-500 w-[18px]">
                    {booking.chef?.rating || "-"}
                  </span>
                </div>
                <span className="self-stretch my-auto font-light text-neutral-500">
                  ({booking.chef?.review_count || 0} Reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {!isCustom && (
        <section className="flex flex-col items-start px-2.5 pt-2.5 pb-6 mt-7 rounded-md bg-stone-50 min-h-[335px] max-md:max-w-full">
          <MenuSection title="Starter x2" items={starterItems} />
          <MenuSection title="Main x1" items={mainItems} />
          <MenuSection title="Desert x1" items={dessertItems} />
        </section>
      )}

      <div className="px-2.5 pt-2.5 pb-6 mt-7 bg-stone-50 max-md:max-w-full">
        <CustomDetailsForm booking={booking} />
      </div>
    </section>
  );
}
