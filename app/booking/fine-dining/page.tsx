"use client";

import React, { useState } from "react";

import { Cart } from "@/components/cart/cart";
import { EventDetailsForm } from "@/components/booking/event-details-form";
import { EventDetailsForm3 } from "@/components/booking/event-details-form3";
import { PreferencesForm } from "@/components/booking/preferences";
import { MessagesForm } from "@/components/booking/message-form";
import { Checkout } from "@/components/checkout/checkout";

type BookingStep =
  | "cart"
  | "event-details"
  | "event-details3"
  | "preferences"
  | "messages"
  | "checkout";

const FineDiningBookingPage = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>("cart");
  const [bookingData, setBookingData] = useState<Record<string, any>>({});

  const handleNext = (data?: Record<string, any>) => {
    if (data) {
      setBookingData((prev) => ({ ...prev, ...data }));
    }

    const steps: BookingStep[] = [
      "cart",
      "event-details",
      "event-details3",
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
      "event-details3",
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

  // Placeholder state for menu and selection (replace with real data/fetch as needed)
  const [menu, setMenu] = useState<any>(null);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);
  const setMenuId = (id: number) => {};

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
            setMenuId={setMenuId}
          />
        );
      case "event-details":
        return <EventDetailsForm onBack={handleBack} onNext={handleNext} />;
      case "event-details3":
        return <EventDetailsForm3 onBack={handleBack} onNext={handleNext} />;
      case "preferences":
        return (
          <PreferencesForm
            onNext={(data) => handleNext(data)}
            onBack={handleBack}
          />
        );
      case "messages":
        return <MessagesForm onBack={handleBack} onNext={handleNext} />;
      case "checkout":
        return <Checkout />;
      default:
        return (
          <Cart
            onNext={handleNext}
            menu={menu}
            menuLoading={menuLoading}
            menuError={menuError}
            selectedMenuItems={selectedMenuItems}
            setSelectedMenuItems={setSelectedMenuItems}
            setMenuId={setMenuId}
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

export default FineDiningBookingPage;
