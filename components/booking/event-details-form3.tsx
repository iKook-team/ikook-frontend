import React from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";

interface EventDetailsForm3Props {
  onNext: (data: EventFormData) => void;
  onBack: () => void;
  menu?: any;
  formData: EventFormData;
  onChange: (data: EventFormData) => void;
  isCustomBooking?: boolean;
}

export interface EventFormData {
  eventTime: string;
  venue: string;
}

const venueOptions = [
  { id: "home", value: "home", label: "Home" },
  { id: "relative", value: "relative", label: "Relative/Friend Home" },
  { id: "rented", value: "rented", label: "Rented Venue" },
];

const EventDetailsForm3: React.FC<EventDetailsForm3Props> = ({
  onNext,
  onBack,
  menu,
  formData,
  onChange,
  isCustomBooking = false,
}) => {
  const progressSteps = [
    { label: "Event Details", completed: true, inProgress: true },
    { label: "Preferences", completed: false },
    { label: "Message", completed: false },
  ];

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    onChange({ ...formData, [field]: value });
  };

  const handleContinue = () => {
    onNext(formData);
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
                menu?.images && menu.images.length > 0 && menu.images[0].image
                  ? menu.images[0].image
                  : "/menus/menu1.png"
              }
              location={menu?.chef?.city || "Unknown"}
              locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
              rating={menu?.chef?.average_rating ? menu.chef.average_rating.toFixed(1) : "-"}
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
          <h2 className="text-2xl font-semibold text-gray-900">Event Details</h2>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div>
              <label
                htmlFor="eventTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Time
              </label>
              <input
                type="time"
                id="eventTime"
                name="eventTime"
                value={formData.eventTime}
                onChange={(e) => handleInputChange("eventTime", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                placeholder="Select event time"
                required
              />
            </div>

            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-1">Venue</h3>
              <div className="space-y-3">
                {venueOptions.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      checked={formData.venue === option.value}
                      className="h-4 w-4 text-amber-500 border-gray-300 focus:ring-amber-500"
                      id={option.id}
                      name="venue"
                      onChange={(event) => {
                        if (event.target.checked) {
                          handleInputChange("venue", option.value);
                        }
                      }}
                      type="radio"
                    />
                    <label
                      className="ml-3 block text-sm font-medium text-gray-700"
                      htmlFor={option.id}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={!formData.eventTime || !formData.venue}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EventDetailsForm3;
export { EventDetailsForm3 };
