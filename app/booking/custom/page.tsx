"use client";

import React, { useState } from "react";

import { ChefFinderCard } from "@/components/booking/custom/chef-finder-card";
import { ServiceSelection } from "@/components/booking/custom/service-selection";

type BookingStep = "chef-finder" | "service-selection";

const CustomBookingPage = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>("chef-finder");
  const [bookingData, setBookingData] = useState<Record<string, any>>({});

  const handleNext = (data?: Record<string, any>) => {
    if (data) {
      setBookingData((prev) => ({ ...prev, ...data }));
    }
    const steps: BookingStep[] = ["chef-finder", "service-selection"];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: BookingStep[] = ["chef-finder", "service-selection"];
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
      default:
        return <ChefFinderCard onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-2 py-4 sm:px-4 lg:px-6">
      <div className="w-full max-w-4xl">{renderStep()}</div>
    </div>
  );
};

export default CustomBookingPage;
