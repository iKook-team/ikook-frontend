import React, { useState } from "react";
import Image from "next/image";

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
}

export const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    location: "Lagos, Nigeria",
    eventDate: "28/08/2023",
    guests: 40,
  });

  const handleInputChange = (field: keyof EventFormData, value: string | number) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const availableCuisines = [
    "African",
    "Modern English",
    "Italian",
    "French",
    "Asian",
    "Mediterranean",
    "Mexican",
    "Indian",
  ];

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedCuisines(selected);
  };

  const removeCuisine = (cuisineToRemove: string) => {
    setSelectedCuisines(
      selectedCuisines.filter((cuisine) => cuisine !== cuisineToRemove),
    );
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
                  htmlFor="location"
                  className="text-[#344054] text-sm font-medium leading-none"
                >
                  Location
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      handleInputChange("location", e.target.value);
                    }}
                    className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="Enter location"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-full w-full">
            <div className="w-full max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <label
                  htmlFor="eventDate"
                  className="text-[#344054] text-sm font-medium leading-none"
                >
                  Event Date
                </label>
                <div className="relative w-full">
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      handleInputChange("eventDate", e.target.value);
                    }}
                    className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-full w-full">
            <div className="w-full max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <label
                  htmlFor="guests"
                  className="text-[#344054] text-sm font-medium leading-none"
                >
                  Guests
                </label>
                <div className="relative w-full">
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    min="40"
                    step="1"
                    value={formData.guests}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      handleInputChange(
                        "guests",
                        parseInt(e.target.value, 10) || 40
                      );
                    }}
                    className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="40 (minimum)"
                  />
                </div>
              </div>
            </div>
          </div>

          {formData.guests < 40 && (
            <div className="flex w-full flex-col text-xs text-[#3F3E3D] font-normal leading-5 justify-center bg-[#FFFCF5] mt-6 px-5 py-4 rounded-lg max-md:max-w-full">
              <div className="flex items-center gap-3">
                <Image
                  width={20}
                  height={20}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/75d3ec646f092868067adae007d588e6b96a5773?placeholderIfAbsent=true"
                  alt="payment icon"
                  className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                />
                <div className="text-[#3F3E3D] self-stretch my-auto">
                  Minimum number of guests for booking this chef is{" "}
                  <span className="font-semibold text-sm leading-5">40</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full justify-between items-center mt-8 text-base font-semibold whitespace-nowrap">
            <button
              type="button"
              className="px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-5 py-3 text-white bg-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-500 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default EventDetailsForm;
