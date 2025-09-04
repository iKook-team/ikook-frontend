"use client";

import React from "react";

import { FavouritesSection } from "@/components/favourites/favourrites-section";
import BackButton from "@/components/common/BackButton";

const Index = () => {
  return (
    <div className="bg-[rgba(251,251,251,1)] flex flex-col overflow-hidden items-stretch w-full min-h-screen">
      <main className="flex flex-col items-center w-full">
        <div className="w-[885px] max-w-full px-5 pt-4">
          <BackButton fallback="/explore" />
        </div>
        <FavouritesSection />
      </main>
    </div>
  );
};

export default Index;
