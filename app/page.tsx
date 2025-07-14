"use client";

import { useState } from "react";

import { Footer } from "../components/footer/footer/footer";
import { Listing } from "@/components/listing";
import { Navigation } from "@/components/auth/Navigation";
import { Services } from "@/components/filter/Services";

export default function Home() {
  const [selectedService, setSelectedService] = useState("chef-at-home");

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  return (
    <>
      <Navigation />
      <Services
        onServiceChange={handleServiceChange}
        selectedService={selectedService}
      />
      <Listing selectedService={selectedService} />
      <Footer />
    </>
  );
}
