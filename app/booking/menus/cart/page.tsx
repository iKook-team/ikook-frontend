"use client";

import React, { useEffect, useState } from "react";

import { Cart } from "@/components/cart/cart";
import { addonService } from "@/lib/api/addons";
import { useAuthStore } from "@/lib/store/auth-store";

const Index = () => {
  const bookingMenu = useAuthStore((s) => s.bookingMenu);
  const bookingMenuSelection = useAuthStore((s) => s.bookingMenuSelection);
  const bookingSelectedAddons = useAuthStore((s) => s.bookingSelectedAddons);
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const setBookingMenuSelection = useAuthStore(
    (s) => s.setBookingMenuSelection,
  );
  const setBookingSelectedAddons = useAuthStore(
    (s) => s.setBookingSelectedAddons,
  );
  const [availableAddons, setAvailableAddons] = useState<any[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Only run on client and only if not already hydrated
    if (typeof window !== "undefined") {
      try {
        const storedMenu = localStorage.getItem("ikook_booking_menu");

        if (!bookingMenu && storedMenu) setBookingMenu(JSON.parse(storedMenu));
        const storedMenuSel = localStorage.getItem(
          "ikook_booking_menu_selection",
        );

        if (
          (!bookingMenuSelection || bookingMenuSelection.length === 0) &&
          storedMenuSel
        )
          setBookingMenuSelection(JSON.parse(storedMenuSel));
        const storedAddons = localStorage.getItem(
          "ikook_booking_selected_addons",
        );

        if (
          (!bookingSelectedAddons || bookingSelectedAddons.length === 0) &&
          storedAddons
        )
          setBookingSelectedAddons(JSON.parse(storedAddons));
        setReady(true);
      } catch {
        setReady(true); // fail open
      }
    } else {
      setReady(true); // server never renders UI anyway
    }
  }, []);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const response = await addonService.getAddons();

        setAvailableAddons(response.data);
      } catch {}
    };

    fetchAddons();
  }, []);

  if (!ready)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  console.log("[Cart PAGE] hydrated values:", {
    bookingMenu,
    bookingMenuSelection,
    bookingSelectedAddons,
  });

  if (!bookingMenu) {
    return (
      <div className="min-h-screen w-full bg-gray-50 py-10 px-4 flex justify-center items-center">
        <div className="text-center">
          <div className="text-gray-500 text-lg">Loading cart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-[655px]">
        <Cart
          onNext={() => {}}
          menu={bookingMenu}
          menuLoading={false}
          menuError={null}
          selectedMenuItems={bookingMenuSelection ?? []}
          setSelectedMenuItems={setBookingMenuSelection}
          selectedAddons={bookingSelectedAddons ?? []}
          availableAddons={availableAddons}
          onAddonToggle={(addonId) => {
            const newSelectedAddons = (bookingSelectedAddons ?? []).includes(
              addonId,
            )
              ? (bookingSelectedAddons ?? []).filter((id) => id !== addonId)
              : [...(bookingSelectedAddons ?? []), addonId];

            setBookingSelectedAddons(newSelectedAddons);
          }}
        />
      </div>
    </div>
  );
};

export default Index;
