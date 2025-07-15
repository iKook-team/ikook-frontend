"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useMenu } from "@/hooks/useMenu";

import { HeroSection } from "@/components/booking/hero-section";
import { ImageGallery } from "@/components/booking/image-gallery";
import { ChefMenuSection } from "@/components/booking/chef-menu-section";
import { PricingSidebar } from "@/components/booking/pricing-sidebar";
import { ChefProfile } from "@/components/booking/menu-chef-profile";
import { ReviewsSection } from "@/components/booking/reviews-ratings-section";
import { MenusSection } from "@/components/booking/menus-section";

const Index: React.FC = () => {
  const { id } = useParams();
  const menuId = Array.isArray(id) ? id[0] : id;
  const { menu, loading, error } = useMenu(menuId);
  const [selectedItems, setSelectedItems] = useState<Record<string, Set<number>> | null>(null);

  React.useEffect(() => {
    if (menu && !selectedItems) {
      const initial: Record<string, Set<number>> = {};
      (menu.courses || []).forEach((course: string) => {
        initial[course] = new Set();
      });
      setSelectedItems(initial);
    }
  }, [menu, selectedItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-500 text-lg">Loading menu details...</span>
      </div>
    );
  }

  if (error || !menu || !selectedItems) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-red-500 text-lg">{error || "Menu not found."}</span>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <main className="w-full max-w-[1115px] px-4">
        <HeroSection menu={menu} />
        <ImageGallery images={menu.images} />
        <div className="w-full max-w-[1115px] mt-[60px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <ChefMenuSection menu={menu} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            <PricingSidebar menu={menu} selectedItems={selectedItems} />
          </div>
        </div>
        <ChefProfile chef={menu.chef} />
        {/* <ReviewsSection />
        <MenusSection /> */}
      </main>
    </div>
  );
};

export default Index;
