import React, { useState } from "react";

import { ProgressIndicator } from "./progress-indicator";
import { ActionButtons } from "./action-buttons";

import { GooglePlacesAutocomplete } from "@/components/ui/google-places-autocomplete";
import { ChefCard } from "@/components/cart/chef-card";

interface EatingCoachFormProps {
  onNext: (data: EatingCoachFormData) => void;
  onBack: () => void;
}

export interface EatingCoachFormData {
  location: string;
  hours: number;
  service: string;
  eventDate: string;
  guests: number;
  frequency: string;
}

const serviceOptions = ["Weight Loss", "Meal Planning", "Nutrition"];
const frequencyOptions = ["Once Only", "Weekly", "Monthly"];

const EatingCoachForm: React.FC<EatingCoachFormProps> = ({
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<EatingCoachFormData>({
    location: "",
    hours: 1,
    service: "Weight Loss",
    eventDate: "",
    guests: 1,
    frequency: "Once Only",
  });

  const progressSteps = [
    { label: "Booking Details", completed: true, inProgress: true },
    { label: "Preferences", completed: false },
    { label: "Message", completed: false },
  ];

  const handleInputChange = (field: keyof EatingCoachFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleContinue = () => {
    onNext(formData);
  };

  return (
    <main className="w-[655px] h-[1000px] absolute left-[393px] top-[177px]">
      <div className="w-[654px] h-[960px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white rounded-[15px] border-solid border-[#E7E7E7] left-px top-[38px]" />

      <header className="absolute left-0 top-0">
        <h1 className="text-black text-xl font-medium leading-[30px] whitespace-nowrap w-auto h-[30px]">
          Eating Coach
        </h1>
      </header>

      <div className="absolute left-5 top-[69px]">
        <ProgressIndicator steps={progressSteps} />
      </div>

      <div className="absolute left-5 top-[132px]">
        <ChefCard
          chefName="Coach Jane Doe"
          dishName="Personalized Nutrition Guidance"
          imageUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/231d86006c0dab5ed39c08a8a310d23841a29a6f?placeholderIfAbsent=true"
          location="London"
          locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
          rating="4.9"
          ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
          reviewCount="(12 Reviews)"
        />
      </div>

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
          Booking Details
        </h2>

        <form
          className="flex flex-col flex-1 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleContinue();
          }}
        >
          {/* Location Field */}
          <div className="mb-6">
            <GooglePlacesAutocomplete
              value={formData.location}
              onChange={(city) => handleInputChange("location", city)}
              placeholder="Enter city"
              label="Location"
              required
              className="w-full"
            />
          </div>

          {/* Service Selection */}
          <label
            htmlFor="service"
            className="text-[#344054] text-sm font-medium leading-none mb-2"
          >
            Service
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={(e) => handleInputChange("service", e.target.value)}
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500"
            required
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Hours */}
          <label
            htmlFor="hours"
            className="text-[#344054] text-sm font-medium leading-none mb-2"
          >
            Number of hours
          </label>
          <input
            type="number"
            id="hours"
            name="hours"
            min="1"
            value={formData.hours}
            onChange={(e) =>
              handleInputChange("hours", parseInt(e.target.value, 10) || 1)
            }
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Enter number of hours"
            required
          />

          {/* Event Date */}
          <label
            htmlFor="eventDate"
            className="text-[#344054] text-sm font-medium leading-none mb-2"
          >
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={(e) => handleInputChange("eventDate", e.target.value)}
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500"
            required
          />

          {/* Number of Guests */}
          <label
            htmlFor="guests"
            className="text-[#344054] text-sm font-medium leading-none mb-2"
          >
            Number of guests
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={(e) =>
              handleInputChange("guests", parseInt(e.target.value, 10) || 1)
            }
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Enter number of guests"
            required
          />

          {/* Frequency */}
          <label
            htmlFor="frequency"
            className="text-[#344054] text-sm font-medium leading-none mb-2"
          >
            Frequency
          </label>
          <select
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={(e) => handleInputChange("frequency", e.target.value)}
            className="border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-base text-[#101828] font-normal bg-white mb-6 px-3.5 py-2.5 rounded-lg border-solid focus:outline-none focus:ring-1 focus:ring-amber-500"
            required
          >
            {frequencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </form>
      </section>

      <div className="absolute left-5 top-[900px]">
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

      <div className="absolute left-[357px] top-[920px]">
        <ActionButtons
          onBack={onBack}
          onContinue={handleContinue}
          continueDisabled={
            !formData.location ||
            formData.hours < 1 ||
            !formData.service ||
            !formData.eventDate ||
            formData.guests < 1 ||
            !formData.frequency
          }
        />
      </div>
    </main>
  );
};

export default EatingCoachForm;
export { EatingCoachForm };
