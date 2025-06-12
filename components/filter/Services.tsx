"use client";

import * as React from "react";

import { ServiceButton } from "./ServiceButton";
import { FilterButton } from "./FilterButton";

interface Service {
  id: string;
  name: string;
  category?: string;
}

const services: Service[] = [
  { id: "chef-at-home", name: "Chef at Home", category: "personal" },
  { id: "large-event", name: "Large Event", category: "event" },
  { id: "meal-prep", name: "Meal Prep", category: "personal" },
  { id: "meal-delivery", name: "Meal Delivery", category: "delivery" },
  { id: "cooking-class", name: "Cooking Class", category: "education" },
  { id: "fine-dining", name: "Fine Dining", category: "restaurant" },
  { id: "corporate-dining", name: "Corporate Dining", category: "corporate" },
  { id: "chefs", name: "CHEFS", category: "directory" },
];

export function Services() {
  const [activeService, setActiveService] = React.useState<string>("chef-at-home");
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);

  const handleServiceClick = (serviceId: string) => {
    setActiveService(serviceId);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <nav
      className="flex gap-[31px] text-base font-medium flex-wrap px-12 max-md:px-6 max-sm:px-4 py-4"
      role="navigation"
      aria-label="Chef services navigation"
    >
      <div className="flex min-w-60 gap-3 text-[#060605] flex-wrap max-md:max-w-full">
        {services.map((service) => (
          <ServiceButton
            key={service.id}
            isActive={activeService === service.id}
            onClick={() => handleServiceClick(service.id)}
            aria-pressed={activeService === service.id}
            aria-label={`Select ${service.name} service`}
          >
            {service.name}
          </ServiceButton>
        ))}
      </div>
      
      <div 
        className="aspect-[0.02] object-contain w-px stroke-[1px] stroke-[#CFCFCE] shrink-0 bg-[#CFCFCE]"
        role="separator"
        aria-orientation="vertical"
      />
      
      <FilterButton
        onClick={handleFilterClick}
        aria-expanded={isFilterOpen}
        aria-haspopup="true"
        aria-label="Open filter options"
      >
        Filter
      </FilterButton>
    </nav>
  );
}