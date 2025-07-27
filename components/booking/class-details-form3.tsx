import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";
import { TagSelector } from "@/components/ui/tag-selector";

interface ClassDetailsForm3Props {
  onNext: (data: ClassDetailsForm3Data) => void;
  onBack: () => void;
  initialValues?: Partial<ClassDetailsForm3Data>;
}

export interface ClassDetailsForm3Data {
  startDate: string;
  endDate: string;
  cuisines: string[];
}

const availableCuisines = [
  "African",
  "Modern English",
  "Italian",
  "French",
  "Asian",
  "Mediterranean",
  "Mexican",
  "Indian",
];

const ClassDetailsForm3: React.FC<ClassDetailsForm3Props> = ({
  onNext,
  onBack,
  initialValues = {},
}) => {
  const [formData, setFormData] = useState<ClassDetailsForm3Data>({
    startDate: "",
    endDate: "",
    cuisines: [],
    ...initialValues,
  });

  const progressSteps = [
    { label: "Class Detail", completed: true },
    { label: "Class Preferences", completed: true },
    { label: "Class Schedule", completed: true, inProgress: true },
  ];

  const handleInputChange = (
    field: keyof ClassDetailsForm3Data,
    value: any,
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleContinue = () => {
    onNext(formData);
  };

  return (
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />
      <header className="absolute left-0 top-0">
        <h1 className="text-black text-xl font-medium leading-[30px] w-[126px] h-[30px]">
          Chef Titilayo
        </h1>
      </header>
      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>
      <div className="absolute left-5 top-[132px]">
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
      </div>
      <div className="absolute left-5 top-[291px]">
        <svg
          width="613"
          height="1"
          viewBox="0 0 613 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-0.00390625 0.5L613.003 0.5" stroke="#E7E7E7" />
        </svg>
      </div>
      <section className="absolute left-5 top-[307px] w-[613px]">
        <h2 className="text-black text-2xl font-medium leading-8 w-[300px] h-8 mb-[47px]">
          Class Details
        </h2>
        <form
          className="flex flex-col flex-1 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleContinue();
          }}
        >
          <label
            htmlFor="startDate"
            className="text-[#344054] text-sm font-medium mb-2"
          >
            Start date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            className="border border-gray-300 rounded-lg px-3.5 py-2.5 mb-4"
            required
          />
          <label
            htmlFor="endDate"
            className="text-[#344054] text-sm font-medium mb-2"
          >
            End date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
            className="border border-gray-300 rounded-lg px-3.5 py-2.5 mb-4"
            required
          />
          <TagSelector
            label="Cuisine"
            tags={availableCuisines}
            selectedTags={formData.cuisines}
            onTagsChange={(tags) => handleInputChange("cuisines", tags)}
          />
        </form>
      </section>
      <div className="absolute left-5 top-[720px]">
        <svg
          width="613"
          height="2"
          viewBox="0 0 613 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1L613.007 1" stroke="#E7E7E7" />
        </svg>
      </div>
      <div className="absolute left-[357px] top-[772px]">
        <ActionButtons
          onBack={onBack}
          onContinue={handleContinue}
          continueDisabled={
            !formData.startDate ||
            !formData.endDate ||
            formData.cuisines.length === 0
          }
        />
      </div>
    </main>
  );
};

export default ClassDetailsForm3;
export { ClassDetailsForm3 };
