import React from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { ChefCard } from "@/components/cart/chef-card";
import { TagSelector } from "@/components/ui/tag-selector";

interface EventDetailsForm2Props {
  onNext: (data: EventFormData) => void;
  onBack: () => void;
  menu: any;
  formData: EventFormData;
  onChange: (data: EventFormData) => void;
  isCustomBooking?: boolean;
}

export interface EventFormData {
  eventType: string;
  preferredCuisines: string[];
}

// Get cuisine options from the menu or use default options
const getCuisineOptions = (menu: any) => {
  // Check if menu has cuisine options
  if (menu?.cuisines?.length > 0) {
    return menu.cuisines.map((c: any) => c.name || c);
  }

  // Default cuisine options
  return [
    "Italian",
    "African",
    "Chinese",
    "Pastries",
    "French",
    "English",
    "Spicy Mediterranean",
    "Pizza",
  ];
};

const EventDetailsForm2: React.FC<EventDetailsForm2Props> = ({
  onNext,
  onBack,
  menu,
  formData,
  onChange,
  isCustomBooking = false,
}) => {
  const progressSteps = [
    { label: "Event Details", completed: true, inProgress: true },
    { label: "Budget", completed: false },
    { label: "Message", completed: false },
  ];

  // Get cuisine options based on menu
  const cuisineOptions = React.useMemo(() => getCuisineOptions(menu), [menu]);

  // Debug log to check available cuisines and menu
  console.log("Menu data:", menu);
  console.log("Available cuisines in component:", cuisineOptions);

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    console.log("Field changed:", field, "New value:", value);
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
              rating={
                menu?.chef?.average_rating
                  ? menu.chef.average_rating.toFixed(1)
                  : "-"
              }
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              {/** Use TagSelector for single-select Event Type. We coerce to a single value. */}
              <TagSelector
                label=""
                tags={["Naming", "Gathering", "Wedding"]}
                selectedTags={formData.eventType ? [formData.eventType] : []}
                onTagsChange={(newTags) => {
                  const prev = formData.eventType ? [formData.eventType] : [];
                  let next = "";
                  if (newTags.length === 0) {
                    next = ""; // deselect
                  } else if (newTags.length === 1 && prev.length === 0) {
                    next = newTags[0]; // first select
                  } else if (newTags.length === 2 && prev.length === 1) {
                    // picked a different tag; choose the one that's not the previous
                    next = newTags.find((t) => t !== prev[0]) || newTags[0];
                  } else {
                    // fallback: keep the last item as the intended single select
                    next = newTags[newTags.length - 1];
                  }
                  handleInputChange("eventType", next);
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Cuisines
              </label>
              <TagSelector
                key={`cuisine-selector-${cuisineOptions.length}`}
                label=""
                tags={cuisineOptions}
                selectedTags={formData.preferredCuisines || []}
                onTagsChange={(tags) =>
                  handleInputChange("preferredCuisines", tags)
                }
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <ActionButtons
                onBack={onBack}
                onContinue={handleContinue}
                continueDisabled={
                  !formData.eventType || formData.preferredCuisines.length === 0
                }
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EventDetailsForm2;
export { EventDetailsForm2 };
