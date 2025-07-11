"use client";
import * as React from "react";

export const QuoteSummary = () => {
  return (
    <aside className="px-8 pt-10 pb-20 w-full bg-white rounded-2xl border border-solid shadow-2xl border-neutral-200 max-md:px-5 max-md:mt-7">
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-start self-start text-sm leading-none text-black">
          <div className="flex gap-2 items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              alt="Calendar icon"
            />
            <span className="self-stretch my-auto">August 16, 2023</span>
          </div>
          <div className="flex gap-2 items-center self-stretch mt-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/1420f97bee27b190a8f78da5d687cc5ea7c2de9a?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              alt="Location icon"
            />
            <span className="self-stretch my-auto">
              67 Queens Road, London, EC03 4AR
            </span>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/70435404a95f8790c51695afdaf73c024aa768ca?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              alt="Guests icon"
            />
            <span className="self-stretch my-auto">
              10 Adults, 3 Teens, 6 Kids
            </span>
          </div>
        </div>
        <div className="mt-7 max-w-full text-zinc-800 w-[303px]">
          <div className="text-base font-medium">
            <div className="flex gap-10 items-start">
              <span className="text-zinc-800 w-[209px]">10 Guests * £20</span>
              <span className="text-right text-zinc-800 w-[35px]">£56</span>
            </div>
            <div className="flex gap-10 items-start mt-3">
              <span className="text-zinc-800 w-[209px]">Platform fee 2.5%</span>
              <span className="w-12 text-right text-zinc-800">£20</span>
            </div>
          </div>
          <div className="mt-4 w-full text-lg font-semibold leading-loose whitespace-nowrap max-w-[303px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a401bdc98c55df73597b51ec2e9e16b011631081?placeholderIfAbsent=true"
              className="object-contain w-full aspect-[333.33] stroke-[1px] stroke-neutral-200"
              alt="Divider line"
            />
            <div className="flex gap-9 items-start mt-2">
              <span className="text-zinc-800 w-[209px]">TOTAL</span>
              <span className="text-right text-zinc-800">£1,435</span>
            </div>
          </div>
        </div>
        <button className="mt-7 w-full text-base font-semibold max-w-[310px] text-slate-700">
          <div className="flex overflow-hidden gap-2 justify-center items-center px-5 py-2.5 w-full bg-white rounded-lg border border-solid shadow-sm border-stone-300">
            <span className="self-stretch my-auto text-slate-700">
              Edit quote
            </span>
          </div>
        </button>
        <button className="flex overflow-hidden gap-2 justify-center items-center px-10 py-3 mt-7 max-w-full text-base font-semibold text-white bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm w-[310px] max-md:px-5">
          <span className="self-stretch my-auto text-white">Send quote</span>
        </button>
      </div>
    </aside>
  );
};
