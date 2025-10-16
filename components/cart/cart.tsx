"use client";

import { CartHeader } from "./cart-header";
import { ChefCard } from "./chef-card";
import { MenuSection } from "./menu-section";
import { IncludedServices } from "./included-services";
import { ContinueButton } from "./continue-button";
import { SimpleAddonCartSection } from "@/components/addons/SimpleAddonCartSection";
import { Addon } from "@/lib/api/addons";
import { useAuthStore } from "@/lib/store/auth-store";
import { addonService } from "@/lib/api/addons";
import { useState, useEffect } from "react";

interface CartProps {
  onNext: (data?: Record<string, any>) => void;
  menu: any;
  menuLoading: boolean;
  menuError: string | null;
  selectedMenuItems: string[];
  setSelectedMenuItems: (items: string[]) => void;
  setMenuId?: (id: number) => void; // Made optional since it's not used
  selectedAddons?: number[];
  availableAddons?: Addon[]; // ✅ NEW: Accept available addon data
  onAddonToggle?: (addonId: number) => void;
}

export const Cart: React.FC<CartProps> = ({
  onNext,
  menu,
  menuLoading,
  menuError,
  selectedMenuItems,
  setSelectedMenuItems,
  setMenuId,
  selectedAddons,
  availableAddons = [],
  onAddonToggle,
}) => {
  // Transform menu data to courses format expected by MenuSection
  // Only include selected items, not all items
  const courses = (menu?.courses || [])
    .map((course: any) => {
      const courseName = course.title || course.name || course;
      const courseItems = (menu.items || [])
        .filter(
          (item: any) =>
            item.course === courseName &&
            selectedMenuItems.includes(String(item.id))
        )
        .map((item: any) => ({ id: String(item.id), name: item.name }));

      // Only include courses that have selected items
      return courseItems.length > 0
        ? {
            title: courseName,
            quantity: course.quantity || 1,
            items: courseItems,
          }
        : null;
    })
    .filter(Boolean); // Remove null courses

  const includedServices = [
    {
      iconUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c7b235941aa26390307f7342f9ecda8294773b6d?placeholderIfAbsent=true",
      name: "All ingredients",
    },
    {
      iconUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dae1bd21c1a57e9b64d38548d5ff9c957ef59bd8?placeholderIfAbsent=true",
      name: "Chef's travel and insurance costs",
    },
    {
      iconUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/1436c906e7ee732e95f89eb76724f857a78866e1?placeholderIfAbsent=true",
      name: "Serving and Cleanup",
    },
  ];

  const handleContinue = () => {
    onNext();
  };

  // Debug: Log selected addons and filtered results
  const safeSelectedAddons = selectedAddons || [];

  // Filter addons by checking if their ID exists in the selectedAddons array
  const filteredAddons = availableAddons.filter((addon) => {
    const addonId = addon.id;
    // Convert all IDs to strings for consistent comparison
    const selectedAddonIds = safeSelectedAddons.map(String);
    return selectedAddonIds.includes(String(addonId));
  });

  // Only show addons that are actually selected (no demo fallback)
  const displayAddons = filteredAddons;

  return (
    <main className="flex w-full max-w-4xl mx-auto flex-col items-stretch px-2 sm:px-4">
      <CartHeader title="Cart" />

      <div className="border border-gray-200 shadow-sm flex w-full flex-col items-stretch bg-white mt-2 py-6 sm:py-8 rounded-2xl border-solid">
        <div className="flex w-full flex-col items-stretch px-4 sm:px-6 lg:px-8 space-y-8">
          <ChefCard
            chefName={
              menu?.chef?.first_name && menu?.chef?.last_name
                ? `${menu.chef.first_name} ${menu.chef.last_name}`
                : "Chef"
            }
            dishName={menu?.name || "Menu"}
            imageUrl={
              menu?.images && menu.images.length > 0 && menu.images[0].image
                ? menu.images[0].image
                : "/menus/menu1.png"
            }
            location={menu?.chef?.city || "Unknown"}
            locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
            rating={
              menu?.chef?.average_rating
                ? menu.chef.average_rating.toFixed(1)
                : "-"
            }
            ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
            reviewCount={
              menu?.chef?.num_reviews
                ? `(${menu.chef.num_reviews} Reviews)`
                : "(0 Reviews)"
            }
          />

          <MenuSection
            checkboxUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/cf65a6606e6871f81a6c7b4d7ef1f12024024702?placeholderIfAbsent=true"
            courses={courses}
            selectedMenuItems={selectedMenuItems}
            setSelectedMenuItems={setSelectedMenuItems}
            menuName={menu?.name || "Menu"}
            chefName={
              menu?.chef?.first_name && menu?.chef?.last_name
                ? `${menu.chef.first_name} ${menu.chef.last_name}`
                : "Chef"
            }
          />

          <div>
            <SimpleAddonCartSection
              selectedAddons={displayAddons}
              onRemoveAddon={(addonId) => {
                if (onAddonToggle) {
                  onAddonToggle(addonId);
                }
              }}
            />
          </div>

          <IncludedServices services={includedServices} />

          <hr className="w-full mt-[15px] border-t border-gray-200" />
        </div>

        <ContinueButton onClick={handleContinue} />
      </div>
    </main>
  );
};
