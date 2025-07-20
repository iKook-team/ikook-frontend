import React, { useState } from "react";

import { CartHeader } from "@/components/cart/cart-header";
import { ChefCard } from "@/components/cart/chef-card";

interface EventDetailsFormProps {
  onNext: (data: EventFormData) => void;
  onBack: () => void;
}

export interface EventFormData {
  location: string;
  eventDate: string;
  guests: number;
  eventTime?: string;
  venue?: string;
}

export const EventDetailsForm3: React.FC<EventDetailsFormProps> = ({
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    location: "Lagos, Nigeria",
    eventDate: "28/08/2023",
    guests: 40,
    eventTime: "",
    venue: "",
  });

  const handleInputChange = (field: keyof EventFormData, value: string | number) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
  };

  const venueOptions = [
    {
      id: "home",
      value: "home",
      label: "Home",
    },
    {
      id: "relative",
      value: "relative",
      label: "Relative/Friend Home",
    },
    {
      id: "rented",
      value: "rented",
      label: "Rented Venue",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <main className="flex max-w-[655px] flex-col items-stretch">
      <CartHeader title="Event Details" />

      <form
        className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-stretch bg-white mt-2 py-[33px] rounded-[15px] border-solid max-md:max-w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col items-stretch px-[19px] max-md:max-w-full max-md:pr-5">
          <ChefCard
            chefName="Chef Titilayo John"
            dishName="Braised Chicken With Lemon and Olives"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/231d86006c0dab5ed39c08a8a310d23841a29a6f?placeholderIfAbsent=true"
            location="London"
            locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
            rating="4.6"
            ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
            reviewCount="(23 Reviews)"
          />

          <div className="mt-6 max-w-full w-full">
            <div className="w-full max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <label
                  htmlFor="event-time"
                  className="text-[#344054] text-sm font-medium leading-none"
                >
                  Event Time
                </label>
                <div className="relative w-full">
                  <input
                    className="w-full border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-[#101828] text-base font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg outline-none"
                    id="event-time"
                    onChange={(e) =>
                      handleInputChange("eventTime", e.target.value)
                    }
                    required
                    type="time"
                    value={formData.eventTime}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-full w-full">
            <div className="w-full max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <h3 className="text-[#344054] text-sm font-medium leading-none block mb-2">
                  Venue
                </h3>
                <div className="space-y-3">
                  {venueOptions.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        checked={formData.venue === option.value}
                        className="h-4 w-4 text-amber-500 border-gray-300 focus:ring-amber-500"
                        id={option.id}
                        name="venue"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
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
            </div>
          </div>

          <div className="flex w-full justify-between items-center mt-8 text-base font-semibold whitespace-nowrap">
            <button
              className="px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              type="button"
            >
              Back
            </button>
            <button
              className="px-5 py-3 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-500 transition-colors"
              type="submit"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default EventDetailsForm3;
