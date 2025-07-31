"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type Country = {
  code: string;
  name: string;
  flag: string;
};

const COUNTRIES: Country[] = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
];

export const LocationSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Default to Nigeria
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    // Here you can add any additional logic when a country is selected
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
        onClick={toggleDropdown}
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-ikook-secondary text-sm font-medium">{selectedCountry.name}</span>
        <ChevronDown className={`w-3 h-3 text-ikook-secondary transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {COUNTRIES.map((country) => (
            <div
              key={country.code}
              className={`flex items-center px-4 py-2 text-sm ${
                selectedCountry.code === country.code
                  ? 'bg-ikook-primary/10 text-ikook-primary'
                  : 'text-ikook-secondary hover:bg-gray-100'
              }`}
              onClick={() => selectCountry(country)}
            >
              <span className="text-lg mr-2">{country.flag}</span>
              <span>{country.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
