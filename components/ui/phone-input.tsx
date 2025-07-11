import React, { forwardRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  className?: string;
  onCountryChange?: (country: string) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const countries = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
];

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      placeholder,
      required = false,
      error,
      className = "",
      onCountryChange,
      ...props
    },
    ref
  ) => {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCountrySelect = (country: (typeof countries)[0]) => {
      setSelectedCountry(country);
      setIsDropdownOpen(false);
      onCountryChange?.(country.code);
    };

    return (
      <div className={`flex flex-col items-start gap-1.5 ${className}`}>
        <label className="text-[#344054] text-sm font-medium leading-5 max-sm:text-[13px]">
          {label}
          {required && "*"}
        </label>
        <div className="flex items-start gap-0 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white rounded-lg border-solid border-[#CFCFCE] focus-within:ring-2 focus-within:ring-[#FCC01C] focus-within:border-[#FCC01C]">
          <div className="relative">
            <button
              className="flex justify-between items-center pl-3.5 pr-3 py-2.5 border-r border-[#CFCFCE] hover:bg-gray-50 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
            >
              <span className="text-[#101828] text-base font-normal leading-6 max-sm:text-[15px]">
                {selectedCountry.code}
              </span>
              <ChevronDown className="w-4 h-4 ml-2 text-[#667085]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 z-10 w-48 bg-white border border-[#CFCFCE] rounded-lg shadow-lg mt-1">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span className="mr-2">{country.flag}</span>
                    <span className="text-sm">
                      {country.name} ({country.code})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            ref={ref}
            className="flex-1 text-[#6F6E6D] text-base font-normal leading-6 pl-4 pr-3.5 py-2.5 bg-transparent border-none focus:outline-none placeholder:text-[#6F6E6D] max-sm:text-[15px]"
            disabled={props.disabled}
            onChange={props.onChange}
            placeholder={placeholder}
            required={required}
            type="tel"
            value={props.value}
          />
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
