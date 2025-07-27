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
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

      {!isCustomBooking && (
        <header className="absolute left-0 top-0">
          <h1 className="text-black text-xl font-medium leading-[30px] w-[300px] h-[30px] truncate">
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
        <div className="absolute left-5 top-[132px] w-full pr-5">
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
            htmlFor="eventTime"
            className="text-[#344054] text-sm font-medium leading-none mb-2"
          >
            Event Time
          </label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            value={formData.eventTime}
            onChange={(e) => handleInputChange("eventTime", e.target.value)}
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Select event time"
          />
          <h3 className="text-[#344054] text-sm font-medium leading-none block mb-2">
            Venue
          </h3>
          <div className="space-y-3 mb-6">
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
          continueDisabled={!formData.eventTime || !formData.venue}
        />
      </div>
    </main>
  );
};

export default EventDetailsForm3;
export { EventDetailsForm3 };
