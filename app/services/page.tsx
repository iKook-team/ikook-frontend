import React from "react";

import { ServicesSection } from "@/components/services/services-section";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            <ServicesSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
