import React from "react";

import Hero from "@/components/about/hero";
import AboutContent from "@/components/about/about-content";
import ValueCards from "@/components/about/value-cards";
import CoreValues from "@/components/about/core-values";
import ChefUserSection from "@/components/about/chef-user-section";
import CallToAction from "@/components/about/call-to-action";
import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";

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
