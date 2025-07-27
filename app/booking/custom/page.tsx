"use client";

import React, { useState } from "react";

import { ChefFinderCard } from "@/components/booking/custom/chef-finder-card";
import { ServiceSelection } from "@/components/booking/custom/service-selection";
import { EventDetailsForm } from "@/components/booking/custom/event-details-form";
import { BudgetForm } from "@/components/booking/custom/budget-form";
import { PreferencesForm } from "@/components/booking/custom/preferences";
import { HobSelectionForm } from "@/components/booking/custom/hob-selection-form";
import { MessagesForm } from "@/components/booking/custom/message-form";
import { StatusCard } from "@/components/booking/status-card";

type BookingStep =
  | "chef-finder"
  | "service-selection"
  | "event-details"
  | "budget"
  | "preferences"
  | "hob-selection"
  | "messages"
  | "status";

const CustomBookingPage = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>("chef-finder");
  const [bookingData, setBookingData] = useState<Record<string, any>>({});

  const handleNext = (data?: Record<string, any>) => {
    if (data) {
      setBookingData((prev) => ({ ...prev, ...data }));
    }

    const steps: BookingStep[] = [
      "chef-finder",
      "service-selection",
      "event-details",
      "budget",
      "preferences",
      "hob-selection",
      "messages",
      "status",
    ];

    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: BookingStep[] = [
      "chef-finder",
      "service-selection",
      "event-details",
      "budget",
      "preferences",
      "hob-selection",
      "messages",
      "status",
    ];

    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "chef-finder":
        return <ChefFinderCard onNext={handleNext} />;
      case "service-selection":
        return (
          <ServiceSelection
            onNext={handleNext}
            onBack={handleBack}
            isCustomBooking={true}
          />
        );
      case "event-details":
        return <EventDetailsForm onNext={handleNext} onBack={handleBack} />;
      case "budget":
        return <BudgetForm onNext={handleNext} onBack={handleBack} />;
      case "preferences":
        return <PreferencesForm onNext={handleNext} onBack={handleBack} />;
      case "hob-selection":
        return <HobSelectionForm onNext={handleNext} onBack={handleBack} />;
      case "messages":
        return <MessagesForm onNext={handleNext} onBack={handleBack} />;
      case "status":
        return <StatusCard />;
      default:
        return <ChefFinderCard onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      {renderStep()}
    </div>
  );
};

export default CustomBookingPage;
