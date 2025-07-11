"use client";

import React from "react";

import { DiscountItem } from "./discount-item";

export const DiscountList: React.FC = () => {
  const discounts = [
    {
      title: "All menu",
      date: "17/10/2022",
      percentage: "%15",
      status: "Active" as const,
    },
    {
      title: "All menu",
      date: "17/10/2022",
      percentage: "%15",
      status: "Active" as const,
    },
    {
      title: "All menu",
      date: "17/10/2022",
      percentage: "%15",
      status: "Active" as const,
    },
    {
      title: "All menu",
      date: "17/10/2022",
      percentage: "%15",
      status: "Active" as const,
    },
    {
      title: "All menu",
      date: "17/10/2022",
      percentage: "%15",
      status: "Active" as const,
    },
    {
      title: "All menu",
      date: "17/10/2022",
      percentage: "%15",
      status: "Active" as const,
    },
    {
      title: "All menu",
      date: "17/10/2022",
      percentage: "%15",
      status: "Active" as const,
    },
    {
      title: "All menu",
      date: "17/10/2022",
      percentage: "%15",
      status: "Active" as const,
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-5 py-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-black">Discount</h1>

        <nav className="w-full">
          <div className="flex flex-wrap gap-2.5">
            <button className="flex justify-center items-center px-3.5 py-2 bg-amber-400 border-amber-200 border-solid border-[1.534px] rounded-full hover:bg-amber-300 transition-colors">
              <span className="text-xs font-medium text-black whitespace-nowrap">
                Active (3)
              </span>
            </button>
            <button className="flex justify-center items-center px-3.5 py-2 border-solid border-[0.767px] border-stone-300 rounded-full hover:bg-gray-50 transition-colors">
              <span className="text-xs font-medium text-black whitespace-nowrap">
                Expired (1)
              </span>
            </button>
          </div>
        </nav>

        <div className="flex flex-col gap-2 w-full">
          {discounts.map((discount, index) => (
            <DiscountItem
              key={index}
              title={discount.title}
              date={discount.date}
              percentage={discount.percentage}
              status={discount.status}
            />
          ))}
        </div>

        <button className="flex justify-center items-center w-full sm:w-[304px] py-3 bg-amber-400 rounded-lg border border-amber-400 shadow-sm hover:bg-amber-500 transition-colors mt-6">
          <span className="text-base font-bold text-white">
            Create new discount
          </span>
        </button>
      </div>
    </section>
  );
};
