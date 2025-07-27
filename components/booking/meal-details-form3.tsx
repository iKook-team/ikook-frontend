import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";
import { TagSelector } from "@/components/ui/tag-selector";

interface MealDetailsForm3Props {
  onNext: (data: MealForm3Data) => void;
  onBack: () => void;
  isCustomBooking?: boolean;
  menu?: any;
}

export interface MealForm3Data {
  mealType: "Breakfast" | "Lunch" | "Dinner" | "";
  preferredCuisines: string[];
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

const MealDetailsForm3: React.FC<MealDetailsForm3Props> = ({
  onNext,
  onBack,
  isCustomBooking = false,
  menu,
}) => {
  const [formData, setFormData] = useState<MealForm3Data>({
    mealType: "",
    preferredCuisines: [],
  });

  const progressSteps = [
    { label: "Meal Details", completed: true, inProgress: true },
    { label: "Budget", completed: false },
    { label: "Message", completed: false },
  ];

  const handleInputChange = (field: keyof MealForm3Data, value: any) => {
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
          {!isCustomBooking && (
            <header className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 truncate">
                {menu?.chef?.first_name && menu?.chef?.last_name
                  ? `${menu.chef.first_name} ${menu.chef.last_name}`
                  : "Chef"}
              </h1>
            </header>
          )}

          <div className="mb-6">
            <ProgressIndicator steps={progressSteps} />
          </div>
        </div>

        {/* Chef Card Section */}
        {!isCustomBooking && (
          <div className="px-6 py-4 border-b border-gray-100">
            <ChefCard
              chefName={
                menu?.chef?.first_name && menu?.chef?.last_name
                  ? `${menu.chef.first_name} ${menu.chef.last_name}`
                  : "Chef"
              }
              dishName={menu?.name || "Menu"}
              imageUrl={
                menu?.images?.length > 0
                  ? menu.images[0].image
                  : "/menus/menu1.png"
              }
              location={menu?.chef?.city || "Unknown"}
              locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
              rating={menu?.chef?.average_rating?.toFixed(1) || "-"}
              ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
              reviewCount={
                menu?.chef?.num_reviews
                  ? `(${menu.chef.num_reviews} Reviews)`
                  : "(0 Reviews)"
              }
            />
          </div>
        )}
        {/* Form Section */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Meal Details</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Meal Type
              </label>
              <div className="space-y-3">
                {["Breakfast", "Lunch", "Dinner"].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="mealType"
                      value={option}
                      checked={formData.mealType === option}
                      onChange={() =>
                        handleInputChange(
                          "mealType",
                          option as "Breakfast" | "Lunch" | "Dinner",
                        )
                      }
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      required
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Cuisines
              </label>
              <div className="mb-2">
                <TagSelector
                  label="Preferred Cuisines"
                  tags={availableCuisines}
                  selectedTags={formData.preferredCuisines}
                  onTagsChange={(selected) =>
                    handleInputChange("preferredCuisines", selected)
                  }
                  className="mb-2"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Select at least one cuisine
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={
                  !formData.mealType || formData.preferredCuisines.length === 0
                }
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MealDetailsForm3;
export { MealDetailsForm3 };
