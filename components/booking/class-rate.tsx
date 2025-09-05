import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

interface ClassRateProps {
  onBack: () => void;
  onNext?: (data: ClassRateData) => void;
}

export interface ClassRateData {
  option: "Per session" | "Daily" | "";
}

const ClassRate: React.FC<ClassRateProps> = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState<ClassRateData>({
    option: "",
  });

  const progressSteps = [
    { label: "Event Details", completed: false, inProgress: true },
    { label: "Budget", completed: false },
    { label: "Message", completed: false },
  ];

  const handleInputChange = (value: "Per session" | "Daily") => {
    setFormData({ option: value });
  };

  const handleContinue = () => {
    onNext?.(formData);
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
          <h2 className="text-2xl font-semibold text-gray-900">Class Rate</h2>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Option
              </label>
              <div className="space-y-3">
                {["Per session", "Daily"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="option"
                      id={`option-${option}`}
                      value={option}
                      checked={formData.option === option}
                      onChange={() =>
                        handleInputChange(option as "Per session" | "Daily")
                      }
                      className="h-4 w-4 text-amber-500 border-gray-300 focus:ring-amber-500"
                    />
                    <label
                      htmlFor={`option-${option}`}
                      className="ml-2 text-base text-[#101828] font-normal cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={!formData.option}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ClassRate;
export { ClassRate };
