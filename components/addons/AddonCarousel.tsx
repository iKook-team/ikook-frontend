"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@heroui/react";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { AddonCarouselProps, Addon } from "@/lib/api/addons";
import { addonService } from "@/lib/api/addons";
import { AddonCard } from "./AddonCard";

export const AddonCarousel: React.FC<AddonCarouselProps> = ({
  selectedAddons,
  onAddonToggle,
}) => {
  console.log('🎪 AddonCarousel component rendering...');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { market } = useMarket();
  const currencySymbol = getMarketConfig(market).currencySymbol;

  // State for addons data
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch addons on component mount
  useEffect(() => {
    console.log('🚀 AddonCarousel mounted, fetching addons...');

    const fetchAddons = async () => {
      try {
        console.log('📡 Making API call to fetch addons...');
        setLoading(true);
        setError(null);

        const response = await addonService.getAddons();
        console.log('✅ Addons fetched successfully:', response);

        // Handle the correct API response structure: { status, message, data: [...] }
        const addonResults = response?.data || [];
        console.log('📦 Addon results:', addonResults);

        setAddons(Array.isArray(addonResults) ? addonResults : []);
      } catch (err: any) {
        console.error('❌ Failed to fetch addons:', err);
        console.error('❌ Error details:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data
        });
        setError(`Failed to load addons: ${err.message}`);
        setAddons([]); // Ensure addons is always an array
      } finally {
        setLoading(false);
        console.log('🏁 Addon loading complete');
      }
    };

    fetchAddons();
  }, []);

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

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              🎉 Add Extra Services
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Enhance your event with professional services
            </p>
          </div>
        </div>
        <div className="w-full text-center py-8 text-gray-500">
          Loading addons...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              🎉 Add Extra Services
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Enhance your event with professional services
            </p>
          </div>
        </div>
        <div className="w-full text-center py-8 text-red-500">
          {error}
        </div>
      </div>
    );
  }

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
          {(addons || []).length > 0 ? (
            addons.map((addon) => (
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
              No addons available
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
              Total: {currencySymbol}{(addons || []).reduce((total, addon) => {
                const addonId = selectedAddons.find(id => id === addon.id);
                const price = parseFloat(addon.price) || 0;
                return total + (addonId ? price : 0);
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
