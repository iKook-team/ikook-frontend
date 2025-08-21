'use client';
import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search here" 
}) => {
  return (
    <div className="bg-[rgba(253,253,253,1)] border flex items-stretch gap-5 text-xs text-[rgba(150,155,160,1)] font-normal flex-wrap justify-between mt-4 px-[15px] py-3.5 rounded-[7px] border-[rgba(235,235,235,1)] border-solid max-md:max-w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none flex-1 text-[rgba(150,155,160,1)] placeholder:text-[rgba(150,155,160,1)]"
        aria-label="Search FAQs"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/cb368a878f89f03158d523292b29737e735543c7?placeholderIfAbsent=true"
        className="aspect-[1.05] object-contain w-[21px] shrink-0"
        alt="Search icon"
      />
    </div>
  );
};
