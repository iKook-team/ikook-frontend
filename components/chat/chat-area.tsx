"use client";

import * as React from "react";

import { MessageBubble } from "./message-bubble";
import { QuoteCard } from "./quote-card";

export function ChatArea() {
  return (
    <section className="flex flex-col h-full w-full overflow-hidden">
      <div className="w-full max-md:mt-5 flex-1 flex flex-col min-h-0">
        <div className="flex flex-wrap items-center px-2 py-2.5 rounded-md border border-solid border-[color:var(--Gray-150,#B7B7B6)] max-md:max-w-full">
          <div className="flex flex-col self-stretch my-auto text-black">
            <div className="flex gap-1 items-start self-start px-2.5 py-1.5 text-xs whitespace-nowrap bg-neutral-200 rounded-[30px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/854fbc987f04d5db1e66f0babdee9a8a8d18031e?placeholderIfAbsent=true"
                className="object-contain shrink-0 w-4 aspect-square"
                alt="Enquiry icon"
              />
              <span>Enquiry</span>
            </div>
            <div className="flex gap-6 items-start mt-4 text-xs">
              <div className="flex gap-2 items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                  alt="Date icon"
                />
                <span className="self-stretch my-auto">August 16, 2023</span>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/09ddc772831e94523cc11b4412b9637a74f404bf?placeholderIfAbsent=true"
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                  alt="Location icon"
                />
                <span className="self-stretch my-auto">London, UK</span>
              </div>
            </div>
          </div>
          <button className="overflow-hidden gap-2 self-stretch px-4 py-2.5 my-auto text-sm font-semibold leading-none text-amber-400 whitespace-nowrap rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[110px]">
            Details
          </button>
        </div>

        <div className="gap-2.5 self-stretch p-2.5 text-xs leading-5 bg-amber-100 rounded-md text-neutral-700 w-[827px] max-md:max-w-full">
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry&apos;s standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto mt-5 w-full max-md:mt-10 max-md:max-w-full pb-4">
        <MessageBubble
          content="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard. simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          timestamp="16 Oct, 2023 , 04:30 PM"
          avatar="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/59255ae01af5162645b3e559c314d4359f67fbcd?placeholderIfAbsent=true"
        />

        <MessageBubble
          content="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard. simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          timestamp="16 Oct, 2023 , 04:30 PM"
          isOwn={true}
        />

        <MessageBubble
          content=""
          timestamp="16 Oct, 2023 , 04:30 PM"
          avatar="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/59255ae01af5162645b3e559c314d4359f67fbcd?placeholderIfAbsent=true"
          image="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c0b091964f90cce28ae193de53afa7a681237363?placeholderIfAbsent=true"
        />

        <QuoteCard amount="£1,435" description="Total cost" />

        <MessageBubble
          content="simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard. simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          timestamp="16 Oct, 2023 , 04:30 PM"
          isOwn={true}
        />

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-auto">
          <div className="flex items-center gap-3 px-3 py-2 w-full rounded-lg border border-gray-300">
            <input
              type="text"
              placeholder="Type message..."
              className="flex-1 text-base text-gray-900 bg-transparent outline-none border-none focus:ring-0 p-0"
            />
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/8c6074a6356323c12040e09b9581f3c65d0ba51e?placeholderIfAbsent=true"
                  className="w-5 h-5"
                  alt="Attachment"
                  width={20}
                  height={20}
                />
              </button>
              <button 
                type="button" 
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/98ea22f6d801dd72e6679354e0f0a82ac0811666?placeholderIfAbsent=true"
                  className="w-5 h-5"
                  alt="Emoji"
                  width={20}
                  height={20}
                />
              </button>
              <button 
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-amber-400 rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
