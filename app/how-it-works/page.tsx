import React from "react";
import { Metadata } from "next";

import HeroSection from "@/components/how-it-works/hero-section";
import HowItWorksSection from "@/components/how-it-works/how-it-works-section";
import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "How It Works - Book a Private Chef in 3 Easy Steps",
  description:
    "Learn how to book a private chef with iKook. Browse chefs, customize your menu, and enjoy restaurant-quality meals at home. Simple booking process in Nigeria, UK & South Africa.",
  openGraph: {
    title: "How iKook Works - Book a Private Chef in 3 Easy Steps",
    description:
      "Discover how easy it is to book a private chef. Browse profiles, customize menus, and enjoy professional culinary experiences at home.",
    url: "https://ikook.co.uk/how-it-works",
  },
  alternates: {
    canonical: "https://ikook.co.uk/how-it-works",
  },
};

const HowItWorks = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <Footer />
    </>
  );
};

export default HowItWorks;
