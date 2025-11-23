import React from "react";
import { Metadata } from "next";

import Hero from "@/components/about/hero";
import AboutContent from "@/components/about/about-content";
import ValueCards from "@/components/about/value-cards";
import CoreValues from "@/components/about/core-values";
import ChefUserSection from "@/components/about/chef-user-section";
import CallToAction from "@/components/about/call-to-action";
import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "About iKook - Connecting Chefs and Food Lovers",
  description:
    "Learn about iKook's mission to connect professional private chefs with food enthusiasts across Nigeria, UK, and South Africa. Discover our story, values, and commitment to exceptional culinary experiences.",
  openGraph: {
    title: "About iKook - Revolutionizing Private Chef Services",
    description:
      "Discover how iKook is transforming the way people experience fine dining at home by connecting professional chefs with food lovers.",
    url: "https://ikook.co.uk/about-us",
  },
  alternates: {
    canonical: "https://ikook.co.uk/about-us",
  },
};

const Index: React.FC = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden">
      <Navigation />
      <main className="w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Hero />
          <AboutContent />
          <ValueCards />
          <CoreValues />
          <ChefUserSection />
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
