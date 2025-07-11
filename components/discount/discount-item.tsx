import React from "react";

interface DiscountItemProps {
  title: string;
  date: string;
  percentage: string;
  status: "Active" | "Expired";
}

export const DiscountItem: React.FC<DiscountItemProps> = ({
  title,
  date,
  percentage,
  status,
}) => {
  return (
    <article className="flex justify-center items-center pt-3 pr-5 pb-3 pl-5 rounded-md border border-solid border-stone-300 h-[69px] w-[885px] max-md:w-full">
      <div className="flex items-center gap-[746px] h-[46px] w-[847px] max-md:gap-52 max-sm:flex-col max-sm:gap-2 max-sm:items-start max-sm:h-auto">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-sm leading-5 text-zinc-800">{title}</h3>
          <time className="text-xs text-zinc-800">{date}</time>
        </div>
        <div className="flex flex-col items-end max-sm:flex-row max-sm:gap-3 max-sm:items-start">
          <div className="overflow-hidden text-base font-bold text-ellipsis text-zinc-800">
            {percentage}
          </div>
          <div className="flex gap-2.5 justify-center items-center p-1 bg-emerald-100 rounded">
            <span className="text-xs text-green-600">{status}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
