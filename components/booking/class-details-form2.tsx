import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

interface ClassDetailsForm2Props {
  onNext: (data: ClassDetailsForm2Data) => void;
  onBack: () => void;
  initialValues?: Partial<ClassDetailsForm2Data>;
  chefName?: string;
}

export interface ClassDetailsForm2Data {
  appearance: "Physical" | "Virtual" | "";
  experience: "One-time" | "Multiple" | "";
  days: number;
}

const ClassDetailsForm2: React.FC<ClassDetailsForm2Props> = ({
  onNext,
  onBack,
  initialValues = {},
  chefName = "Chef",
}) => {
  const [formData, setFormData] = useState<ClassDetailsForm2Data>({
    appearance: "",
    experience: "",
    days: 1,
    ...initialValues,
  });

  const progressSteps = [
    { label: "Event Details", completed: false, inProgress: true },
    { label: "Budget", completed: false },
    { label: "Message", completed: false },
  ];

  const handleInputChange = (
    field: keyof ClassDetailsForm2Data,
    value: any,
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleContinue = () => {
    onNext(formData);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleContinue();
  };

  return (
    <div className="flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{chefName}</h1>
          </header>

          <div className="mb-4">
            <ProgressIndicator steps={progressSteps} />
          </div>
        </div>

        {/* Form Section */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Class Preferences
          </h2>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Appearance
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Physical", "Virtual"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      formData.appearance === option
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <span className="text-gray-900 font-medium">{option}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        formData.appearance === option
                          ? "bg-amber-500 border-amber-500"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {formData.appearance === option && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 12 12"
                        >
                          <path d="M3.707 9.293a1 1 0 0 1-1.414 0l-1.5-1.5a1 1 0 0 1 1.414-1.414L3 7.086l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6z" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="radio"
                      name="appearance"
                      value={option}
                      checked={formData.appearance === option}
                      onChange={() => handleInputChange("appearance", option)}
                      className="sr-only"
                      required
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Experience Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["One-time", "Multiple"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      formData.experience === option
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <span className="text-gray-900 font-medium">{option}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        formData.experience === option
                          ? "bg-amber-500 border-amber-500"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {formData.experience === option && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 12 12"
                        >
                          <path d="M3.707 9.293a1 1 0 0 1-1.414 0l-1.5-1.5a1 1 0 0 1 1.414-1.414L3 7.086l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6z" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="radio"
                      name="experience"
                      value={option}
                      checked={formData.experience === option}
                      onChange={() => handleInputChange("experience", option)}
                      className="sr-only"
                      required
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="days"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Days
              </label>
              <input
                type="number"
                id="days"
                name="days"
                min="1"
                value={formData.days}
                onChange={(e) =>
                  handleInputChange("days", parseInt(e.target.value, 10) || 1)
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter number of days"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={
                  !formData.appearance ||
                  !formData.experience ||
                  formData.days < 1
                }
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ClassDetailsForm2;
export { ClassDetailsForm2 };
