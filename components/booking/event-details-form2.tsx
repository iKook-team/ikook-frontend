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
  eventType?: string;
}

export const EventDetailsForm2: React.FC<EventDetailsFormProps> = ({
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    location: "Lagos, Nigeria",
    eventDate: "28/08/2023",
    guests: 40,
    eventType: "",
  });

  const handleInputChange = (
    field: keyof EventFormData,
    value: string | number,
  ) => {
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
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
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
                <div className="items-center border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#101828] font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full">
                  <div className="relative w-full">
                    <select
                      aria-label="Location"
                      className="text-[#101828] w-full self-stretch flex-1 shrink basis-[0%] min-w-60 gap-2 my-auto max-md:max-w-full bg-transparent border-none outline-none"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    >
                      <option value="">Select a location</option>
                      <option value="Lagos, Nigeria">Lagos, Nigeria</option>
                      <option value="Abuja, Nigeria">Abuja, Nigeria</option>
                      <option value="Port Harcourt, Nigeria">
                        Port Harcourt, Nigeria
                      </option>
                    </select>
                  </div>
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
                <div className="items-center border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#101828] font-normal whitespace-nowrap flex-wrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full">
                  <div className="relative w-full">
                    <select
                      aria-label="Event date"
                      className="text-[#101828] w-full self-stretch flex-1 shrink basis-[0%] min-w-60 gap-2 my-auto max-md:max-w-full bg-transparent border-none outline-none"
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange("eventDate", e.target.value)}
                    >
                      <option value="">Select a date</option>
                      <option value="28/08/2023">28/08/2023</option>
                      <option value="29/08/2023">29/08/2023</option>
                      <option value="30/08/2023">30/08/2023</option>
                    </select>
                  </div>
                  <Image
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d3ae61d330e0cd7d8060dfcaa4f95eb302335845?placeholderIfAbsent=true"
                    alt="Calendar icon"
                    width={16}
                    height={16}
                    className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
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
                <div className="relative items-center border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#101828] font-normal flex-wrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full">
                  <select
                    aria-label="Number of guests"
                    className="text-[#101828] self-stretch flex-1 shrink basis-[0%] min-w-60 gap-2 my-auto max-md:max-w-full bg-transparent border-none outline-none appearance-none pr-8"
                    value={formData.guests}
                    onChange={(e) =>
                      handleInputChange(
                        "guests",
                        parseInt(e.target.value) || 40,
                      )
                    }
                  >
                    {[40, 50, 60, 70, 80, 90, 100].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 40 ? "guests (minimum)" : "guests"}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
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

          <div className="mt-6 max-w-full w-full">
            <div className="w-full max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <label
                  htmlFor="event-type"
                  className="text-[#344054] text-sm font-medium leading-none"
                >
                  Event Type
                </label>
                <div className="relative items-center border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#101828] font-normal flex-wrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full">
                  <select
                    aria-label="Event type"
                    className="text-[#101828] self-stretch flex-1 shrink basis-[0%] min-w-60 gap-2 my-auto max-md:max-w-full bg-transparent border-none outline-none appearance-none pr-8"
                    value={formData.eventType}
                    onChange={(e) => handleInputChange("eventType", e.target.value)}
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="graduation">Graduation</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-full w-full">
            <div className="w-full max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <label
                  className="text-[#344054] text-sm font-medium leading-none block mb-1.5"
                  htmlFor="cuisines"
                >
                  Preferred Cuisines
                </label>
                <div className="relative">
                  <div className="flex flex-wrap gap-2 items-center min-h-[44px] w-full border border-[#D0D5DD] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg text-base text-[#101828]">
                    {selectedCuisines.length > 0 ? (
                      selectedCuisines.map((cuisine) => (
                        <div
                          key={cuisine}
                          className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                        >
                          {cuisine}
                          <button
                            className="ml-2 text-gray-500 hover:text-gray-700"
                            aria-label={`Remove ${cuisine}`}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCuisine(cuisine);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400">Select cuisines</span>
                    )}
                    <select
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="cuisines"
                      onChange={handleCuisineChange}
                      value=""
                    >
                      <option value="" disabled>
                        Select a cuisine
                      </option>
                      {availableCuisines
                        .filter((cuisine) => !selectedCuisines.includes(cuisine))
                        .map((cuisine) => (
                          <option key={cuisine} value={cuisine}>
                            {cuisine}
                          </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg
                        className="text-gray-500"
                        fill="none"
                        height="8"
                        viewBox="0 0 12 8"
                        width="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.5L6 6.5L11 1.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-full w-full">
            <div className="w-full max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <label
                  htmlFor="cuisine"
                  className="text-[#344054] text-sm font-medium leading-none"
                >
                  Cuisine
                </label>
                <div className="relative items-center border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-[#101828] font-normal flex-wrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full">
                  <select
                    value=""
                    onChange={handleCuisineChange}
                    className="text-[#101828] self-stretch flex-1 shrink basis-[0%] min-w-60 gap-2 my-auto max-md:max-w-full bg-transparent border-none outline-none appearance-none pr-8"
                    aria-label="Select cuisine type"
                  >
                    <option value="">Select cuisine type</option>
                    <option value="nigerian">Nigerian</option>
                    <option value="italian">Italian</option>
                    <option value="chinese">Chinese</option>
                    <option value="mexican">Mexican</option>
                    <option value="indian">Indian</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-500"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between items-center mt-8 text-base font-semibold whitespace-nowrap">
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-3 text-amber-400 rounded-lg border border-solid shadow-sm border-[color:var(--Primary,#FCC01C)] w-[150px] hover:bg-amber-50 transition-colors"
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

export default EventDetailsForm2;
