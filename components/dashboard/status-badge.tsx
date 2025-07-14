"use client";

import Image from "next/image";
import React from "react";

interface StatusBadgeProps {
  status: string;
  iconSrc: string;
}

export default function StatusBadge({ status, iconSrc }: StatusBadgeProps) {
  return (
    <div className="flex gap-1 items-start self-start px-2.5 py-1.5 mt-9 text-sm leading-none text-black bg-neutral-200 rounded-[30px]">
      {iconSrc && iconSrc.trim() !== "" && (
        <Image
          alt="Status icon"
          className="object-contain shrink-0 aspect-square"
          height={16}
          src={iconSrc}
          width={16}
        />
      )}
      <span>{status}</span>
    </div>
  );
}
