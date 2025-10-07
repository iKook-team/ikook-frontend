"use client";

import { AllergyTag } from "./custom/allergy-tags";

const allergyOptions = [
  "Vegetarian",
  "Gluten Free",
  "No Shellfish",
  "No Nuts",
  "Dairy Free",
  "Wheat",
  "Plant Only",
  "Halal",
  "Others",
  "None",
];

interface DietaryRestrictionsProps {
  selectedAllergies: string[];
  onChange: (allergies: string[]) => void;
}

export const DietaryRestrictions: React.FC<DietaryRestrictionsProps> = ({
  selectedAllergies = [],
  onChange,
}) => {
  const toggleAllergy = (allergy: string) => {
    if (allergy === 'None') {
      if (selectedAllergies.includes('None')) {
        // If 'None' is already selected, deselect it
        onChange([]);
      } else {
        // If 'None' is not selected, select only 'None' and clear others
        onChange(['None']);
      }
    } else if (selectedAllergies.includes('None')) {
      // If 'None' is already selected and user selects something else, remove 'None' and add the new selection
      onChange([allergy]);
    } else if (selectedAllergies.includes(allergy)) {
      // If the allergy is already selected, remove it
      onChange(selectedAllergies.filter((item) => item !== allergy));
    } else {
      // Add the new allergy
      onChange([...selectedAllergies, allergy]);
    }
  };

  // Check if 'None' is selected
  const isNoneSelected = selectedAllergies.includes('None');

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
        {allergyOptions.map((allergy) => {
          const isSelected = selectedAllergies.includes(allergy);
          const isDisabled = isNoneSelected && allergy !== 'None';
          
          return (
            <AllergyTag
              key={allergy}
              label={allergy}
              isSelected={isSelected}
              onClick={() => !isDisabled && toggleAllergy(allergy)}
              disabled={isDisabled}
            />
          );
        })}
      </div>
    </section>
  );
};
