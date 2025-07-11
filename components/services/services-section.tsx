"use client";

import React, { useState } from "react";

import { ServiceToggle } from "./service-toggle";

const services = [
  { name: "Chef at home", defaultActive: true },
  { name: "Fine dining", defaultActive: true },
  { name: "Large event", defaultActive: false },
  { name: "Meal prep", defaultActive: false },
  { name: "Gormet delivery", defaultActive: false },
  { name: "Cooking class", defaultActive: false },
  { name: "Corporate dining", defaultActive: false },
  { name: "Healthy eating coach", defaultActive: false },
];

export const ServicesSection: React.FC = () => {
  const [activeServices, setActiveServices] = useState<Record<string, boolean>>(
    services.reduce(
      (acc, service) => ({
        ...acc,
        [service.name]: service.defaultActive,
      }),
      {}
    )
  );

  const handleServiceToggle = (serviceName: string, isActive: boolean) => {
    setActiveServices((prev) => ({
      ...prev,
      [serviceName]: isActive,
    }));
  };

  return (
    <section className="self-center flex w-[538px] max-w-full flex-col items-stretch mt-[35px]">
      <h2 className="text-black text-2xl font-semibold leading-none">
        Services
      </h2>
      <div className="mt-[35px] max-md:max-w-full">
        {services.map((service, index) => (
          <div key={service.name} className={index > 0 ? "mt-8" : ""}>
            <ServiceToggle
              serviceName={service.name}
              isActive={activeServices[service.name]}
              onToggle={handleServiceToggle}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
