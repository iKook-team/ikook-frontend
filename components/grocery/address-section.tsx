"use client";

import React, { useMemo } from 'react';
import { InputField } from './input-field';
import { FormField } from '@/components/ui/form-field';
import { useMarket } from '@/lib/market-context';
import { getLocationsForMarket } from '@/lib/locations';

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

  // Use market-based city/state options (same as signup flow)
  const { market } = useMarket();
  const allLocations = useMemo(() => getLocationsForMarket(market), [market]);
  const cityOptions = useMemo(
    () => [{ value: '', label: 'Select city' }, ...allLocations.map((v) => ({ value: v, label: v }))],
    [allLocations]
  );

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

      <FormField
        label="City/State"
        type="select"
        options={cityOptions}
        placeholder="Select city"
        value={city}
        onChange={(e) => onCityChange((e.target as HTMLSelectElement).value)}
        className="w-full"
      />
    </section>
  );
};