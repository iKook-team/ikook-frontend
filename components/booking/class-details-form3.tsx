import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";
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
    { label: "Event Details", completed: false, inProgress: true },
    { label: "Budget", completed: false },
    { label: "Message", completed: false },
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
    <div className="flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Chef Titilayo</h1>
          </header>
          <div className="mb-4">
            <ProgressIndicator steps={progressSteps} />
          </div>
        </div>

        {/* Form Section */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Class Schedule</h2>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Start date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                End date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            <div>
              <TagSelector
                label="Cuisine"
                tags={availableCuisines}
                selectedTags={formData.cuisines}
                onTagsChange={(tags) => handleInputChange("cuisines", tags)}
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200">
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
          </form>
        </section>
      </div>
    </div>
  );
};

export default ClassDetailsForm3;
export { ClassDetailsForm3 };
