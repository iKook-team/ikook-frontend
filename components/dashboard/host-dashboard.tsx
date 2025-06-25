"use client";
import React from "react";

import { BookingCard } from "../dashboard/booking-card";

export const MyBookingsPage: React.FC = () => {
  const bookingData = [
    {
      title: "Large Event",
      date: "August 16, 2023",
      location: "London, UK",
      price: "£1,250",
      description: "Birthday party event",
      attendees: "40 people attending",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a432e0085dfc7da10d5e7fc4771e6a4a467731f1?placeholderIfAbsent=true",
    },
    {
      title: "Custom booking",
      date: "August 16, 2023",
      location: "London, UK",
      price: "£1,250",
      description: "Birthday party event",
      attendees: "40 people attending",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b8d1fae7a7ccc7a59b5d4a9ed0cc5526edcecb05?placeholderIfAbsent=true",
    },
    {
      title: "Meal Prep",
      date: "August 16, 2023",
      location: "London, UK",
      price: "£1,250",
      description: "Birthday party event",
      attendees: "40 people attending",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a432e0085dfc7da10d5e7fc4771e6a4a467731f1?placeholderIfAbsent=true",
    },
    {
      title: "Chef at Home",
      date: "August 16, 2023",
      location: "London, UK",
      price: "£1,250",
      description: "Birthday party event",
      attendees: "40 people attending",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b8d1fae7a7ccc7a59b5d4a9ed0cc5526edcecb05?placeholderIfAbsent=true",
    },
  ];

  const menuData = [
    {
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      category: "Italian",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/39f72e1583ff7edbdd7426c67562575d27d45653?placeholderIfAbsent=true",
      heartIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b6ccf83f71f5f693e5cbcf516ff7627fecd1bb75?placeholderIfAbsent=true",
    },
    {
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      category: "Italian",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/8d4a08812633ed5981a719d01a6eee00bc2498f7?placeholderIfAbsent=true",
      heartIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b6faaf6f2a4462f2ab8cd2c5b4f4acfad0e6c106?placeholderIfAbsent=true",
    },
    {
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      category: "Italian",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/eb7e70a6c4aa28cd9b97896fe51eacb521399440?placeholderIfAbsent=true",
      heartIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/70f36abab728018c9c539c178027535244f19736?placeholderIfAbsent=true",
    },
  ];

  return (
    <div className="flex overflow-hidden flex-col bg-zinc-50">
      <main className="flex flex-col self-center mt-9 w-full max-w-[1114px] max-md:max-w-full">
        <h1 className="self-start ml-28 text-2xl font-semibold leading-none text-black max-md:ml-2.5">
          My Bookings
        </h1>

        <section className="flex flex-wrap gap-5 justify-between self-center mt-8 max-w-full w-[885px]">
          <div className="flex flex-col justify-center px-3 py-5 text-xs bg-amber-100 rounded-lg text-neutral-700">
            <div className="flex gap-3 items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/75d3ec646f092868067adae007d588e6b96a5773?placeholderIfAbsent=true"
                alt="Payment refundable icon"
                className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
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
                  iyabobello
                </div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d0176cfe2e7a9a576fe9ccbeeb80e706f305dc2f?placeholderIfAbsent=true"
                  alt="Copy icon"
                  className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
              </div>
            </div>
            <button className="overflow-hidden gap-2 self-stretch px-4 py-2.5 my-auto text-sm font-semibold leading-none text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)]">
              Check referral
            </button>
          </div>
        </section>

        <nav className="flex gap-4 items-start self-start mt-9 ml-28 text-xs font-medium text-zinc-950 max-md:max-w-full">
          <div className="flex flex-wrap gap-2.5 items-start min-w-60 max-md:max-w-full">
            <button className="overflow-hidden gap-2 self-stretch px-3.5 py-2 border-solid border-[0.767px] border-[color:var(--Black-200,#CFCFCE)] rounded-[30.689px] text-zinc-950">
              Upcoming bookings (1)
            </button>
            <button className="overflow-hidden gap-2 self-stretch py-2 pr-3.5 pl-3.5 text-white bg-amber-400 border-solid border-[1.534px] border-[color:var(--Primary-200,#F9DF98)] rounded-[30.689px]">
              Enquiries (5)
            </button>
            <button className="overflow-hidden gap-2 self-stretch py-2 pr-3.5 pl-3.5 whitespace-nowrap border-solid border-[0.767px] border-[color:var(--Black-200,#CFCFCE)] rounded-[30.689px] text-zinc-950">
              Pending(5)
            </button>
            <button className="overflow-hidden gap-2 self-stretch px-3.5 py-2 border-solid border-[0.767px] border-[color:var(--Black-200,#CFCFCE)] rounded-[30.689px] text-zinc-950">
              Completed (4)
            </button>
            <button className="overflow-hidden gap-2 self-stretch px-3.5 py-2 whitespace-nowrap border-solid border-[1.534px] border-[color:var(--Black-200,#CFCFCE)] rounded-[30.689px] text-zinc-950">
              Cancelled
            </button>
          </div>
        </nav>

        <section className="self-center mt-9 max-w-full w-[887px]">
          <div className="flex gap-5 max-md:flex-col max-md:">
            <div className="w-6/12 max-md:ml-0 max-md:w-full">
              <BookingCard {...bookingData[0]} />
            </div>
            <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <BookingCard {...bookingData[1]} />
            </div>
          </div>
        </section>

        <section className="self-center mt-8 max-w-full w-[886px]">
          <div className="flex gap-5 max-md:flex-col max-md:">
            <div className="w-6/12 max-md:ml-0 max-md:w-full">
              <BookingCard {...bookingData[2]} />
            </div>
            <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <BookingCard {...bookingData[3]} />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default MyBookingsPage;
