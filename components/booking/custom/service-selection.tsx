"use client";
import * as React from "react";

import { ServiceCard } from "./service-card";

interface ServiceSelectionProps {
  onNext: (data?: Record<string, any>) => void;
  onBack: () => void;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  onNext,
  onBack,
}) => {
  const services = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3401a0546ac1f09aa210faddfa300ccfaac8de9b?placeholderIfAbsent=true",
      title: "Chef at home",
      description: "Hire the best private chef for your mini event",
      titleAlignment: "left" as const,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/979638d451296043ed838c953bfad548df06d5b9?placeholderIfAbsent=true",
      title: "Large event",
      description:
        "Events with more than 40 people here is the service for you",
      titleAlignment: "center" as const,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d814b6ccd4aaae4a49147f3e5d57c1c0f1ec466b?placeholderIfAbsent=true",
      title: "Meal Prep",
      description: "Hire a chef to cook for you weekly/monthly at a go",
      titleAlignment: "left" as const,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/683179e13a90b06aafeaad7fe0487faaefeaaee3?placeholderIfAbsent=true",
      title: "Gormet Delivery",
      description: "Won't be home, Our chefs can deliver your meals",
      titleAlignment: "left" as const,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/8f117432ee94e00d1b1bb09f5f5a358007ae4263?placeholderIfAbsent=true",
      title: "Fine Dining",
      description: "Have a taste of the best cuisines",
      titleAlignment: "center" as const,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f78f0c9ba2bbc2b46e7ac7bb6a4aa25ae0f631a2?placeholderIfAbsent=true",
      title: "Corporate Dining",
      description: "We can serve corporations with the best dining experience",
      titleAlignment: "left" as const,
    },
  ];

  const [selectedService, setSelectedService] = React.useState<string | null>(
    null
  );

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  const handleContinue = () => {
    if (selectedService) {
      onNext({ service: selectedService });
    } else {
      alert("Please select a service to continue");
    }
  };

  return (
    <section className="w-full max-w-[654px] mx-auto bg-white rounded-2xl border border-solid shadow-lg border-gray-200 p-5 sm:p-12 my-8">
      <div className="w-full max-w-[394px] mx-auto">
        <h1 className="text-2xl font-bold text-center text-black mb-10">
          What service would you like?
        </h1>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceSelect(service.title)}
              className={`cursor-pointer transition-all duration-200 ${selectedService === service.title ? "ring-2 ring-amber-400 rounded-lg" : ""}`}
            >
              <ServiceCard
                imageSrc={service.imageSrc}
                title={service.title}
                description={service.description}
                titleAlignment={service.titleAlignment}
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
