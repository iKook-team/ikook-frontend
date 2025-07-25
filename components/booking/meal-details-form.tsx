import React, { useState } from "react";
import Image from "next/image";
import { ProgressIndicator } from './progress-indicator';
import { ChefCard } from "@/components/cart/chef-card";
import { ActionButtons } from './action-buttons';

interface MealDetailsFormProps {
  onNext: (data: MealFormData) => void;
  onBack: () => void;
  isCustomBooking?: boolean;
  menu?: any;
}

export interface MealFormData {
  deliveryAddress: string;
  guests: number;
  appearance: 'Weekly' | 'Monthly' | '';
}

const MealDetailsForm: React.FC<MealDetailsFormProps> = ({ 
  onNext, 
  onBack, 
  isCustomBooking = false,
  menu
}) => {
  const [formData, setFormData] = useState<MealFormData>({
    deliveryAddress: "",
    guests: 1,
    appearance: '',
  });

  const progressSteps = [
    { label: 'Meal Details', completed: true, inProgress: true },
    { label: 'Budget', completed: false },
    { label: 'Message', completed: false }
  ];

  const handleInputChange = (field: keyof MealFormData, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleContinue = () => {
    onNext(formData);
  };

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
              chefName={menu?.chef?.first_name && menu?.chef?.last_name 
                ? `${menu.chef.first_name} ${menu.chef.last_name}` 
                : "Chef"}
              dishName={menu?.name || "Menu"}
              imageUrl={menu?.images?.length > 0 ? menu.images[0].image : "/menus/menu1.png"}
              location={menu?.chef?.city || "Unknown"}
              locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
              rating={menu?.chef?.average_rating?.toFixed(1) || "-"}
              ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
              reviewCount={menu?.chef?.num_reviews ? `(${menu.chef.num_reviews} Reviews)` : "(0 Reviews)"}
            />
          </div>
        )}

        {/* Form Section */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Meal Details
          </h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter delivery address"
                required
              />
            </div>

            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                Number of People
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                value={formData.guests}
                onChange={(e) => handleInputChange("guests", parseInt(e.target.value, 10) || 1)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Appearance
              </label>
              <div className="space-y-3">
                {['Weekly', 'Monthly'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="appearance"
                      value={option}
                      checked={formData.appearance === option}
                      onChange={() => handleInputChange("appearance", option as 'Weekly' | 'Monthly')}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      required
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={!formData.deliveryAddress || !formData.appearance}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MealDetailsForm;
export { MealDetailsForm };
