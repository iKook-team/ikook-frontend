"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";

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
  const searchParams = useSearchParams();
  const isCustomBooking = searchParams.get('is_custom') === 'true';
  const bookingMenu = useAuthStore((s) => s.bookingMenu);
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const bookingMenuSelection = useAuthStore((s) => s.bookingMenuSelection);
  const setBookingMenuSelection = useAuthStore((s) => s.setBookingMenuSelection);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>(
    (bookingMenuSelection || []).map((id: any) => String(id))
  );
  const menu = bookingMenu;
  const [currentStep, setCurrentStep] = useState<BookingStep>(
    isCustomBooking ? "event-details" : "cart"
  );
  const [bookingData, setBookingData] = useState<Record<string, any>>({});
  const [eventDetailsForm, setEventDetailsForm] = useState({
    location: "",
    eventDate: "",
    guests: menu?.num_of_guests || 1,
  });
  const [eventDetailsForm3, setEventDetailsForm3] = useState({
    eventTime: "",
    venue: "",
  });
  const [preferencesForm, setPreferencesForm] = useState({
    allergyDetails: "",
    dietaryRestrictions: [],
  });
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
        return (
          <EventDetailsForm
            onBack={handleBack}
            onNext={handleNext}
            menu={menu}
            formData={eventDetailsForm}
            onChange={setEventDetailsForm}
          />
        );
      case "event-details3":
        return (
          <EventDetailsForm3
            onBack={handleBack}
            onNext={handleNext}
            menu={menu}
            formData={eventDetailsForm3}
            onChange={setEventDetailsForm3}
          />
        );
      case "preferences":
        return (
          <PreferencesForm
            onNext={(data) => handleNext(data)}
            onBack={handleBack}
            menu={menu}
            formData={preferencesForm}
            onChange={(data) => setPreferencesForm({ allergyDetails: data.allergyDetails ?? "", dietaryRestrictions: data.dietaryRestrictions ?? [] })}
          />
        );
      case "messages":
        return (
          <MessagesForm
            onBack={handleBack}
            onNext={handleNext}
            bookingData={bookingData}
            selectedMenuItems={selectedMenuItems}
            menuId={menu?.id ?? undefined}
            menu={menu}
            dietaryRestrictions={preferencesForm.dietaryRestrictions}
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

export default FineDiningBookingPage;
