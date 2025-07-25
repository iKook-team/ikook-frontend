import React, { useState } from "react";
import { ProgressIndicator } from './progress-indicator';
import { ChefCard } from "@/components/cart/chef-card";
import { ActionButtons } from './action-buttons';

interface ClassDetailsFormProps {
  onNext: (data: ClassDetailsFormData) => void;
  onBack: () => void;
  initialValues?: Partial<ClassDetailsFormData>;
}

export interface ClassDetailsFormData {
  location: string;
  teaching: "Individual" | "Conventional" | "";
  guests: number;
}

const ClassDetailsForm: React.FC<ClassDetailsFormProps> = ({ onNext, onBack, initialValues = {} }) => {
  const [formData, setFormData] = useState<ClassDetailsFormData>({
    location: "",
    teaching: "",
    guests: 1,
    ...initialValues
  });

  const progressSteps = [
    { label: 'Class Detail', completed: true, inProgress: true },
    { label: 'Preferences', completed: false },
    { label: 'Message', completed: false }
  ];

  const handleInputChange = (field: keyof ClassDetailsFormData, value: any) => {
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
            <h1 className="text-2xl font-semibold text-gray-900">Chef Titilayo</h1>
          </header>
          
          <div className="mb-4">
            <ProgressIndicator steps={progressSteps} />
          </div>
        </div>

        {/* Chef Card Section */}
        <div className="px-6 py-4 border-b border-gray-100">
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

        {/* Form Section */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Class Details
          </h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter location"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Teaching Format
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Individual", "Conventional"].map(option => (
                  <label 
                    key={option}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      formData.teaching === option
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-gray-900 font-medium">{option}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      formData.teaching === option
                        ? 'bg-amber-500 border-amber-500'
                        : 'border-2 border-gray-300'
                    }`}>
                      {formData.teaching === option && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 9.293a1 1 0 0 1-1.414 0l-1.5-1.5a1 1 0 0 1 1.414-1.414L3 7.086l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6z" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="radio"
                      name="teaching"
                      value={option}
                      checked={formData.teaching === option}
                      onChange={() => handleInputChange("teaching", option)}
                      className="sr-only"
                      required
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                step="1"
                value={formData.guests}
                onChange={(e) => handleInputChange("guests", parseInt(e.target.value, 10) || 1)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter number of guests"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={!formData.location || !formData.teaching || formData.guests < 1}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ClassDetailsForm;
export { ClassDetailsForm }; 