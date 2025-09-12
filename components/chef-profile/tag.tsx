"use client";
import clsx from 'clsx';
import React from 'react';

interface TagProps {
  children: React.ReactNode;
  icon?: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, icon, className }) => {
  return (
    <div className={clsx(
      "items-center content-center flex-wrap flex gap-[5px] bg-[#FFFCF5] px-3 py-2 rounded-[20px] border border-solid border-[#FDEEC5]",
      className
    )}>
      {icon && (
        <img
          src={icon}
          className="aspect-[1] object-contain w-2.5 self-stretch shrink-0 my-auto"
          alt=""
        />
      )}
      <div className="text-[#060605] text-sm font-medium self-stretch my-auto">
        {children}
      </div>
    </div>
  );
};