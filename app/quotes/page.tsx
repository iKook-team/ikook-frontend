"use client";

import React from "react";

import { QuotesSection } from "@/components/quotes/quotes-section";
import BackButton from "@/components/common/BackButton";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <div className="w-full max-w-[1114px] mx-auto px-4 pt-4">
          <div className="ml-28 max-md:ml-2.5">
            <BackButton fallback="/dashboard" />
          </div>
        </div>
        <QuotesSection />
      </main>
    </div>
  );
};

export default Index;
