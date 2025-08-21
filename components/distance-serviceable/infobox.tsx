"use client";

import React from 'react';

interface InfoBoxProps {
  children: React.ReactNode;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ children }) => {
  return (
    <div 
      className="flex w-full max-w-[624px] gap-3 text-xs text-[#3F3E3D] font-normal flex-wrap bg-[#FFFCF5] mt-6 p-2 rounded-md max-md:max-w-full"
      role="note"
      aria-label="Information about extra kilometers"
    >
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/75d3ec646f092868067adae007d588e6b96a5773?placeholderIfAbsent=true"
        alt="Information icon"
        className="aspect-[1] object-contain w-5 shrink-0"
      />
      <div className="grow shrink w-[568px] max-md:max-w-full">
        {children}
      </div>
    </div>
  );
};
