"use client";

import React from "react";

import { QuotesSection } from "@/components/quotes/quotes-section";
import BackButton from "@/components/common/BackButton";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <div className="mb-4 sm:mb-6">
          <BackButton fallback="/dashboard" />
        </div>
        <QuotesSection />
      </main>
    </div>
  );
};

export default Index;
