"use client";

import { CuisineTag } from "./cuisine-tag";

interface EventDetailsFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
}

export const EventDetailsForm: React.FC<EventDetailsFormProps> = ({ onNext, onBack }) => {
  return (
    <section className="flex flex-col items-center px-14 pt-9 pb-20 mt-16 max-w-full bg-white rounded-2xl border border-solid shadow-lg border-[color:var(--Black-100,#E7E7E7)] w-[654px] max-md:px-5 max-md:mt-10">
      <h1 className="ml-4 text-2xl font-bold leading-none text-black">
        Event Details
      </h1>

      <div className="relative self-stretch mt-14 max-md:mt-10 max-md:max-w-full">
        <div className="z-0 w-full text-base text-neutral-700">
          <div className="w-full max-md:max-w-full">
            <div className="w-full max-md:max-w-full">
              <label
                htmlFor="event-type"
                className="font-medium text-neutral-700"
              >
                Event type
              </label>
              <div className="flex overflow-hidden flex-wrap gap-2 items-center px-3.5 py-2.5 mt-1.5 w-full bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Gray-100,#CFCFCE)] max-md:max-w-full">
                <div className="flex-1 shrink gap-2 self-stretch my-auto basis-0 min-w-60 text-neutral-700 max-md:max-w-full">
                  What type of event are you hosting?
                </div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/ab5fb6787e2b162075d838b6043950b664ff0274?placeholderIfAbsent=true"
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                  alt="Dropdown arrow"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex absolute right-0 z-0 flex-col pb-2.5 bottom-[-100px] h-[72px] max-w-[544px] w-[544px] max-md:max-w-full">
          <div className="max-md:max-w-full">
            <div className="w-full max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <label
                  htmlFor="preferred-cuisines"
                  className="text-base font-medium text-neutral-700"
                >
                  Preferred cuisines
                </label>
                <div className="flex overflow-hidden flex-wrap gap-2 items-center px-3.5 py-2.5 mt-1.5 w-full bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Gray-100,#CFCFCE)] max-md:max-w-full">
                  <div className="flex flex-1 shrink gap-2 self-stretch my-auto basis-0 h-[23px] min-w-60 w-[492px]" />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/620e0157fc3f2b2a6a85ebddd0cde1b4dd5631d1?placeholderIfAbsent=true"
                    className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    alt="Dropdown arrow"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex z-10 gap-1 items-start self-start mt-0 text-xs text-black max-md:ml-2.5">
            <CuisineTag>African</CuisineTag>
            <CuisineTag>Modern English</CuisineTag>
            <CuisineTag>Italian</CuisineTag>
          </div>
        </div>
      </div>

      <div className="flex gap-6 items-start mt-96 text-base font-semibold whitespace-nowrap max-md:mt-10">
        <button 
          onClick={onBack}
          className="overflow-hidden gap-2 self-stretch px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => onNext()}
          className="overflow-hidden gap-2 self-stretch px-5 py-3 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-500 transition-colors"
        >
          Continue
        </button>
      </div>
    </section>
  );
};
