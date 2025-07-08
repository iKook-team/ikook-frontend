"use client";

import React, { useState } from "react";

import { FormField } from "../ui/form-field";
import { PriceInput } from "../ui/price-input";
import { TagSelector } from "../ui/tag-selector";

import { ProgressIndicator } from "./progress-indicator";

interface FormData {
  menuName: string;
  price: string;
  minimumGuests: string;
  maxMenuSelection: string;
  eventTypes: string[];
  cuisineTypes: string[];
  menuType: string;
}

export const CreateMenuStep1: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    menuName: "",
    price: "",
    minimumGuests: "",
    maxMenuSelection: "3",
    eventTypes: ["Wedding", "Birthday", "Dinner"],
    cuisineTypes: ["African", "Modern English", "Italian"],
    menuType: "Chef at home",
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
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleValueChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagsChange =
    (field: "eventTypes" | "cuisineTypes") => (tags: string[]) => {
      setFormData((prev) => ({ ...prev, [field]: tags }));
    };

  const handleBack = () => {
    // Handle back navigation
    console.log("Back clicked");
  };

  const handleContinue = () => {
    // Handle form submission
    console.log("Form data:", formData);
  };

  return (
    <div className="flex flex-col max-w-[655px]">
      <header className="self-start text-xl font-semibold text-black">
        Create menu
      </header>

      <main className="flex flex-col px-4 py-9 mt-2.5 w-full bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 max-md:pr-5 max-md:max-w-full">
        <ProgressIndicator steps={progressSteps} />

        <section>
          <h2 className="self-start mt-7 text-lg font-semibold leading-loose text-black max-md:ml-0.5">
            Details
          </h2>

          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/46c8b21cf0d7b2f8b159fb09d61c3f987e263a20?placeholderIfAbsent=true"
            alt=""
            className="object-contain mt-2 w-full aspect-[500] stroke-[1px] stroke-neutral-200 max-md:max-w-full"
          />

          <div className="mt-6 max-md:max-w-full">
            <FormField
              label="Menu name"
              placeholder="What's the menu name?"
              value={formData.menuName}
              onChange={handleInputChange("menuName")}
            />

            <PriceInput
              className="mt-5"
              label="Price"
              placeholder="Price per person"
              value={formData.price}
              onChange={handleValueChange("price")}
            />

            <FormField
              className="mt-5"
              label="Minimum number of guests"
              placeholder="What's the menu name?"
              type="number"
              value={formData.minimumGuests}
              onChange={handleInputChange("minimumGuests")}
            />

            <FormField
              className="mt-5"
              label="Maximum menu selection"
              options={["1", "2", "3", "4", "5"]}
              placeholder="Select maximum menu selection"
              type="select"
              value={formData.maxMenuSelection}
              onChange={handleInputChange("maxMenuSelection")}
            />

            <TagSelector
              className="mt-5"
              label="Event type"
              selectedTags={formData.eventTypes}
              tags={eventTypeOptions}
              onTagsChange={handleTagsChange("eventTypes")}
            />

            <TagSelector
              className="mt-5"
              label="Cuisines type"
              selectedTags={formData.cuisineTypes}
              tags={cuisineTypeOptions}
              onTagsChange={handleTagsChange("cuisineTypes")}
            />

            <FormField
              className="mt-5"
              label="Menu type"
              options={menuTypeOptions}
              placeholder="Select menu type"
              type="select"
              value={formData.menuType}
              onChange={handleInputChange("menuType")}
            />
          </div>
        </section>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4e5e0e8d7af4287197a7d5d0575a23c15b68d216?placeholderIfAbsent=true"
          alt=""
          className="object-contain mt-28 w-full aspect-[500] stroke-[1px] stroke-neutral-200 max-md:mt-10 max-md:max-w-full"
        />

        <footer className="flex gap-6 items-start self-end mt-3 text-base font-semibold whitespace-nowrap">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-start text-amber-400 rounded-lg"
          >
            <div className="flex overflow-hidden gap-2 justify-center items-center px-11 py-3 rounded-lg border border-amber-400 border-solid shadow-sm max-md:px-5">
              <span className="self-stretch my-auto text-amber-400">Back</span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="flex items-start text-white rounded-lg"
          >
            <div className="flex overflow-hidden gap-2 justify-center items-center px-7 py-3 bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm max-md:px-5">
              <span className="self-stretch my-auto text-white">Continue</span>
            </div>
          </button>
        </footer>
      </main>
    </div>
  );
};

export default CreateMenuStep1;
