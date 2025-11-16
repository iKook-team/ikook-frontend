"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Footer } from "@/components/footer/footer";
import { Listing } from "@/components/listing";
import { Navigation } from "@/components/auth/Navigation";
import { Services } from "@/components/filter/Services";
import { type FilterPanelFilters } from "@/components/filter/FilterPanel";

export default function Home() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  // Available services - should match the services in the Services component
  const availableServices = [
    "chef-at-home",
    "large-event",
    "meal-prep",
    "meal-delivery",
    "fine-dining",
    "corporate-dining",
    "cooking-class",
    "eating-coach",
    "box-groceries",
    "chefs"
  ];

  // Set initial selectedService based on query parameter or default
  const getInitialService = () => {
    if (serviceParam && availableServices.includes(serviceParam)) {
      return serviceParam;
    }
    return "chef-at-home";
  };

  const [selectedService, setSelectedService] = useState(getInitialService());
  const [orderBy, setOrderBy] = useState<string>("Most Popular");
  const [filters, setFilters] = useState<FilterPanelFilters>({});

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    // Reset filters when service changes
    setFilters({});
  };

  const handleOrderByChange = (value: string) => {
    setOrderBy(value);
  };

  const handleFiltersChange = (newFilters: FilterPanelFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Navigation />
      <Services
        onServiceChange={handleServiceChange}
        selectedService={selectedService}
        onOrderByChange={handleOrderByChange}
        orderBy={orderBy}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <Listing 
        selectedService={selectedService} 
        orderBy={orderBy}
        filters={filters}
      />
      <Footer />
    </>
  );
}
