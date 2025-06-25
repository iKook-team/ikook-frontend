import React from "react";

interface SuccessCardProps {
  isVisible: boolean;
  onDashboardClick: () => void;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({
  isVisible,
  onDashboardClick,
}) => {
  if (!isVisible) return null;

  return (
    <section
      className="bg-white shadow-[0px_4px_30px_rgba(0,0,0,0.03)] border flex w-[654px] max-w-full flex-col items-stretch fill-white stroke-[#E7E7E7] mt-[61px] pt-[105px] pb-48 px-[34px] rounded-[15px] border-[rgba(231,231,231,1)] border-solid max-md:mt-10 max-md:px-5 max-md:py-[100px]"
      role="dialog"
      aria-labelledby="success-title"
      aria-describedby="success-description"
    >
      <div className="flex w-full flex-col items-center max-md:max-w-full">
        <div className="flex gap-6 w-[120px] h-[120px] bg-[#FFFCF5] pl-[19px] pr-5 py-5 rounded-[2020.785px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/40061a261ebb65e18223bfaf8d73d9c48da9013a?placeholderIfAbsent=true"
            alt="Success confirmation icon"
            className="aspect-[1.01] object-contain w-[81px] fill-[#FDEEC5]"
          />
        </div>

        <div className="flex w-full flex-col items-center text-[#323335] mt-1.5">
          <h2
            id="success-title"
            className="text-[#323335] text-2xl font-bold leading-none"
          >
            Request Submitted
          </h2>

          <p
            id="success-description"
            className="text-[#323335] w-full text-sm font-normal text-center leading-5 mt-2 p-2.5 max-md:max-w-full"
          >
            We just emailed you a summary of your order and also look out for
            proposals from our chefs. We also emailed you a link to confirmed
            your email address.
          </p>
        </div>
      </div>

      <button
        onClick={onDashboardClick}
        className="self-center flex mb-[-38px] text-base text-white font-semibold whitespace-nowrap mt-[63px] rounded-lg max-md:mt-10 max-md:mb-2.5 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2"
        aria-label="Go to dashboard"
      >
        <span className="text-white border border-[color:var(--Yellow-Pry,#FCC01C)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-[#FCC01C] px-[18px] py-2.5 rounded-lg border-solid">
          Dashboard
        </span>
      </button>
    </section>
  );
};
