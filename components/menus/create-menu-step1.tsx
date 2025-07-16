"use client";

import React, { useState } from "react";
import Image from "next/image";

import { FormField } from "../ui/form-field";
import { PriceInput } from "../ui/price-input";
import { TagSelector } from "../ui/tag-selector";

import { FormNavigationFooter } from "./form-navigation-footer";
import { ProgressStepper } from "./progress-indicator";

import { MenuFormData } from "@/types/menu-form";
import { useAuthStore } from "@/lib/store/auth-store";

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
  const chefFormData = useAuthStore((s) => s.chefFormData);
  const country = chefFormData?.country;
  function getCurrencySymbol(country?: string) {
    if (!country) return "£";
    if (country === "Nigeria") return "₦";
    if (country === "South Africa") return "R";
    if (country === "United Kingdom") return "£";
    return "£";
  }
  const currency = getCurrencySymbol(country);
  const [localFormData, setLocalFormData] = useState<Partial<MenuFormData>>({
    menuName: formData.menuName || "",
    price: formData.price || "",
    minimumGuests: formData.minimumGuests || "",
    maxMenuSelection: formData.maxMenuSelection || "",
    eventTypes: formData.eventTypes || [],
    cuisineTypes: formData.cuisineTypes || [],
    menuType: formData.menuType || "Chef at Home",
  });

  const progressSteps = [
    { id: "details", label: "Details", isCompleted: true },
    { id: "menu-prices", label: "Menu & prices", isCompleted: false },
    { id: "menu-images", label: "Menu images", isCompleted: false },
    { id: "finish-upload", label: "Finish upload", isCompleted: false },
  ];

  const eventTypeOptions = [
    "Naming",
    "Wedding",
    "Gathering",
  ];
  const cuisineTypeOptions = [
    "Italian",
    "African",
    "Chinese",
    "Pastries",
    "French",
    "English",
    "Spicy Mediterranean",
    "Pizza",
  ];
  const menuTypeOptions = [
    "Chef at Home",
    "Fine Dining",
    "Large Event",
    "Corporate Dining",
    "Meal Prep",
    "Meal Delivery",
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

  const isStepValid =
    !!localFormData.menuName &&
    !!localFormData.price &&
    !!localFormData.minimumGuests &&
    !!localFormData.maxMenuSelection &&
    Array.isArray(localFormData.eventTypes) && localFormData.eventTypes.length > 0 &&
    Array.isArray(localFormData.cuisineTypes) && localFormData.cuisineTypes.length > 0 &&
    !!localFormData.menuType;

  return (
    <div className="flex flex-col w-full max-w-[655px] mx-auto">
      <header className="text-xl font-semibold text-black mb-6">
        Create menu
      </header>

      <main className="flex flex-col w-full bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 p-6">
        <ProgressStepper steps={progressSteps} />

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
              required={true}
            />

            <PriceInput
              className="mt-5"
              label="Price"
              placeholder="Price per person"
              value={localFormData.price}
              onChange={handleValueChange("price")}
              currency={currency}
            />

            <FormField
              className="mt-5"
              label="Minimum number of guests"
              placeholder="What's the menu name?"
              type="number"
              value={localFormData.minimumGuests}
              onChange={handleInputChange("minimumGuests")}
              required={true}
            />

            <FormField
              className="mt-5"
              label="Maximum menu selection"
              placeholder="Enter maximum menu selection"
              type="number"
              value={localFormData.maxMenuSelection}
              onChange={handleInputChange("maxMenuSelection")}
              required={true}
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
              required={true}
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
          disabled={!isStepValid}
        />
      </main>
    </div>
  );
};

export default CreateMenuStep1;
