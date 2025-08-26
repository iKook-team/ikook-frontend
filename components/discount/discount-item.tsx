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
    <article className="w-full flex items-center px-5 py-3 rounded-md border border-solid border-stone-300">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="min-w-0 flex flex-col gap-1 items-start">
          <h3 className="text-sm leading-5 text-zinc-800 truncate max-w-full">{title}</h3>
          <time className="text-xs text-zinc-800 whitespace-nowrap">{date}</time>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-base font-bold text-zinc-800 whitespace-nowrap">{percentage}</div>
          <div className="flex gap-2.5 justify-center items-center px-2 py-1 bg-emerald-100 rounded">
            <span className="text-xs text-green-600 whitespace-nowrap">{status}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
