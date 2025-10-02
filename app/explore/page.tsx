"use client";

import { useState } from "react";

import { Footer } from "@/components/footer/footer";
import { Listing } from "@/components/listing";
import { Navigation } from "@/components/auth/Navigation";
import { Services } from "@/components/filter/Services";

export default function Home() {
  const [selectedService, setSelectedService] = useState("chef-at-home");
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
