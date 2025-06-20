"use client";

import React from "react";

import { HeroSection } from "@/components/booking/hero-section";
import { ImageGallery } from "@/components/booking/image-gallery";
import { ChefMenuSection } from "@/components/booking/chef-menu-section";
import { PricingSidebar } from "@/components/booking/pricing-sidebar";
import { ChefProfile } from "@/components/booking/menu-chef-profile";
import { ReviewsSection } from "@/components/booking/reviews-ratings-section";
import { MenusSection } from "@/components/booking/menus-section";

const Index: React.FC = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">

      <main className="w-full max-w-[1115px] px-4">
        <HeroSection />
        <ImageGallery />

        <div className="w-full max-w-[1115px] mt-[60px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <ChefMenuSection />
            <PricingSidebar />
          </div>
        </div>

        <ChefProfile />
        <ReviewsSection />
        <MenusSection />
      </main>

    </div>
  );
};

export default Index;
