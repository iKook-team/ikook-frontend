"use client";
import * as React from "react";

import { ServiceCard } from "./service-card";

interface ServiceSelectionProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
  isCustomBooking?: boolean;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  onNext,
  onBack,
  isCustomBooking = false,
}) => {
  const services = [
    {
      imageSrc: "/chef-at-home.png",
      title: "Chef at Home",
    },
    {
      imageSrc: "/large-event.png",
      title: "Large Event",
    },
    {
      imageSrc: "/meal-prep.png",
      title: "Meal Prep",
    },
    {
      imageSrc: "/meal-delivery.png",
      title: "Meal Delivery",
    },
    {
      imageSrc: "/fine-dining.png",
      title: "Fine Dining",
    },
    {
      imageSrc: "/corporate-dining.png",
      title: "Corporate Dining",
    },
  ];

  const [selectedService, setSelectedService] = React.useState<string | null>(
    null,
  );

  const handleServiceSelect = (serviceTitle: string) => {
    if (isCustomBooking) {
      // For custom booking, navigate directly to the service's booking page
      const servicePath = serviceTitle.toLowerCase().replace(/\s+/g, "-");

      window.location.href = `/booking/${servicePath}?is_custom=true`;
    } else {
      setSelectedService(serviceTitle);
    }
  };

  const handleContinue = () => {
    if (isCustomBooking) {
      onNext({
        service: selectedService,
        is_custom: isCustomBooking,
      });
    } else {
      alert("Please select a service to continue");
    }
  };

  return (
    <section className="w-full max-w-[654px] md:max-w-[1000px] mx-auto bg-white rounded-2xl border border-solid shadow-lg border-gray-200 p-4 sm:p-12 my-8">
      <div className="w-full max-w-[394px] md:max-w-[900px] mx-auto">
        <h1 className="text-2xl font-bold text-center text-black mb-10">
          What service would you like?
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 justify-items-center">
          {services.map((service, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => handleServiceSelect(service.title)}
              className={`cursor-pointer transition-all duration-200 w-full ${selectedService === service.title ? "ring-2 ring-amber-400 rounded-lg" : ""}`}
            >
              <ServiceCard
                imageSrc={service.imageSrc}
                title={service.title}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-16 text-base font-semibold">
          <button
            onClick={onBack}
            className="px-5 py-3 text-amber-400 rounded-lg border border-amber-300 hover:bg-amber-50 transition-colors w-[150px]"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedService}
            className={`px-5 py-3 text-white rounded-lg border transition-colors w-[150px] ${
              selectedService
                ? "bg-amber-400 border-amber-400 hover:bg-amber-500"
                : "bg-gray-300 border-gray-300 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};
