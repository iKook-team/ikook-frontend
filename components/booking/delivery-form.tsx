import React, { useState } from "react";
import { ProgressIndicator } from './progress-indicator';
import { ChefCard } from "@/components/cart/chef-card";
import { TagSelector } from "@/components/ui/tag-selector";
import { ActionButtons } from './action-buttons';

interface DeliveryFormProps {
  onNext: (data: DeliveryFormData) => void;
  onBack: () => void;
  isCustomBooking?: boolean;
  menu?: any;
}

export interface DeliveryFormData {
  option: 'Physical' | 'Delivery' | '';
  days: string[];
}

const availableDays = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DeliveryForm: React.FC<DeliveryFormProps> = ({ 
  onNext, 
  onBack, 
  isCustomBooking = false,
  menu
}) => {
  const [formData, setFormData] = useState<DeliveryFormData>({
    option: '',
    days: [],
  });

  const progressSteps = [
    { label: 'Meal Details', completed: true },
    { label: 'Delivery', completed: false, inProgress: true },
    { label: 'Message', completed: false }
  ];

  const handleInputChange = (field: keyof DeliveryFormData, value: any) => {
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
            Delivery Options
          </h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Option
              </label>
              <div className="space-y-3">
                {['Physical', 'Delivery'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value={option}
                      checked={formData.option === option}
                      onChange={() => handleInputChange('option', option as 'Physical' | 'Delivery')}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      required
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.option === 'Delivery' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Delivery Days
                </label>
                <div className="mb-2">
                  <TagSelector
                    options={availableDays}
                    selected={formData.days}
                    onChange={(selected) => handleInputChange('days', selected)}
                    placeholder="Select delivery days..."
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Select at least one day for delivery
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={!formData.option || (formData.option === 'Delivery' && formData.days.length === 0)}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default DeliveryForm;
export { DeliveryForm };