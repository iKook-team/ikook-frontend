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
      <button 
        type="button"
        className="flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-ikook-primary"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Selected country: ${selectedCountry.name}. Click to change country.`}
      >
        <span className="text-lg" aria-hidden="true">{selectedCountry.flag}</span>
        <span className="text-ikook-secondary text-sm font-medium">{selectedCountry.name}</span>
        <ChevronDown className={`w-3 h-3 text-ikook-secondary transition-transform ${isOpen ? 'transform rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div 
          role="listbox" 
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 focus:outline-none"
          tabIndex={-1}
        >
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              type="button"
              role="option"
              aria-selected={selectedCountry.code === country.code}
              className={`w-full text-left flex items-center px-4 py-2 text-sm ${
                selectedCountry.code === country.code
                  ? 'bg-ikook-primary/10 text-ikook-primary'
                  : 'text-ikook-secondary hover:bg-gray-100'
              }`}
              onClick={() => selectCountry(country)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectCountry(country);
                }
              }}
            >
              <span className="text-lg mr-2" aria-hidden="true">{country.flag}</span>
              <span>{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
