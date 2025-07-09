"use client";

import React, { useState } from "react";
import Image from "next/image";

import { FormField } from "../ui/form-field";
import { PriceInput } from "../ui/price-input";
import { TagSelector } from "../ui/tag-selector";
import { FormNavigationFooter } from "./form-navigation-footer";
import { ProgressStepper } from "./progress-indicator";

import { MenuFormData } from "@/types/menu-form";

interface CreateMenuStep1Props {
  onContinue: () => void;
  onBack: () => void;
  formData: Partial<MenuFormData>;
  updateFormData: (data: Partial<MenuFormData>) => void;
}

const CreateMenuStep1: React.FC<CreateMenuStep1Props> = ({
  onContinue,
  onBack,
  formData,
  updateFormData,
}) => {
  const [localFormData, setLocalFormData] = useState<Partial<MenuFormData>>({
    menuName: formData.menuName || "",
    price: formData.price || "",
    minimumGuests: formData.minimumGuests || "",
    maxMenuSelection: formData.maxMenuSelection || "3",
    eventTypes: formData.eventTypes || ["Wedding", "Birthday", "Dinner"],
    cuisineTypes: formData.cuisineTypes || ["African", "Modern English", "Italian"],
    menuType: formData.menuType || "Chef at home",
  });

  const progressSteps = [
    { label: "Details", completed: true },
    { label: "Menu & prices", completed: true },
    { label: "Menu images", completed: true },
    { label: "Finish upload", completed: true },
  ];

  const eventTypeOptions = [
    "Wedding",
    "Birthday",
    "Dinner",
    "Corporate",
    "Anniversary",
  ];
  const cuisineTypeOptions = [
    "African",
    "Modern English",
    "Italian",
    "Asian",
    "Mediterranean",
    "French",
  ];
  const menuTypeOptions = [
    "Chef at home",
    "Catering",
    "Meal prep",
    "Private dining",
  ];

  const handleInputChange =
    (field: keyof MenuFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const newData = { ...localFormData, [field]: event.target.value };
      setLocalFormData(newData);
      updateFormData(newData);
    };

  const handleValueChange = (field: keyof MenuFormData) => (value: string) => {
    const newData = { ...localFormData, [field]: value };
    setLocalFormData(newData);
    updateFormData(newData);
  };

  const handleTagsChange = (field: keyof Pick<MenuFormData, "eventTypes" | "cuisineTypes">) => (tags: string[]) => {
      const newData = { ...localFormData, [field]: tags };
      setLocalFormData(newData);
      updateFormData(newData);
    };

  const handleContinueClick = () => {
    updateFormData(localFormData);
    onContinue();
  };

  return (
    <div className="flex flex-col w-full max-w-[655px] mx-auto">
      <header className="text-xl font-semibold text-black mb-6">
        Create menu
      </header>

      <main className="flex flex-col w-full bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 p-6">
        <ProgressStepper />

        <section>
          <h2 className="self-start mt-7 text-lg font-semibold leading-loose text-black max-md:ml-0.5">
            Details
          </h2>

          <div className="relative w-full aspect-[500] mt-2">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/46c8b21cf0d7b2f8b159fb09d61c3f987e263a20?placeholderIfAbsent=true"
              priority
              alt="Menu details"
              className="object-contain stroke-[1px] stroke-neutral-200"
              fill
            />
          </div>

          <div className="mt-6 max-md:max-w-full">
            <FormField
              label="Menu name"
              placeholder="What's the menu name?"
              value={localFormData.menuName}
              onChange={handleInputChange("menuName")}
            />

            <PriceInput
              className="mt-5"
              label="Price"
              placeholder="Price per person"
              value={localFormData.price}
              onChange={handleValueChange("price")}
            />

            <FormField
              className="mt-5"
              label="Minimum number of guests"
              placeholder="What's the menu name?"
              type="number"
              value={localFormData.minimumGuests}
              onChange={handleInputChange("minimumGuests")}
            />

            <FormField
              className="mt-5"
              label="Maximum menu selection"
              options={["1", "2", "3", "4", "5"]}
              placeholder="Select maximum menu selection"
              type="select"
              value={localFormData.maxMenuSelection}
              onChange={handleInputChange("maxMenuSelection")}
            />

            <TagSelector
              className="mt-5"
              label="Event type"
              selectedTags={localFormData.eventTypes}
              tags={eventTypeOptions}
              onTagsChange={handleTagsChange("eventTypes")}
            />

            <TagSelector
              className="mt-5"
              label="Cuisines type"
              selectedTags={localFormData.cuisineTypes}
              tags={cuisineTypeOptions}
              onTagsChange={handleTagsChange("cuisineTypes")}
            />

            <FormField
              className="mt-5"
              label="Menu type"
              options={menuTypeOptions}
              placeholder="Select menu type"
              type="select"
              value={localFormData.menuType}
              onChange={handleInputChange("menuType")}
            />
          </div>
        </section>

        <div className="relative w-full aspect-[500] mt-28 max-md:mt-10">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4e5e0e8d7af4287197a7d5d0575a23c15b68d216?placeholderIfAbsent=true"
            alt="Menu preview"
            fill
            className="object-contain stroke-[1px] stroke-neutral-200"
          />
        </div>

        <FormNavigationFooter 
          onBack={onBack}
          onContinue={handleContinueClick}
        />
      </main>
    </div>
  );
};

export default CreateMenuStep1;
