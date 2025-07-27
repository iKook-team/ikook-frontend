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
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

      {!isCustomBooking && (
        <header className="absolute left-0 top-0">
          <h1 className="text-black text-xl font-medium leading-[30px] w-[126px] h-[30px]">
            {menu?.chef?.first_name && menu?.chef?.last_name
              ? `${menu.chef.first_name} ${menu.chef.last_name}`
              : "Chef"}
          </h1>
        </header>
      )}

      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>

      {!isCustomBooking && (
        <div className="absolute left-5 right-5 top-[132px] w-auto">
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

      <div className="absolute left-5 top-[291px]">
        <svg
          width="613"
          height="1"
          viewBox="0 0 613 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-0.00390625 0.5L613.003 0.5" stroke="#E7E7E7" />
        </svg>
      </div>

      <section className="absolute left-5 top-[307px] w-[613px]">
        <h2 className="text-black text-2xl font-medium leading-8 w-[200px] h-8 mb-[47px]">
          Event Details
        </h2>
        <form
          className="flex flex-col flex-1 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleContinue();
          }}
        >
          <label
            htmlFor="eventType"
            className="text-[#344054] text-sm font-medium leading-none mb-2"
          >
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={(e) => handleInputChange("eventType", e.target.value)}
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none"
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday Party</option>
            <option value="corporate">Corporate Event</option>
            <option value="anniversary">Anniversary</option>
            <option value="graduation">Graduation</option>
          </select>
          <div className="mb-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Cuisines
              </label>
              <div className="border border-gray-300 rounded-md p-2 min-h-[45px]">
                <div className="w-full">
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
              </div>
            </div>
          </div>
        </form>
      </section>

      <div className="absolute left-5 top-[720px]">
        <svg
          width="613"
          height="2"
          viewBox="0 0 613 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1L613.007 1" stroke="#E7E7E7" />
        </svg>
      </div>

      <div className="absolute left-[357px] top-[772px]">
        <ActionButtons
          onBack={onBack}
          onContinue={handleContinue}
          continueDisabled={
            !formData.eventType || formData.preferredCuisines.length === 0
          }
        />
      </div>
    </main>
  );
};

export default EventDetailsForm2;
export { EventDetailsForm2 };
