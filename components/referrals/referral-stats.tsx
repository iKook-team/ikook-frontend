import React from "react";

const ReferralStats = () => {
  return (
    <section className="w-full max-w-[885px] mt-8 max-md:w-[calc(100%_-_40px)] max-md:max-w-[800px] max-sm:w-[calc(100%_-_32px)]">
      <div className="inline-flex justify-end items-center gap-[304.5px] w-full h-[117px] relative bg-[#FFFCF5] pl-[50.5px] pr-7 py-[22px] rounded-md max-md:w-full max-md:gap-[50px] max-md:flex-col max-md:h-auto max-md:p-5 max-sm:gap-5 max-sm:p-4">
        <div className="flex flex-col items-start gap-1 absolute w-[111px] h-14 left-[51px] top-[31px] max-md:relative max-md:left-0 max-md:top-0">
          <div className="text-[#323335] text-sm font-normal leading-5">
            Rewarded point
          </div>
          <div className="text-[#323335] text-2xl font-bold leading-8">
            2400
          </div>
        </div>

        <div className="flex flex-col items-center gap-[5px] border absolute w-[391px] h-[73px] p-2 rounded-md border-solid border-[#CFCFCE] left-[466px] top-[22px] max-md:relative max-md:w-full max-md:max-w-[350px] max-md:left-0 max-md:top-0 max-sm:w-full">
          <div className="flex items-start gap-[238px] max-md:gap-[100px] max-sm:gap-[50px] max-sm:text-[10px]">
            <div className="text-black text-xs font-normal">Total referred</div>
            <div className="text-black text-xs font-normal">10 friends</div>
          </div>

          <div className="w-[375px] h-2.5 relative">
            <div className="w-[375px] h-2.5 absolute bg-[#D9D9D9] rounded-md max-md:w-full max-md:max-w-[300px]" />
            <div className="w-[247px] h-2.5 absolute bg-[#FCC01C] rounded-md max-md:w-[65%] max-md:max-w-[300px]" />
          </div>

          <div className="text-black text-xs font-normal">
            20 completed referrals
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-3 h-9 bg-[#FFFCF5] mt-6 p-2 rounded-md max-md:w-full max-sm:gap-2 max-sm:p-3">
        <div className="w-5 h-5 relative">
          <svg
            className="absolute left-0 top-0"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="#FDEEC5" />
          </svg>
          <svg
            className="absolute left-1 top-1"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4V7M6 8.5V8.505M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6Z"
              stroke="#A07A13"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-[#3F3E3D] text-sm font-normal leading-5 max-sm:text-xs">
          1 point is equal £1 with minimum withdraw at £100
        </div>
      </div>
    </section>
  );
};

export default ReferralStats;
