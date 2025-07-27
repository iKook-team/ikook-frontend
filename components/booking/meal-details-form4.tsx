import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";

interface MealDetailsForm4Props {
  onNext: (data: MealForm4Data) => void;
  onBack: () => void;
  isCustomBooking?: boolean;
  menu?: any;
}

export interface MealForm4Data {
  startDate: string;
  endDate: string;
  deliveryTime: string;
}

const MealDetailsForm4: React.FC<MealDetailsForm4Props> = ({
  onNext,
  onBack,
  isCustomBooking = false,
  menu,
}) => {
  const [formData, setFormData] = useState<MealForm4Data>({
    startDate: "",
    endDate: "",
    deliveryTime: "",
  });

  const progressSteps = [
    { label: "Meal Details", completed: true, inProgress: true },
    { label: "Budget", completed: false },
    { label: "Message", completed: false },
  ];

  const handleInputChange = (field: keyof MealForm4Data, value: string) => {
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
          <h2 className="text-2xl font-semibold text-gray-900">
            Delivery Details
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                  min={
                    formData.startDate || new Date().toISOString().split("T")[0]
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="deliveryTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preferred Delivery Time
              </label>
              <select
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={(e) =>
                  handleInputChange("deliveryTime", e.target.value)
                }
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                required
              >
                <option value="">Select a time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 4PM)</option>
                <option value="evening">Evening (4PM - 8PM)</option>
              </select>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={
                  !formData.startDate ||
                  !formData.endDate ||
                  !formData.deliveryTime
                }
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MealDetailsForm4;
export { MealDetailsForm4 };
