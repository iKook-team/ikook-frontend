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

const Index: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const menuId = Array.isArray(id) ? id[0] : id;
  const { menu, loading, error } = useMenu(menuId);
  const userType = useAuthStore((s) => s.userType);
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const setBookingMenuSelection = useAuthStore(
    (s) => s.setBookingMenuSelection,
  );
  const setBookingSelectedAddons = useAuthStore(
    (s) => s.setBookingSelectedAddons,
  );
  const [selectedItems, setSelectedItems] = useState<Record<
    string,
    Set<number>
  > | null>({});
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [addons, setAddons] = useState<any[]>([]);
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

  // Save menu to store when it loads
  useEffect(() => {
    if (menu) {
      setBookingMenu(menu);
      console.log("💾 Menu saved to store:", menu.id);
    }
  }, [menu, setBookingMenu]);

  // Save selected items and addons to store when they change
  useEffect(() => {
    if (selectedItems) {
      // Flatten selectedItems (Record<string, Set<number>>) to array of IDs
      const selectedIds = Object.values(selectedItems).flatMap((set) =>
        Array.from(set),
      );

      setBookingMenuSelection(selectedIds);
    } else {
      setBookingMenuSelection([]);
    }
  }, [selectedItems, setBookingMenuSelection]);

  useEffect(() => {
    setBookingSelectedAddons(selectedAddons);
    console.log("💾 Selected addons saved to store:", selectedAddons);
    console.log(
      "💾 Selected addons types:",
      selectedAddons.map((id) => ({ id, type: typeof id })),
    );
  }, [selectedAddons, setBookingSelectedAddons]);

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

  if (error || !menu) {
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
              console.log(
                "🎯 Addon toggled:",
                addonId,
                "Current selected:",
                selectedAddons,
              );
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
};

export default Index;
