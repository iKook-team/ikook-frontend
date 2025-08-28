import React from "react";

import { BudgetCard } from "./budget-card";
import { SectionWithTags } from "./section-with-tags";
import { TextSection } from "./text-section";

interface CustomDetailsFormProps {
  booking?: any;
  onSubmit?: (data: FormData) => void;
}

export interface FormData {
  budget: string;
  isFlexible: boolean;
  preferredCuisines: string[];
  eventType: string[];
  dietaryRestrictions: string[];
  allergiesDetails: string;
  message: string;
}

export const CustomDetailsForm: React.FC<CustomDetailsFormProps> = ({
  booking,
}) => {
  // Map booking fields directly to content
  const hasBudget = booking?.budget !== null && booking?.budget !== undefined;
  const isFlexible = booking?.is_flexible ?? false;
  const preferredCuisines = booking?.preferred_cuisines || [];
  const eventType = booking?.event_type ? [booking.event_type] : [];
  const dietaryRestrictions = booking?.dietary_restrictions || [];
  const allergiesDetails = booking?.dietary_restrictions_details || "-";
  const message = booking?.message || "-";

  const cuisineOptions = preferredCuisines;
  const eventTypeOptions = eventType;
  const dietaryOptions = dietaryRestrictions;

  return (
    <div className="max-w-none flex w-[489px] flex-col items-start gap-6 mx-auto max-md:max-w-[489px] max-md:w-full max-sm:max-w-screen-sm max-sm:w-full max-sm:box-border max-sm:px-4 max-sm:py-0">
      {hasBudget && (
        <BudgetCard amount={String(booking.budget)} isFlexible={isFlexible} />
      )}

      {Array.isArray(cuisineOptions) && cuisineOptions.length > 0 && (
        <SectionWithTags
          title="Preferred Cuisines"
          tags={cuisineOptions}
          selectedTags={cuisineOptions}
          multiSelect={true}
        />
      )}

      {Array.isArray(eventTypeOptions) && eventTypeOptions.length > 0 && (
        <SectionWithTags
          title="Event type"
          tags={eventTypeOptions}
          selectedTags={eventTypeOptions}
          multiSelect={false}
        />
      )}

      {Array.isArray(dietaryOptions) && dietaryOptions.length > 0 && (
        <SectionWithTags
          title="Dietary restrictions"
          tags={dietaryOptions}
          selectedTags={dietaryOptions}
          multiSelect={true}
        />
      )}

      <TextSection
        title="Allergies details"
        content={allergiesDetails}
        editable={false}
      />

      <TextSection title="Message" content={message} editable={false} />
    </div>
  );
};
