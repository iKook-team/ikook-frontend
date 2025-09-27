import React from "react";
import Image from "next/image";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";

interface EventDetailsFormProps {
  onNext: (data: EventFormData) => void;
  onBack?: () => void; // Make onBack optional for custom booking
  menu?: any; // Make menu optional for custom booking
  formData: EventFormData;
  onChange: (data: EventFormData) => void;
  isCustomBooking?: boolean;
}

export interface EventFormData {
  location: string;
  eventDate: string;
  guests: number;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  onNext,
  onBack,
  menu,
  formData,
  onChange,
  isCustomBooking = false,
}) => {
  const minGuests = menu?.num_of_guests || 1;

  const progressSteps = [
    { label: "Event Details", completed: true, inProgress: true },
    { label: "Preferences", completed: false },
    { label: "Message", completed: false },
  ];

  const handleInputChange = (
    field: keyof EventFormData,
    value: string | number,
  ) => {
    onChange({ ...formData, [field]: value });
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
    <div className="flex justify-center items-start p-2 sm:p-4 lg:p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-gray-100">
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
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
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
        <section className="p-4 sm:p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Event Details
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter location"
                required
              />
            </div>

            <div>
              <label
                htmlFor="eventDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleInputChange("eventDate", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Number of Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                min={minGuests}
                step="1"
                value={formData.guests}
                onChange={(e) =>
                  handleInputChange(
                    "guests",
                    parseInt(e.target.value, 10) || minGuests,
                  )
                }
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            {formData.guests < minGuests && (
              <div className="flex w-full text-xs text-[#3F3E3D] font-normal leading-5 bg-[#FFFCF5] p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Image
                    width={20}
                    height={20}
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/75d3ec646f092868067adae007d588e6b96a5773?placeholderIfAbsent=true"
                    alt="payment icon"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <div className="text-[#3F3E3D]">
                    Minimum number of guests for booking this chef is{" "}
                    <span className="font-semibold">{minGuests}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              {/** Enable Continue only when all fields are valid */}
              {(() => {
                const isLocationValid = (formData.location || "").trim().length > 0;
                const isDateValid = (formData.eventDate || "").trim().length > 0;
                const isGuestsValid = formData.guests >= minGuests;
                const isFormValid = isLocationValid && isDateValid && isGuestsValid;
                return (
                  <ActionButtons
                    onBack={onBack}
                    onContinue={handleContinue}
                    continueDisabled={!isFormValid}
                  />
                );
              })()}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EventDetailsForm;
export { EventDetailsForm };
