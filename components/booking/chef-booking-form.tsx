"use client";

import React, { useState } from "react";

import { ChefProfileCard } from "./chef-profile-card";
import { EventDetailsForm, EventFormData } from "./event-details-form";
import { NavigationButtons } from "./navigation-buttons";
import { ProgressIndicator } from "@/components/ui/progress-indicator";

export const ChefBookingForm: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    location: "Lagos, Nigeria",
    eventDate: "28/08/2023",
    guests: 40,
  });

  const progressSteps = [
    { label: "Event Details", completed: true },
    { label: "Budget", completed: true },
    { label: "Details and Message", completed: true },
  ];

  const chefData = {
    name: "Chef Titilayo",
    image:
      "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2519ad68400128f1fb9c68f364b8cc6504d27b05?placeholderIfAbsent=true",
    location: "London",
    rating: 4.6,
    reviewCount: 23,
    cuisines: 5,
    capacity: "40+ People",
  };

  const handleBack = () => {
    console.log("Going back...");
  };

  const handleFormChange = (data: EventFormData) => {
    setFormData(data);
  };

  const handleContinue = () => {
    if (formData.guests < 40) {
      alert("Minimum number of guests is 40");
      return;
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full">
      <header>
        <h1 className="text-black text-xl font-medium">Chef Titilayo</h1>
      </header>

      <section className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-stretch bg-white mt-2 py-8 rounded-[15px] border-solid">
        <div className="flex w-full flex-col items-stretch px-[19px] max-md:max-w-full max-md:pr-5">
          <ProgressIndicator steps={progressSteps} />

          <ChefProfileCard {...chefData} />

          <div className="text-black text-2xl font-medium leading-none mt-9">
            Event Details
          </div>

          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/46c8b21cf0d7b2f8b159fb09d61c3f987e263a20?placeholderIfAbsent=true"
            alt="Divider"
            className="aspect-[500] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-1 max-md:max-w-full"
          />

          <EventDetailsForm onFormChange={handleFormChange} />

          <hr className="w-full stroke-[1px] stroke-[#E7E7E7] mt-[231px] max-md:max-w-full max-md:mt-10 border-[#E7E7E7]" />
          
          <NavigationButtons
            onBack={handleBack}
            onContinue={handleContinue}
            canContinue={formData.guests > 0}
          />
        </div>
      </section>
    </div>
  );
};
