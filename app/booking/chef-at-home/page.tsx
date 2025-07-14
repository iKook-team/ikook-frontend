"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { listingService } from "@/lib/api/listing";

import { Cart } from "@/components/cart/cart";
import { EventDetailsForm } from "@/components/booking/event-details-form";
import { EventDetailsForm2 } from "@/components/booking/event-details-form2";
import { PreferencesForm } from "@/components/booking/preferences";
import { MessagesForm } from "@/components/booking/message-form";
import { Checkout } from "@/components/checkout/checkout";

type BookingStep =
  | "cart"
  | "event-details"
  | "event-details2"
  | "preferences"
  | "messages"
  | "checkout";

const ChefAtHomeBookingPage = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>("cart");
  const [bookingData, setBookingData] = useState<Record<string, any>>({});
  const bookingMenu = useAuthStore((s) => s.bookingMenu);
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const bookingMenuSelection = useAuthStore((s) => s.bookingMenuSelection);
  const setBookingMenuSelection = useAuthStore((s) => s.setBookingMenuSelection);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>(
    (bookingMenuSelection || []).map((id: any) => String(id))
  );
  const menu = bookingMenu;
  const menuLoading = false;
  const menuError = !bookingMenu ? "No menu data found. Please start from the menu detail page." : null;
  const [bookingId, setBookingId] = useState<number | null>(null);

  const handleNext = (data?: Record<string, any>) => {
    if (data) {
      // If data contains selectedMenuItems or menuId, update them
      if (data.selectedMenuItems) setSelectedMenuItems(data.selectedMenuItems);
      if (data.menuId) setBookingMenu(data.menuId); // Assuming menuId is set via setBookingMenu
      if (data.bookingId) setBookingId(data.bookingId);
      setBookingData((prev) => ({ ...prev, ...data }));
    }

    const steps: BookingStep[] = [
      "cart",
      "event-details",
      "event-details2",
      "preferences",
      "messages",
      "checkout",
    ];

    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      window.scrollTo(0, 0); // Scroll to top on step change
    }
  };

  const handleBack = () => {
    const steps: BookingStep[] = [
      "cart",
      "event-details",
      "event-details2",
      "preferences",
      "messages",
      "checkout",
    ];

    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      window.scrollTo(0, 0); // Scroll to top on step change
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "cart":
        return (
          <Cart
            onNext={handleNext}
            menu={menu}
            menuLoading={menuLoading}
            menuError={menuError}
            selectedMenuItems={selectedMenuItems}
            setSelectedMenuItems={setSelectedMenuItems}
            setMenuId={() => {}}
          />
        );
      case "event-details":
        return <EventDetailsForm onBack={handleBack} onNext={handleNext} />;
      case "event-details2":
        return <EventDetailsForm2 onBack={handleBack} onNext={handleNext} />;
      case "preferences":
        return (
          <PreferencesForm
            onNext={(data) => handleNext(data)}
            onBack={handleBack}
          />
        );
      case "messages":
        return (
          <MessagesForm
            onBack={handleBack}
            onNext={handleNext}
            bookingData={bookingData}
            selectedMenuItems={selectedMenuItems}
            menuId={bookingMenu ?? undefined}
          />
        );
      case "checkout":
        return <Checkout bookingId={bookingId} />;
      default:
        return (
          <Cart
            onNext={handleNext}
            menu={menu}
            menuLoading={menuLoading}
            menuError={menuError}
            selectedMenuItems={selectedMenuItems}
            setSelectedMenuItems={setSelectedMenuItems}
            setMenuId={() => {}}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      {renderStep()}
    </div>
  );
};

export default ChefAtHomeBookingPage;
