"use client";
import React from "react";

import { BookingCard, BookingCardProps } from "./booking-card";
import { DocumentNotification } from "./document-notification"

export const MyBookingsPage: React.FC = () => {
  const bookingData: BookingCardProps[] = [
    {
      user: "chef",
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
      user: "chef",
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
      user: "chef",
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
      user: "chef",
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

        <section className="flex self-center mt-8 max-w-full w-[885px]">
          <DocumentNotification />
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
