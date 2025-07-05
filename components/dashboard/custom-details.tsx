import React, { useState } from "react";

import { BudgetCard } from "./budget-card";
import { SectionWithTags } from "./section-with-tags";
import { TextSection } from "./text-section";

interface CustomDetailsFormProps {
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
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    budget: "1,200",
    isFlexible: true,
    preferredCuisines: [
      "African",
      "Italian",
      "Chinese",
      "European",
      "Modern English",
      "BBQ",
      "Indian",
      "Middle Eastern",
      "Spanish",
    ],
    eventType: ["Wedding"],
    dietaryRestrictions: ["Vegetarian", "Halal"],
    allergiesDetails: "2 of my guest are veg and do not drink water...",
    message: "2 of my guest are veg and do not drink water...",
  });

  const cuisineOptions = [
    "African",
    "Italian",
    "Chinese",
    "European",
    "Modern English",
    "BBQ",
    "Indian",
    "Middle Eastern",
    "Spanish",
    "French",
    "Thai",
    "Mexican",
    "Japanese",
    "Mediterranean",
  ];

  const eventTypeOptions = [
    "Wedding",
    "Birthday Party",
    "Corporate Event",
    "Anniversary",
    "Baby Shower",
    "Graduation",
    "Holiday Party",
    "Engagement",
  ];

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Halal",
    "Kosher",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Keto",
    "Paleo",
  ];

  const handleCuisineToggle = (cuisine: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredCuisines: prev.preferredCuisines.includes(cuisine)
        ? prev.preferredCuisines.filter((c) => c !== cuisine)
        : [...prev.preferredCuisines, cuisine],
    }));
  };

  const handleEventTypeToggle = (eventType: string) => {
    setFormData((prev) => ({
      ...prev,
      eventType: prev.eventType.includes(eventType)
        ? prev.eventType.filter((e) => e !== eventType)
        : [eventType], // Single selection for event type
    }));
  };

  const handleDietaryToggle = (dietary: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(dietary)
        ? prev.dietaryRestrictions.filter((d) => d !== dietary)
        : [...prev.dietaryRestrictions, dietary],
    }));
  };

  const handleAllergiesEdit = (newContent: string) => {
    setFormData((prev) => ({
      ...prev,
      allergiesDetails: newContent,
    }));
  };

  const handleMessageEdit = (newContent: string) => {
    setFormData((prev) => ({
      ...prev,
      message: newContent,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-none flex w-[489px] flex-col items-start gap-6 mx-auto max-md:max-w-[489px] max-md:w-full max-sm:max-w-screen-sm max-sm:w-full max-sm:box-border max-sm:px-4 max-sm:py-0"
      aria-label="Event details form"
    >
      <BudgetCard amount={formData.budget} isFlexible={formData.isFlexible} />

      <SectionWithTags
        title="Preferred Cuisines"
        tags={cuisineOptions}
        selectedTags={formData.preferredCuisines}
        onTagClick={handleCuisineToggle}
        multiSelect={true}
      />

      <SectionWithTags
        title="Event type"
        tags={eventTypeOptions}
        selectedTags={formData.eventType}
        onTagClick={handleEventTypeToggle}
        multiSelect={false}
      />

      <SectionWithTags
        title="Dietary restrictions"
        tags={dietaryOptions}
        selectedTags={formData.dietaryRestrictions}
        onTagClick={handleDietaryToggle}
        multiSelect={true}
      />

      <TextSection
        title="Allergies details"
        content={formData.allergiesDetails}
        editable={true}
        onEdit={handleAllergiesEdit}
      />

      <TextSection
        title="Message"
        content={formData.message}
        editable={true}
        onEdit={handleMessageEdit}
      />
    </form>
  );
};
