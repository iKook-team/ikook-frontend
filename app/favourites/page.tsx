"use client";

import React from "react";

import { FavouritesSection } from "@/components/favourites/favourrites-section";
import BackButton from "@/components/common/BackButton";

const Index = () => {
  return (
    <div className="bg-[rgba(251,251,251,1)] flex flex-col overflow-hidden items-stretch w-full min-h-screen">
      <main className="flex justify-center w-full">
        <div className="w-full max-w-[655px] px-4 pt-4">
          <BackButton fallback="/explore" />
        </div>
        <FavouritesSection />
      </main>
    </div>
  );
};

export default Index;
