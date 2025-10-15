"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Footer } from "@/components/footer/footer";
import { Listing } from "@/components/listing";
import { Navigation } from "@/components/auth/Navigation";
import { Services } from "@/components/filter/Services";

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

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleOrderByChange = (value: string) => {
    setOrderBy(value);
  };

  return (
    <>
      <Navigation />
      <Services
        onServiceChange={handleServiceChange}
        selectedService={selectedService}
        onOrderByChange={handleOrderByChange}
        orderBy={orderBy}
      />
      <Listing selectedService={selectedService} orderBy={orderBy} />
      <Footer />
    </>
  );
}
