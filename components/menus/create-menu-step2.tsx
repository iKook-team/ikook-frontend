"use client";

import React, { useState } from "react";

import { FormField } from "../ui/form-field";
import { PriceInput } from "../ui/price-input";

import { ProgressStepper } from "./progress-indicator";
import FormNavigationFooter from "./form-navigation-footer";

interface FormData {
  menuName: string;
  menuDescription: string;
  additionalStarterCharge: string;
  menuSelection: string;
}

interface CreateMenuStep2Props {
  onContinue: () => void;
  onBack: () => void;
  formData: Partial<FormData>;
  updateFormData: (data: Partial<FormData>) => void;
}

export const CreateMenuStep2: React.FC<CreateMenuStep2Props> = ({
  onContinue,
  onBack,
  formData,
  updateFormData
}) => {
  const [localFormData, setLocalFormData] = useState<Partial<FormData>>(formData || {});

  React.useEffect(() => {
    setLocalFormData(formData || {});
  }, [formData]);

  const progressSteps = [
    { label: "Details", completed: true },
    { label: "Menu & prices", completed: true },
    { label: "Menu images", completed: true },
    { label: "Finish upload", completed: true },
  ];

  const handleInputChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const newData = { ...localFormData, [field]: event.target.value };
      setLocalFormData(newData);
      updateFormData(newData);
    };

  const handleValueChange = (field: keyof FormData) => (value: string) => {
    const newData = { ...localFormData, [field]: value };
    setLocalFormData(newData);
    updateFormData(newData);
  };

  const handleBack = () => {
    updateFormData(localFormData);
    onBack();
  };

  const handleContinue = () => {
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

        <section className="mt-6 max-md:max-w-full">
          <h3 className="text-base font-medium text-black">Starter Menu</h3>
          <div className="mt-6 max-md:max-w-full">
            <div className="flex flex-col w-full">
              <FormField
                label="Menu name"
                placeholder="What's the menu name?"
                value={localFormData.menuName || ""}
                onChange={handleInputChange("menuName")}
              />

              <FormField
                label="Menu description"
                className="mt-5"
                placeholder="Describe the menu?"
                value={localFormData.menuDescription || ""}
                onChange={handleInputChange("menuDescription")}
              />

              <button className="flex justify-end mt-3 text-sm font-semibold leading-none rounded-lg text-slate-700">
                <div className="flex overflow-hidden gap-2 justify-center items-center px-3.5 py-2 bg-white rounded-lg border border-solid shadow-sm border-stone-300">
                  <span className="self-stretch my-auto text-slate-700">
                    Add new starter
                  </span>
                </div>
              </button>

              <PriceInput
                label="Additional starter charge"
                className="mt-5"
                placeholder="Price per person"
                value={localFormData.additionalStarterCharge || ""}
                onChange={handleValueChange("additionalStarterCharge")}
              />

              <FormField
                label="Menu selection"
                type="number"
                className="mt-5"
                placeholder="How many menu selections?"
                value={localFormData.menuSelection || ""}
                onChange={handleInputChange("menuSelection")}
              />
            </div>
          </div>
        </section>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4e5e0e8d7af4287197a7d5d0575a23c15b68d216?placeholderIfAbsent=true"
          alt=""
          className="object-contain mt-28 w-full aspect-[500] stroke-[1px] stroke-neutral-200 max-md:mt-10 max-md:max-w-full"
        />

        <div className="flex justify-end w-full mt-8">
          <FormNavigationFooter onBack={handleBack} onContinue={handleContinue} />
        </div>       
      </main>
    </div>
  );
};

export default CreateMenuStep2;
