"use client";

import { useState } from "react";
import { ProgressIndicator } from './progress-indicator';
import { ChefCard } from "@/components/cart/chef-card";
import { ActionButtons } from './action-buttons';
import { DietaryRestrictions } from "./dietary-restrictions";

interface PreferencesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  menu: any;
  formData: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onNext, onBack, menu, formData, onChange }) => {
  const allergyDetails = formData.allergyDetails || "";
  const dietaryRestrictions = formData.dietaryRestrictions || [];

  const progressSteps = [
    { label: 'Event Details', completed: true, inProgress: true },
    { label: 'Preferences', completed: false },
    { label: 'Message', completed: false }
  ];

  const handleContinue = () => {
    onNext({ allergyDetails, dietaryRestrictions });
  };

  return (
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

      <header className="absolute left-0 top-0">
        <h1 className="text-black text-xl font-medium leading-[30px] w-[300px] h-[30px] truncate">
          {menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
        </h1>
      </header>

      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>

      <div className="absolute left-5 top-[132px] w-full pr-5">
        <ChefCard
          chefName={menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
          dishName={menu?.name || "Menu"}
          imageUrl={menu?.images && menu.images.length > 0 && menu.images[0].image ? menu.images[0].image : "/menus/menu1.png"}
          location={menu?.chef?.city || "Unknown"}
          locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
          rating={menu?.chef?.average_rating ? menu.chef.average_rating.toFixed(1) : "-"}
          ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
          reviewCount={menu?.chef?.num_reviews ? `(${menu.chef.num_reviews} Reviews)` : "(0 Reviews)"}
        />
      </div>

      <div className="absolute left-5 top-[291px]">
        <svg width="613" height="1" viewBox="0 0 613 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-0.00390625 0.5L613.003 0.5" stroke="#E7E7E7"></path>
        </svg>
      </div>

      <section className="absolute left-5 top-[307px] w-[613px]">
        <h2 className="text-black text-2xl font-medium leading-8 w-[200px] h-0">
          Preferences
        </h2>
        <form className="flex flex-col flex-1 w-full" onSubmit={e => { e.preventDefault(); handleContinue(); }}>
          <div className="mb-6">
            <DietaryRestrictions
              selectedAllergies={dietaryRestrictions}
              onChange={(allergies) => onChange({ ...formData, dietaryRestrictions: allergies })}
            />
          </div>
          <label htmlFor="allergy-details" className="text-sm font-medium leading-none text-neutral-700 mb-2">
            Give us more details about guest allergies
          </label>
          <textarea
            className="overflow-hidden flex-1 shrink gap-2 px-3.5 py-2.5 mt-1.5 text-base leading-6 bg-white rounded-lg border border-solid shadow-sm basis-0 border-[color:var(--Gray-100,#CFCFCE)] w-full text-neutral-700 min-h-[120px] resize-none mb-6"
            id="allergy-details"
            placeholder="Enter a description..."
            value={allergyDetails}
            onChange={(e) => onChange({ ...formData, allergyDetails: e.target.value })}
          />
        </form>
      </section>

      <div className="absolute left-5 top-[720px]">
        <svg width="613" height="2" viewBox="0 0 613 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1L613.007 1" stroke="#E7E7E7"></path>
        </svg>
      </div>

      <div className="absolute left-[357px] top-[772px]">
        <ActionButtons
          onBack={onBack}
          onContinue={handleContinue}
          continueDisabled={false}
        />
      </div>
    </main>
  );
};

export default PreferencesForm;
export { PreferencesForm };
