import React, { useState } from "react";
import Image from "next/image";
import { ProgressIndicator } from './progress-indicator';
import { ChefCard } from "@/components/cart/chef-card";
import { ActionButtons } from './action-buttons';

interface EventDetailsFormProps {
  onNext: (data: EventFormData) => void;
  onBack: () => void;
  menu: any; // Accept menu as a prop
  formData: EventFormData;
  onChange: (data: EventFormData) => void;
}

export interface EventFormData {
  location: string;
  eventDate: string;
  guests: number;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({ onNext, onBack, menu, formData, onChange }) => {
  const minGuests = menu?.num_of_guests || 1;

  const progressSteps = [
    { label: 'Event Details', completed: true, inProgress: true },
    { label: 'Preferences', completed: false },
    { label: 'Message', completed: false }
  ];

  const handleInputChange = (field: keyof EventFormData, value: string | number) => {
    onChange({ ...formData, [field]: value });
  };

  const handleContinue = () => {
    onNext(formData);
  };

  return (
    <main className="w-[655px] h-[852px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[814px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

      <header className="absolute left-0 top-0">
        <h1 className="text-black text-xl font-medium leading-[30px] w-[300px] h-[30px] truncate">
          {menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
        </h1>
      </header>

      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>

      <div className="absolute left-5 right-5 top-[132px] w-auto">
        <ChefCard
          chefName={menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
          dishName={menu?.name || "Menu"}
          imageUrl={menu?.images && menu.images.length > 0 && menu.images[0].image ? menu.images[0].image : "/menus/menu1.png"}
          location={menu?.chef?.city || "Unknown"}
          locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
          rating={menu?.chef?.average_rating ? menu.chef.average_rating.toFixed(1) : "-"}
          ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
          reviewCount={menu?.chef?.num_reviews ? `(${menu.chef.num_reviews} Reviews)` : "(0 Reviews)"}
        />
      </div>

      <div className="absolute left-5 top-[291px]">
        <svg width="613" height="1" viewBox="0 0 613 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-0.00390625 0.5L613.003 0.5" stroke="#E7E7E7"></path>
        </svg>
      </div>

      <section className="absolute left-5 top-[307px] w-[613px]">
        <h2 className="text-black text-2xl font-medium leading-8 w-[200px] h-8 mb-[47px]">
          Event Details
        </h2>
        <form className="flex flex-col flex-1 w-full" onSubmit={e => { e.preventDefault(); handleContinue(); }}>
          <label htmlFor="location" className="text-[#344054] text-sm font-medium leading-none mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Enter location"
          />
          <label htmlFor="eventDate" className="text-[#344054] text-sm font-medium leading-none mb-2">Event Date</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={(e) => handleInputChange("eventDate", e.target.value)}
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <label htmlFor="guests" className="text-[#344054] text-sm font-medium leading-none mb-2">Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            min={minGuests}
            step="1"
            value={formData.guests}
            onChange={(e) => handleInputChange("guests", parseInt(e.target.value, 10) || minGuests)}
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder={`${minGuests} (minimum)`}
          />
          {formData.guests < minGuests && (
            <div className="flex w-full flex-col text-xs text-[#3F3E3D] font-normal leading-5 justify-center bg-[#FFFCF5] mb-6 px-5 py-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Image
                  width={20}
                  height={20}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/75d3ec646f092868067adae007d588e6b96a5773?placeholderIfAbsent=true"
                  alt="payment icon"
                  className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                />
                <div className="text-[#3F3E3D] self-stretch my-auto">
                  Minimum number of guests for booking this chef is <span className="font-semibold text-sm leading-5">{minGuests}</span>
                </div>
              </div>
            </div>
          )}
        </form>
      </section>

      <div className="absolute left-5 top-[720px]">
        <svg width="613" height="2" viewBox="0 0 613 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1L613.007 1" stroke="#E7E7E7"></path>
        </svg>
      </div>

      <div className="absolute left-[357px] top-[772px]">
        <ActionButtons
          onBack={onBack}
          onContinue={handleContinue}
          continueDisabled={formData.guests < minGuests}
        />
      </div>
    </main>
  );
};

export default EventDetailsForm;
export { EventDetailsForm };
