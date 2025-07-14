"use client";

import { useState } from "react";
import { AllergyTag } from "./custom/allergy-tags";

const allergyOptions = [
  "Vegetarian",
  "Gluten free",
  "No Shellfish",
  "No Nuts",
  "Dairy free",
  "Wheat",
  "Plant only",
  "Halal",
  "Others",
  "None",
];

export const DietaryRestrictions = () => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([
    "Vegetarian",
    "Halal",
  ]);

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((item) => item !== allergy)
        : [...prev, allergy]
    );
  };

  return (
    <section className="flex flex-col mt-14 w-full max-md:mt-10 max-md:max-w-full">
      <div className="self-start max-md:max-w-full">
        <h3 className="text-base font-medium text-black">
          Dietary Restrictions
        </h3>
        <p className="mt-1 text-xs text-neutral-500 max-md:max-w-full">
          Let us know if any of your guest has an allergy, you can always update
          this later
        </p>
      </div>
      <div className="flex flex-wrap gap-2 items-start mt-6 w-full text-sm leading-none max-w-[573px] text-neutral-400 max-md:max-w-full">
        {allergyOptions.map((allergy) => (
          <AllergyTag
            key={allergy}
            label={allergy}
            isSelected={selectedAllergies.includes(allergy)}
            onClick={() => toggleAllergy(allergy)}
          />
        ))}
      </div>
    </section>
  );
};
