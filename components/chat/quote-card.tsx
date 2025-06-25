import * as React from "react";

import { Button } from "./button";

interface QuoteCardProps {
  amount: string;
  description: string;
}

export function QuoteCard({ amount, description }: QuoteCardProps) {
  return (
    <div className="flex flex-wrap items-center px-3 py-2.5 mt-6 rounded-md border border-solid border-[color:var(--Gray-150,#B7B7B6)] max-md:max-w-full">
      <div className="flex flex-col self-stretch my-auto">
        <div className="flex gap-1 items-start self-start px-2.5 py-1.5 text-xs font-semibold text-black whitespace-nowrap bg-neutral-200 rounded-[30px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f1a88cddebc37fb98339b344a531e401f43bafc5?placeholderIfAbsent=true"
            className="object-contain shrink-0 w-4 aspect-square"
            alt="Quote icon"
          />
          <span>Quote</span>
        </div>
        <div className="flex gap-2 items-center mt-3">
          <h3 className="self-stretch my-auto text-2xl font-semibold text-zinc-800">
            {amount}
          </h3>
          <p className="self-stretch my-auto text-base text-neutral-500">
            {description}
          </p>
        </div>
      </div>
      <Button variant="outline" className="w-[189px]">
        View quote
      </Button>
    </div>
  );
}
