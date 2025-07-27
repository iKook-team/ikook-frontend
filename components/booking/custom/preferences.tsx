"use client";

import { useState } from "react";

import { DietaryRestrictions } from "../dietary-restrictions";

interface PreferencesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({
  onNext,
  onBack,
}) => {
  const [allergyDetails, setAllergyDetails] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const handleAllergyChange = (allergies: string[]) => {
    setSelectedAllergies(allergies);
  };

  const handleContinue = () => {
    onNext({ allergyDetails, selectedAllergies });
  };

  return (
    <main className="flex flex-col px-10 pt-9 pb-20 mt-16 max-w-full bg-white rounded-2xl border border-solid shadow-lg border-[color:var(--Black-100,#E7E7E7)] w-[654px] max-md:px-5 max-md:mt-10">
      <h2 className="self-center ml-4 text-2xl font-bold leading-none text-black">
        Preferences
      </h2>

      <DietaryRestrictions
        selectedAllergies={selectedAllergies}
        onChange={handleAllergyChange}
      />

      <div className="mt-6 min-h-[170px] text-neutral-700 max-md:max-w-full">
        <div className="flex-1 w-full max-md:max-w-full">
          <div className="flex-1 w-full max-md:max-w-full">
            <label
              htmlFor="allergy-details"
              className="text-sm font-medium leading-none text-neutral-700"
            >
              Give us more details about guest allergies
            </label>
            <textarea
              className="overflow-hidden flex-1 shrink gap-2 px-3.5 py-2.5 mt-1.5 text-base leading-6 bg-white rounded-lg border border-solid shadow-sm basis-0 border-[color:var(--Gray-100,#CFCFCE)] size-full text-neutral-700 max-md:max-w-full min-h-[120px] resize-none"
              placeholder="Enter a description..."
              value={allergyDetails}
              onChange={(e) => setAllergyDetails(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-6 items-start self-center mt-28 text-base font-semibold whitespace-nowrap max-md:mt-10">
        <button
          type="button"
          onClick={onBack}
          className="overflow-hidden gap-2 self-stretch px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="overflow-hidden gap-2 self-stretch px-5 py-3 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-500 transition-colors"
        >
          Continue
        </button>
      </div>
    </main>
  );
};
