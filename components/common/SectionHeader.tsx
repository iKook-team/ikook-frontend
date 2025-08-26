"use client";

import React from "react";

interface SectionHeaderProps {
  title: string;
  className?: string; // extra classes for the h2
  containerClassName?: string; // wrapper around the header block
  lineClassName?: string; // classes for the decorative lines
  spacingClassName?: string; // vertical spacing between line and title
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  className = "",
  containerClassName = "",
  lineClassName = "",
  spacingClassName = "",
}) => {
  return (
    <div className={`text-center mb-12 ${containerClassName}`}>
      <div className="flex flex-col items-center">
        <div className={`w-full max-w-2xl h-0.5 bg-gray-200 mb-6 ${lineClassName}`} />
        <h2 className={`text-3xl lg:text-4xl font-medium text-[#323335] px-8 ${className}`}>
          {title}
        </h2>
        <div className={`w-full max-w-2xl h-0.5 bg-gray-200 mt-6 ${lineClassName}`} />
      </div>
    </div>
  );
};

export default SectionHeader;
