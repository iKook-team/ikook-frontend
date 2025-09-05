"use client";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";
import { DietaryRestrictions } from "./dietary-restrictions";

import { ChefCard } from "@/components/cart/chef-card";

interface PreferencesFormProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  menu?: any;
  formData: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
  isCustomBooking?: boolean;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({
  onNext,
  onBack,
  menu,
  formData,
  onChange,
  isCustomBooking = false,
}) => {
  const allergyDetails = formData.allergyDetails || "";
  const dietaryRestrictions = formData.dietaryRestrictions || [];

  const progressSteps = [
    { label: "Event Details", completed: true },
    { label: "Budget", completed: false, inProgress: true },
    { label: "Message", completed: false },
  ];

  const handleContinue = () => {
    onNext({ allergyDetails, dietaryRestrictions });
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
        {!isCustomBooking && menu && (
          <div className="px-6 py-4 border-b border-gray-100">
            <ChefCard
              chefName={
                menu?.chef?.first_name && menu?.chef?.last_name
                  ? `${menu.chef.first_name} ${menu.chef.last_name}`
                  : "Chef"
              }
              dishName={menu?.name || "Menu"}
              imageUrl={
                menu?.images && menu.images.length > 0 && menu.images[0].image
                  ? menu.images[0].image
                  : "/menus/menu1.png"
              }
              location={menu?.chef?.city || "Unknown"}
              locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
              rating={
                menu?.chef?.average_rating
                  ? menu.chef.average_rating.toFixed(1)
                  : "-"
              }
              ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
              reviewCount={(menu?.chef?.total_reviews || 0).toString()}
            />
          </div>
        )}

        {/* Form Section */}
        <section className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Preferences</h2>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div>
              <DietaryRestrictions
                selectedAllergies={dietaryRestrictions}
                onChange={(allergies) =>
                  onChange({ ...formData, dietaryRestrictions: allergies })
                }
              />
            </div>

            <div>
              <label
                htmlFor="allergy-details"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Give us more details about guest allergies
              </label>
              <textarea
                className="w-full overflow-hidden px-3.5 py-2.5 text-base bg-white rounded-lg border border-gray-300 shadow-sm text-neutral-700 min-h-[120px] resize-y"
                id="allergy-details"
                placeholder="Enter a description..."
                value={allergyDetails}
                onChange={(e) =>
                  onChange({ ...formData, allergyDetails: e.target.value })
                }
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={false}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PreferencesForm;
export { PreferencesForm };
