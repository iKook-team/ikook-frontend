"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { Addon } from "@/lib/api/addons";
import { formatNumber } from "@/lib/format";

interface PricingSidebarProps {
  menu: any;
  selectedItems: Record<string, Set<number>> | null;
  selectedAddons?: number[];
  addons?: Addon[]; // ✅ NEW: Accept addon data as prop
  onRemoveAddon: (addonId: number) => void;
}

export const PricingSidebar: React.FC<PricingSidebarProps> = ({
  menu,
  selectedItems,
  selectedAddons,
  addons = [], // ✅ NEW: Default to empty array
  onRemoveAddon,
}) => {
  console.log("PricingSidebar component loaded - DEBUG");
  const router = useRouter();
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const setBookingMenuSelection = useAuthStore(
    (s) => s.setBookingMenuSelection,
  );
  const setBookingSelectedAddons = useAuthStore((s) => s.setBookingSelectedAddons);

  const { market } = useMarket();
  const currencySymbol = getMarketConfig(market).currencySymbol;

  // Calculate addon total
  const selectedAddonObjects = (addons || []).filter(addon => (selectedAddons || []).includes(addon.id));
  const addonTotal = selectedAddonObjects.reduce((total, addon) => {
    const price = parseFloat(addon.price) || 0;
    return total + price;
  }, 0);

  // Calculate total selected items
  const totalSelected = selectedItems
    ? Object.values(selectedItems).reduce((sum, set) => sum + set.size, 0)
    : 0;
  // Calculate total possible selections (sum of all course selection limits)
  const totalPossible =
    menu?.courses && menu?.courses_selection_limit
      ? menu.courses.reduce(
          (sum: number, course: string) =>
            sum + (menu.courses_selection_limit[course] || 1),
          0,
        )
      : 0;
  const progressPercent =
    totalPossible > 0
      ? Math.min(100, Math.round((totalSelected / totalPossible) * 100))
      : 0;

  // Guests input and pricing breakdown removed

  const handleProceedToCart = () => {
    if (!menu?.menu_type) {
      console.log("No menu_type found!", menu);

      return;
    }
    let path = "/booking/chef-at-home";
    const type = String(menu.menu_type).toLowerCase().replace(/[-_ ]/g, "");

    console.log("Normalized menu_type:", type);
    if (type === "finedining") {
      path = "/booking/fine-dining";
    } else if (type === "largeevent") {
      path = "/booking/large-event";
    } else if (type === "mealdelivery") {
      path = "/booking/meal-delivery";
    } else if (type === "mealprep") {
      path = "/booking/meal-prep";
    } else if (type === "corporatedining") {
      path = "/booking/corporate-dining";
    } else if (type === "chefathome") {
      path = "/booking/chef-at-home";
    }
    console.log("Proceeding to:", path, "for menu_type:", menu.menu_type, menu);
    // Flatten selectedItems (Record<string, Set<number>>) to array of IDs
    const selectedIds = selectedItems
      ? Object.values(selectedItems).flatMap((set) => Array.from(set))
      : [];

    console.log("Saving to store:", {
      selectedAddons: selectedAddons,
      selectedAddonsLength: selectedAddons?.length || 0,
      selectedItemsCount: selectedIds.length
    });
    // Save menu and selection to zustand store
    setBookingMenu(menu);
    setBookingMenuSelection(selectedIds);
    setBookingSelectedAddons(selectedAddons || []);
    router.push(path);
  };

  return (
    <aside className="w-[35%] ml-5 max-md:w-full max-md:ml-0">
      <div className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] flex w-full flex-col items-stretch bg-white mx-auto px-[19px] py-[26px] rounded-[15px] border-solid max-md:mt-10">
        <div className="text-[#FCC01C] text-4xl font-semibold leading-none tracking-[-0.72px]">
          {currencySymbol}
          {formatNumber(parseFloat(menu?.price_per_person || "100"), market)}pp
        </div>

        <div className="flex flex-col bg-[#E7E7E7] mt-[23px] px-3.5 py-[13px] rounded-lg">
          <div className="text-[#030302] text-xs font-semibold">
            Choose from 3 courses (3 per course)
            <span className="ml-2 text-[#FCC01C] font-bold">
              {totalSelected} selected
            </span>
          </div>
          <div className="self-stretch flex flex-col bg-white mt-[15px] rounded-[20px] max-md:pr-5">
            <div className="flex w-full h-[7px] bg-[#E7E7E7] rounded-[20px] overflow-hidden">
              <div
                className="bg-[#030302] h-full rounded-[20px_0px_0px_20px] transition-all duration-300"
                style={{
                  width: `${progressPercent}%`,
                  minWidth: progressPercent > 0 ? 12 : 0,
                }}
              />
            </div>
          </div>
          <div className="text-[#0F0E0C] text-[10px] font-normal leading-[18px] mt-1">
            {totalPossible > 0
              ? `${totalSelected} of ${totalPossible} dishes selected`
              : "0 dishes selected"}
          </div>
        </div>

        {/* Inputs removed per requirement: location, event date, guests */}

        {/* Pricing breakdown removed per requirement */}

        <button
          onClick={() => {
            console.log("Proceed to Cart button clicked");
            handleProceedToCart();
          }}
          className={`flex text-base text-white font-bold mt-10 rounded-lg ${totalSelected === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          type="button"
          disabled={totalSelected === 0}
        >
          <div className="text-white self-stretch border border-[color:var(--Yellow-Pry,#FCC01C)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] min-w-60 w-[331px] gap-2 overflow-hidden bg-[#FCC01C] px-5 py-3 rounded-lg border-solid">
            Proceed to Cart ({totalSelected})
          </div>
        </button>

        {/* Selected Addons Section */}
        {selectedAddonObjects.length > 0 && (
          <div className="flex w-full flex-col mt-7 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-black text-sm font-medium mb-3">
              🎉 Selected Addons ({selectedAddonObjects.length})
            </div>
            <div className="space-y-2">
              {selectedAddonObjects.map((addon) => (
                <div key={addon.id} className="flex items-center justify-between text-sm">
                  <div className="flex-1">
                    <span className="text-gray-900">{addon.name}</span>
                    <span className="text-gray-600 ml-2">by {addon.client_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#FCC01C] font-semibold">{currencySymbol}{formatNumber(parseFloat(addon.price || '0'), market)}</span>
                    <button
                      onClick={() => onRemoveAddon(addon.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-yellow-300 mt-3 pt-2">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Addons Total:</span>
                <span className="text-[#FCC01C]">{currencySymbol}{formatNumber(addonTotal, market)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex w-full flex-col text-sm text-[#3F3E3D] font-normal bg-[#FFFCF5] mt-7 px-[25px] py-[18px] rounded-lg max-md:px-5">
          <div className="text-black text-base font-medium">
            The Menu includes
          </div>
          <div className="flex items-center gap-3 leading-none mt-[18px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/19e2cc1cc15bb49bc23538654057de1c8977adc2?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[26px] self-stretch shrink-0 my-auto"
              alt="Ingredients"
            />
            <span className="text-[#3F3E3D] self-stretch my-auto">
              All ingredients
            </span>
          </div>
          <div className="self-stretch flex items-center gap-3 leading-none mt-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/7b6428524fa95670090e0e9a49a2ee2f38cdff2a?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[26px] self-stretch shrink-0 my-auto"
              alt="Travel"
            />
            <span className="text-[#3F3E3D] self-stretch my-auto">
              Chef&apos;s travel and insurance costs
            </span>
          </div>
          <div className="flex items-center gap-3 leading-none mt-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/0859f3498eb696f981b76dc4975545f086932fbb?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[26px] self-stretch shrink-0 my-auto"
              alt="Service"
            />
            <span className="text-[#3F3E3D] self-stretch my-auto">
              Serving and Cleanup
            </span>
          </div>
          <div className="flex items-center gap-3 leading-none mt-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/891cdaacc6ca24dd86996f3d70fedf35140c4c41?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[26px] self-stretch shrink-0 my-auto"
              alt="Protection"
            />
            <span className="text-[#3F3E3D] self-stretch my-auto">
              Money Protection
            </span>
          </div>
          <p className="text-[#3F3E3D] text-[8px] leading-5 max-md:mr-[9px]">
            We pay the chefs after the event, to protect your money
          </p>
        </div>
      </div>
    </aside>
  );
};
