"use client";

import React from "react";

interface StatusBadgeProps {
  status: string;
  iconSrc: string;
}

export default function StatusBadge({ status, iconSrc }: StatusBadgeProps) {
  return (
    <div className="flex gap-1 items-start self-start px-2.5 py-1.5 mt-9 text-sm leading-none text-black bg-neutral-200 rounded-[30px]">
      <img
        src={iconSrc}
        className="object-contain shrink-0 w-4 aspect-square"
        alt="Status icon"
      />
      <span>{status}</span>
    </div>
  );
}
