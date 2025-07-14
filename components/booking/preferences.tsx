"use client";

import { useState } from "react";

import { DietaryRestrictions } from "./dietary-restrictions";

import { CartHeader } from "@/components/cart/cart-header";
import { ChefCard } from "@/components/cart/chef-card";

interface PreferencesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ onNext, onBack }) => {
  const [allergyDetails, setAllergyDetails] = useState("");

  const handleContinue = () => {
    onNext({ allergyDetails });
  };

  return (
    <main className="flex max-w-[655px] flex-col items-stretch">
      <CartHeader title="Preferences" />

      <div className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-stretch bg-white mt-2 py-[33px] rounded-[15px] border-solid max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch px-[19px] max-md:max-w-full max-md:pr-5">
          <ChefCard
            chefName="Chef Titilayo John"
            dishName="Braised Chicken With Lemon and Olives"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/231d86006c0dab5ed39c08a8a310d23841a29a6f?placeholderIfAbsent=true"
            location="London"
            locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
            rating="4.6"
            ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
            reviewCount="(23 Reviews)"
          />

          <DietaryRestrictions />

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
                  id="allergy-details"
                  placeholder="Enter a description..."
                  value={allergyDetails}
                  onChange={(e) => setAllergyDetails(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between items-center mt-8 text-base font-semibold whitespace-nowrap">
            <button
              className="px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
              type="button"
              onClick={onBack}
            >
              Back
            </button>
            <button
              className="px-5 py-3 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-500 transition-colors"
              type="button"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
