"use client";

import React from "react";

import { QuotesSection } from "@/components/quotes/quotes-section";
import BackButton from "@/components/common/BackButton";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <div className="px-4 pt-4">
          <BackButton fallback="/dashboard" />
        </div>
        <QuotesSection />
      </main>
    </div>
  );
};

export default Index;
