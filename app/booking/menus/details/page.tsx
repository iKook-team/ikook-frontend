"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { useMenu } from "@/hooks/useMenu";
import { HeroSection } from "@/components/booking/hero-section";
import { ImageGallery } from "@/components/booking/image-gallery";
import { ChefMenuSection } from "@/components/booking/chef-menu-section";
import { PricingSidebar } from "@/components/booking/pricing-sidebar";
import { AddonCarousel } from "@/components/addons";
import { DUMMY_ADDONS } from "@/lib/dummy-addons";
import { ChefProfile } from "@/components/booking/menu-chef-profile";

const Index: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const userType = useAuthStore((s) => s.userType);
  const menuId = Array.isArray(id) ? id[0] : id;
  const { menu, loading, error } = useMenu(menuId);
  const [selectedItems, setSelectedItems] = useState<Record<
    string,
    Set<number>
  > | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [addonCategoryFilter, setAddonCategoryFilter] = useState<string>("All");

  // Redirect chefs away from booking pages
  React.useEffect(() => {
    if (userType === "chef") {
      router.replace("/dashboard/chef");
    }
  }, [userType, router]);

  React.useEffect(() => {
    if (menu && !selectedItems) {
      const initial: Record<string, Set<number>> = {};

      (menu.courses || []).forEach((course: string) => {
        initial[course] = new Set();
      });
      setSelectedItems(initial);
    }
  }, [menu, selectedItems]);

  if (userType === "chef") {
    return null; // Avoid flicker during redirect
  }

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
        <span className="text-red-500 text-lg">
          {error || "Menu not found."}
        </span>
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
            <ChefMenuSection
              menu={menu}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
            <PricingSidebar
              menu={menu}
              selectedItems={selectedItems}
              selectedAddons={selectedAddons}
              onRemoveAddon={(addonId) => {
                setSelectedAddons(prev => prev.filter(id => id !== addonId));
              }}
            />
          </div>
        </div>
        {/* Addon Services Section */}
        <div className="w-full max-w-[1115px] mt-[60px] max-md:max-w-full max-md:mt-10">
          <AddonCarousel
            addons={DUMMY_ADDONS}
            selectedAddons={selectedAddons}
            onAddonToggle={(addonId) => {
              setSelectedAddons(prev =>
                prev.includes(addonId)
                  ? prev.filter(id => id !== addonId)
                  : [...prev, addonId]
              );
            }}
            categoryFilter={addonCategoryFilter}
            onCategoryFilter={setAddonCategoryFilter}
          />
        </div>
        <ChefProfile chef={menu.chef} />
        {/* <ReviewsSection />
        <MenusSection /> */}
      </main>
    </div>
  );
};

export default Index;
