import React from "react";

import { CostSummary } from "./cost-summary";
import { EventDetails } from "./event-details";
import { ImageUpload } from "./image-upload";

export const CreateSidebar: React.FC = () => {
  return (
    <div className="px-8 pt-10 pb-28 w-full bg-white rounded-2xl border border-solid shadow-2xl border-neutral-200 text-zinc-800 max-md:px-5 max-md:pb-24 max-md:mt-7">
      <div className="flex flex-col w-full">
        <ImageUpload />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/124a827913153a79c462060986391420bc089851?placeholderIfAbsent=true"
          className="object-contain mt-7 max-w-full aspect-[2.2] w-[310px]"
          alt="Quote preview"
        />
        <EventDetails />
        <CostSummary />
        <button className="flex overflow-hidden gap-2 justify-center items-center px-10 py-3 mt-7 max-w-full text-base font-semibold text-white bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm w-[310px] max-md:px-5">
          <span className="self-stretch my-auto text-white">Preview Quote</span>
        </button>
      </div>
    </div>
  );
};
