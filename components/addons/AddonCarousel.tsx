"use client";

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@heroui/react";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { AddonCarouselProps } from "@/lib/dummy-addons";
import { AddonCard } from "./AddonCard";

export const AddonCarousel: React.FC<AddonCarouselProps> = ({
  addons,
  selectedAddons,
  onAddonToggle,
  categoryFilter,
  onCategoryFilter,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const { market } = useMarket();
  const currencySymbol = getMarketConfig(market).currencySymbol;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Approximate width of one card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  const filteredAddons = categoryFilter === "All"
    ? addons
    : addons.filter(addon => addon.category === categoryFilter);

  return (
    <div className="w-full">
      {/* Header with title and category filter */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            🎉 Add Extra Services
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Enhance your event with professional services
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2">
          {["All", "Beverage", "Photography", "Decorations", "Entertainment"].map((category) => (
            <Button
              key={category}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                categoryFilter === category
                  ? "bg-[#FCC01C] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              size="sm"
              variant="flat"
              onPress={() => onCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Addon Cards Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        <Button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
          isIconOnly
          size="sm"
          variant="flat"
          onPress={() => scroll("left")}
        >
          <FaChevronLeft className="text-gray-600" />
        </Button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredAddons.length > 0 ? (
            filteredAddons.map((addon) => (
              <div key={addon.id} className="flex-shrink-0 w-80">
                <AddonCard
                  addon={addon}
                  isSelected={selectedAddons.includes(addon.id)}
                  onToggle={onAddonToggle}
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8 text-gray-500">
              No addons found for category: {categoryFilter}
            </div>
          )}
        </div>

        {/* Right Scroll Button */}
        <Button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
          isIconOnly
          size="sm"
          variant="flat"
          onPress={() => scroll("right")}
        >
          <FaChevronRight className="text-gray-600" />
        </Button>
      </div>

      {/* Selected Addons Summary */}
      {selectedAddons.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-yellow-700">
              {selectedAddons.length} addon{selectedAddons.length > 1 ? "s" : ""} selected
            </span>
            <span className="text-sm font-semibold text-yellow-700">
              Total: {currencySymbol}{selectedAddons.reduce((total, addonId) => {
                const addon = addons.find(a => a.id === addonId);
                return total + (addon ? addon.price : 0);
              }, 0)}
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
