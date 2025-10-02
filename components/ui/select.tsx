"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface SelectOption {
  key: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Select = ({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  placeholder = "Select an option",
  className,
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const selectRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const selectedOption = options.find((option) => option.key === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionKey: string) => {
    if (controlledValue === undefined) {
      setInternalValue(optionKey);
    }
    onChange?.(optionKey);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          "w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm",
          "border-2 border-gray-300 rounded-full",
          "bg-white text-gray-900",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400",
          !disabled && "hover:border-gray-400",
          disabled && "opacity-50 cursor-not-allowed",
          isOpen && "border-yellow-400 ring-2 ring-yellow-400"
        )}
      >
        <span className={clsx(!selectedOption && "text-gray-500")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={clsx(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => handleSelect(option.key)}
                className={clsx(
                  "w-full px-4 py-2.5 text-sm text-left",
                  "transition-colors duration-150",
                  "hover:bg-gray-100",
                  option.key === value
                    ? "bg-yellow-50 text-yellow-900 font-medium"
                    : "text-gray-900"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
