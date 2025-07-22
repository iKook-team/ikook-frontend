import * as React from "react";

interface SearchInputProps {
  placeholder: string;
  className?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function SearchInput({ 
  placeholder, 
  className = "", 
  value, 
  disabled = false, 
  onChange 
}: SearchInputProps) {
  return (
    <div className={`flex overflow-hidden gap-2 items-center px-3.5 py-2.5 w-full bg-white rounded-lg border border-solid shadow-sm ${
      disabled 
        ? 'border-gray-200 bg-gray-50' 
        : 'border-gray-300 hover:border-gray-400 focus-within:ring-2 focus-within:ring-amber-400 focus-within:border-transparent'
    } transition-colors ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`flex-1 shrink gap-2 self-stretch my-auto basis-0 min-w-60 bg-transparent outline-none ${
          disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500'
        }`}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/cd6b99ec44579e9c04f97925f097e7dd22abd3af?placeholderIfAbsent=true"
        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
        alt="Search"
      />
    </div>
  );
}
