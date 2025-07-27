"use client";

import React from "react";

import { ProgressIndicator } from "../ui/progress-indicator";

interface PaymentSuccessProps {
  chefName: string;
  onSendMessage: () => void;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  chefName,
  onSendMessage,
}) => {
  const progressSteps = [
    { id: "details", label: "Event Details", completed: true },
    { id: "preferences", label: "Preferences", completed: true },
    { id: "payment", label: "Payment", completed: true },
  ];

  return (
    <main className="self-center flex w-[655px] max-w-full flex-col items-stretch mt-[60px] max-md:mt-10">
      <h1 className="text-black text-xl font-medium">{chefName}</h1>

      <section
        className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-stretch bg-white mt-2 pt-[31px] pb-[134px] px-[19px] rounded-[15px] border-solid max-md:max-w-full max-md:pr-5 max-md:pb-[100px]"
        aria-label="Payment confirmation"
      >
        <nav aria-label="Booking progress">
          <ProgressIndicator steps={progressSteps} />
        </nav>

        <div className="self-center flex mb-[-27px] flex-col items-center ml-[18px] mt-[66px] max-md:max-w-full max-md:mt-10 max-md:mb-2.5">
          <div
            className="items-center flex w-[71px] gap-[17px] h-[71px] bg-[#FFFCF5] p-3 rounded-[1166.667px]"
            role="img"
            aria-label="Payment success icon"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/92f95a4f1cb60233ea07f10cd6d648e5498d3325?placeholderIfAbsent=true"
              className="aspect-[0.98] object-contain w-[46px] fill-[#FDEEC5]"
              alt="Success checkmark"
            />
          </div>

          <div className="flex flex-col items-center mt-8 max-md:max-w-full">
            <div className="flex flex-col items-center max-md:max-w-full">
              <h2 className="text-black text-2xl font-medium leading-none">
                Payment Successful
              </h2>
              <p className="text-[#6F6E6D] text-center text-xs font-normal leading-[18px] mt-2 max-md:max-w-full">
                Congratulations, your booking is underway, continue your
                conversation with the chef,
                <br />
                share more details.
              </p>
            </div>

            <button
              onClick={onSendMessage}
              className="text-white border border-[color:var(--Yellow-Pry,#FCC01C)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-[#FCC01C] px-7 py-3 rounded-lg border-solid max-md:px-5 text-base font-semibold mt-8 hover:bg-[#e6ac19] transition-colors"
              aria-label="Send message to chef"
            >
              Send Message
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
