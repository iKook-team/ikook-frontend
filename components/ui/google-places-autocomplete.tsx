"use client";

import React, { useEffect, useRef, useState } from "react";

import { useMarket } from "@/lib/market-context";

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (city: string, placeId?: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

// Map market codes to Google Places API country codes
const MARKET_TO_COUNTRY_CODES: Record<string, string[]> = {
  NG: ["ng"], // Nigeria
  ZA: ["za"], // South Africa
  GB: ["gb"], // United Kingdom
};

export const GooglePlacesAutocomplete: React.FC<
  GooglePlacesAutocompleteProps
> = ({
  value,
  onChange,
  placeholder = "Enter city",
  label,
  error,
  required = false,
  className = "",
  inputClassName = "",
  disabled = false,
}) => {
  const { market } = useMarket();
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Google Maps script
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("Google Maps API key is not configured");
      return;
    }

    // Check if script is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      setIsLoaded(true);
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]',
    );
    if (existingScript) {
      // Wait for script to load
      existingScript.addEventListener("load", () => {
        setIsLoaded(true);
      });
      return;
    }

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      // Note: We don't remove the script to avoid reloading it if other components need it
    };
  }, []);

  // Initialize autocomplete when script is loaded
  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const countryCodes = MARKET_TO_COUNTRY_CODES[market] || ["gb"];

    // Configure autocomplete options
    const autocompleteOptions: google.maps.places.AutocompleteOptions = {
      types: ["(cities)"], // Restrict to cities only
      componentRestrictions: {
        country: countryCodes,
      },
      fields: ["place_id", "formatted_address", "address_components", "name"],
    };

    // Create autocomplete instance
    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      autocompleteOptions,
    );

    // Handle place selection
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();

      if (!place) return;

      // Extract city name from address components
      let cityName = "";

      // Try to get locality or administrative_area_level_1
      for (const component of place.address_components || []) {
        const types = component.types;

        if (
          types.includes("locality") ||
          types.includes("administrative_area_level_1") ||
          types.includes("administrative_area_level_2")
        ) {
          cityName = component.long_name;
          break;
        }
      }

      // Fallback to formatted address or name if no city found
      if (!cityName) {
        cityName = place.formatted_address || place.name || value;
      }

      onChange(cityName, place.place_id);
    });

    return () => {
      // Cleanup autocomplete listener
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isLoaded, market, onChange, value]);

  // Update input value when external value changes
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-[#323335] opacity-70 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={inputRef}
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled || !isLoaded}
        className={`w-full px-3.5 py-2.5 rounded-lg border ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-[#CFCFCE] focus:border-[#FCC01C] focus:ring-[#FCC01C]"
        } focus:outline-none focus:ring-2 focus:ring-offset-0 text-base text-[#0F0E0C] bg-white disabled:bg-gray-100 disabled:cursor-not-allowed ${inputClassName}`}
        onChange={(e) => {
          // Allow manual typing, but don't call onChange until place is selected
          // The autocomplete listener will handle onChange when a place is selected
        }}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

