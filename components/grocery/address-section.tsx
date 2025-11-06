"use client";

import React from "react";

import { InputField } from "./input-field";

import { GooglePlacesAutocomplete } from "@/components/ui/google-places-autocomplete";

interface AddressSectionProps {
  address: string;
  onAddressChange: (v: string) => void;
  landmark: string;
  onLandmarkChange: (v: string) => void;
  city: string;
  onCityChange: (v: string) => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  address,
  onAddressChange,
  landmark,
  onLandmarkChange,
  city,
  onCityChange,
}) => {
  return (
    <section className="w-full flex flex-col gap-4">
      <InputField
        label="Address"
        placeholder=""
        value={address}
        onChange={onAddressChange}
        className="w-full"
      />

      <InputField
        label="Landmark"
        placeholder=""
        value={landmark}
        onChange={onLandmarkChange}
        className="w-full"
      />

      <GooglePlacesAutocomplete
        value={city}
        onChange={onCityChange}
        placeholder="Enter city"
        label="City/State"
        className="w-full"
      />
    </section>
  );
};
