"use client";

import React from "react";

interface TextWithHighlightProps {
  highlight: string;
  className?: string;
  children?: React.ReactNode;
}

export default function TextWithHighlight({ highlight, className, children }: TextWithHighlightProps) {
  return (
    <h1 className={`relative font-poppins text-charcoal-100 m-0 ${className ? className : ""}`}>
      <span className="relative inline-block mr-2">
        <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FCC01C] z-[2]" />
        <span className="z-[3] relative">{highlight}</span>
      </span>
      {children}
    </h1>
  );
}
