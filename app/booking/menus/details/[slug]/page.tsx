"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { useMenu } from "@/hooks/useMenu";
import { HeroSection } from "@/components/booking/hero-section";
import { ImageGallery } from "@/components/booking/image-gallery";
import { ChefMenuSection } from "@/components/booking/chef-menu-section";
import { PricingSidebar } from "@/components/booking/pricing-sidebar";
import { AddonCarousel } from "@/components/addons";
import { addonService } from "@/lib/api/addons";
import { ChefProfile } from "@/components/booking/menu-chef-profile";

export default function MenuDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const userType = useAuthStore((s) => s.userType);

  console.log("👤 User type:", userType);
  console.log("🔐 Auth store state:", useAuthStore.getState());
  // Ensure slug is string
  const menuSlug = Array.isArray(slug) ? slug[0] : slug;
  const { menu, loading, error } = useMenu(menuSlug);

  // LIFTED STATE: selection state per course
  const [selectedItems, setSelectedItems] = useState<Record<
    string,
    Set<number>
  > | null>(null);

  // Addon state management
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [addons, setAddons] = useState<any[]>([]); // Will be fetched from API
  const [addonsLoading, setAddonsLoading] = useState(true);

  // Fetch addons on component mount
  useEffect(() => {
    const fetchAddons = async () => {
      try {
        setAddonsLoading(true);
        const response = await addonService.getAddons();

        setAddons(response.data);
      } catch (error) {
        console.error("Failed to fetch addons:", error);
        setAddons([]);
      } finally {
        setAddonsLoading(false);
      }
    };

    fetchAddons();
  }, []);

  // Redirect chefs away from booking pages
  React.useEffect(() => {
    if (userType === "chef") {
      router.replace("/dashboard/chef");
    }
  }, [userType, router]);

  // When menu loads, initialize selectedItems if not already set
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
              addons={addons}
              onRemoveAddon={(addonId) => {
                setSelectedAddons((prev) =>
                  prev.filter((id) => id !== addonId),
                );
              }}
            />
          </div>
        </div>

        {/* Addon Services Section */}
        <div className="w-full max-w-[1115px] mt-[60px] max-md:max-w-full max-md:mt-10">
          <AddonCarousel
            selectedAddons={selectedAddons}
            onAddonToggle={(addonId) => {
              setSelectedAddons((prev) =>
                prev.includes(addonId)
                  ? prev.filter((id) => id !== addonId)
                  : [...prev, addonId],
              );
            }}
          />
        </div>

        <ChefProfile chef={menu.chef} />
        {/* <ReviewsSection />
        <MenusSection /> */}
      </main>
    </div>
  );
}
