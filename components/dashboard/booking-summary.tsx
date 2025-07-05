"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function BookingSummary() {
  const user = "chef";
  const isUpcoming = "upcoming";
  const isEnquiry = "enquiry";
  const isCustom = true;

  const router = useRouter()

  return (
    <aside className="flex flex-col grow justify-center px-8 py-9 mt-9 w-full bg-white rounded-2xl border border-solid shadow-2xl border-[color:var(--Black-100,#E7E7E7)] max-md:px-5 max-md:mt-10">
      <div className="flex flex-col w-full">
        <button className="overflow-hidden gap-2 self-stretch px-10 py-3 max-w-full text-base font-semibold text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[310px] max-md:px-5" onClick={() => router.push("/chat")}>
          {user === "chef" ? "Message Host" : "Message Chef"}
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
            <span className="self-stretch my-auto">August 16, 2023</span>
          </div>
          <div className="flex gap-2 items-center self-stretch mt-4">
            <Image
              alt="Location icon"
              className="object-contain shrink-0 self-stretch my-auto"
              height={16}
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d96ffdeb434bdcd9975f48a4eaec165b56e9ce8e?placeholderIfAbsent=true"
              width={16}
            />
            <span className="self-stretch my-auto">
              67 Queens Road, London, EC03 4AR
            </span>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <Image
              alt="Guests icon"
              className="object-contain shrink-0 self-stretch my-auto"
              height={16}
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/45283b32ce1ac86f65d64d8f95bf40d9b6067af1?placeholderIfAbsent=true"
              width={16}
            />
            <span className="self-stretch my-auto">
              10 Adults, 3 Teens, 6 Kids
            </span>
          </div>
        </div>

        <div className="mt-8 max-w-full text-zinc-800 w-[303px]">
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
            <hr className="w-full border-t border-neutral-200" />
            <div className="flex gap-9 items-start mt-2">
              <span className="text-zinc-800 w-[209px]">TOTAL</span>
              <span className="text-right text-zinc-800">£1,435</span>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full text-base font-semibold max-w-[310px]">
          <button className="overflow-hidden gap-2 self-stretch px-5 py-2.5 w-full bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Gray-100,#CFCFCE)] text-slate-700">
            {isUpcoming ? "Mark as completed" : "Check review"}
          </button>
          {isCustom && isEnquiry && <button className="overflow-hidden gap-2 self-stretch px-5 py-2.5 mt-3 w-full text-white bg-black rounded-lg border border-solid shadow-sm border-[color:var(--Black,#020101)]">
            Send Quote
          </button>}
        </div>

        {!isCustom && (
          <section className="mt-8 max-w-full text-sm text-neutral-700 w-[310px]">
            <div className="flex flex-col items-start px-6 py-5 w-full rounded-lg bg-stone-50 max-md:pl-5">
              <h3 className="text-base font-medium text-black">
                The payment includes
              </h3>
              <div className="flex gap-3 items-center mt-5 leading-none">
                <Image
                  alt="Ingredients icon"
                  className="object-contain shrink-0 self-stretch my-auto"
                  height={26}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6ef0f58be6dff6094bb781f7c8c26aaa019622f8?placeholderIfAbsent=true"
                  width={26}
                />
                <span className="self-stretch my-auto text-neutral-700">
                  All ingredients
                </span>
              </div>
              <div className="flex gap-3 items-center self-stretch mt-3 leading-none">
                <Image
                  alt="Travel icon"
                  className="object-contain shrink-0 self-stretch my-auto"
                  height={26}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4047ee36acea709dad055432a58ff62ea74dab80?placeholderIfAbsent=true"
                  width={26}
                />
                <span className="self-stretch my-auto text-neutral-700">
                  Chef&apos;s travel and insurance costs
                </span>
              </div>
              <div className="flex gap-3 items-center mt-3 leading-none">
                <Image
                  alt="Service icon"
                  className="object-contain shrink-0 self-stretch my-auto"
                  height={26}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3e59bc59ce60bc2ede2912b62b7691210be888d8?placeholderIfAbsent=true"
                  width={26}
                />
                <span className="self-stretch my-auto text-neutral-700">
                  Serving and Cleanup
                </span>
              </div>
              <div className="flex gap-3 items-center mt-3 leading-none">
                <Image
                  alt="Protection icon"
                  className="object-contain shrink-0 self-stretch my-auto"
                  height={26}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/891cdaacc6ca24dd86996f3d70fedf35140c4c41?placeholderIfAbsent=true"
                  width={26}
                />
                <span className="self-stretch my-auto text-neutral-700">
                  Money Protection
                </span>
              </div>
              <p className="self-end text-xs leading-5 text-neutral-700 max-md:mr-2.5">
                We pay the chefs after the event, to protect your money
              </p>
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
