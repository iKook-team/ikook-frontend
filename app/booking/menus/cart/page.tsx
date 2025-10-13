"use client";

import React, { useState, useEffect } from "react";

import { Cart } from "@/components/cart/cart";
import { addonService } from "@/lib/api/addons";

const Index = () => {
  const [menu, setMenu] = useState<any>(null);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([1, 3]); // Start with 2 addons selected for demo
  const [availableAddons, setAvailableAddons] = useState<any[]>([]); // Start empty, will be populated by API
  const setMenuId = (id: number) => {};

  // Fetch addons from API
  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const response = await addonService.getAddons();
        setAvailableAddons(response.data);
      } catch (error) {
        console.error('Failed to fetch addons:', error);
        // Keep fallback to dummy data
      }
    };

    fetchAddons();
  }, []);

  // Debug: Track state changes
  useEffect(() => {
    console.log("🔄 Cart Page State Updated:", {
      selectedAddons,
      selectedAddonsType: typeof selectedAddons,
      selectedAddonsLength: selectedAddons.length,
      timestamp: new Date().toISOString()
    });
  }, [selectedAddons]);

  console.log("🚀 Cart Page Component Rendering!");

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-[655px]">
        {(() => {
          console.log("Cart Page Debug:", {
            selectedAddons,
            selectedAddonsType: typeof selectedAddons,
            selectedAddonsLength: selectedAddons.length
          });
          return null;
        })()}
        <Cart
          onNext={() => {}}
          menu={menu}
          menuLoading={menuLoading}
          menuError={menuError}
          selectedMenuItems={selectedMenuItems}
          setSelectedMenuItems={setSelectedMenuItems}
          setMenuId={setMenuId}
          selectedAddons={selectedAddons}
          availableAddons={availableAddons}
          onAddonToggle={(addonId) => {
            setSelectedAddons(prev =>
              prev.includes(addonId)
                ? prev.filter(id => id !== addonId)
                : [...prev, addonId]
            );
          }}
        />
      </div>
    </div>
  );
};

export default Index;
