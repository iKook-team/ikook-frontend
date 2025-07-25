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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{chefData.name}</h1>
      </header>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-8">
          {/* Progress Indicator */}
          <div className="px-2">
            <ProgressIndicator steps={progressSteps} />
          </div>

          {/* Chef Profile Card */}
          <div className="border-b border-gray-100 pb-6">
            <ChefProfileCard {...chefData} />
          </div>

          {/* Event Details Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
              <div className="h-px bg-gray-200 mt-2" />
            </div>

            <EventDetailsForm 
              onNext={handleFormChange} 
              onBack={() => {}} 
              formData={formData}
              onChange={handleFormChange}
              menu={{ num_of_guests: 1 }}
            />
          </div>
          
          {/* Navigation Buttons */}
          <div className="pt-6 border-t border-gray-100">
            <NavigationButtons
              onBack={handleBack}
              onContinue={handleContinue}
              canContinue={formData.guests > 0}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
