"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { Cart } from "@/components/cart/cart";
import { EventDetailsForm } from "@/components/booking/event-details-form";
import { EventDetailsForm3 } from "@/components/booking/event-details-form3";
import { PreferencesForm } from "@/components/booking/preferences";
import { MessagesForm } from "@/components/booking/message-form";
import { Checkout } from "@/components/checkout/checkout";
import { saveBookingDraft, getBookingDraft, clearBookingDraft } from "@/lib/booking-intent";

type BookingStep =
  | "cart"
  | "event-details"
  | "event-details3"
  | "preferences"
  | "messages"
  | "checkout";

const ChefAtHomeBookingPage = () => {
  const searchParams = useSearchParams();
  const isCustomBooking = searchParams.get("is_custom") === "true";
  const isResuming = searchParams.get("resume") === "true";
  const bookingMenu = useAuthStore((s) => s.bookingMenu);
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const bookingMenuSelection = useAuthStore((s) => s.bookingMenuSelection);
  const setBookingMenuSelection = useAuthStore(
    (s) => s.setBookingMenuSelection,
  );
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>(
    (bookingMenuSelection || []).map((id: any) => String(id)),
  );
  const menu = bookingMenu;
  const [currentStep, setCurrentStep] = useState<BookingStep>(
    isCustomBooking ? "event-details" : "cart",
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
  const menuError = !bookingMenu
    ? "No menu data found. Please start from the menu detail page."
    : null;
  const [bookingId, setBookingId] = useState<number | null>(null);

  // Restore draft if resuming
  React.useEffect(() => {
    if (isResuming) {
      const draft = getBookingDraft();
      if (draft) {
        setCurrentStep(draft.step as BookingStep);
        setBookingData(draft.data.bookingData || {});
        setSelectedMenuItems(draft.data.selectedMenuItems || []);
        setEventDetailsForm(draft.data.eventDetailsForm || { location: "", eventDate: "", guests: menu?.num_of_guests || 1 });
        setEventDetailsForm3(draft.data.eventDetailsForm3 || { eventTime: "", venue: "" });
        setPreferencesForm(draft.data.preferencesForm || { allergyDetails: "", dietaryRestrictions: [] });
        setBookingId(draft.data.bookingId || null);
        clearBookingDraft();
      }
    }
  }, [isResuming]);

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
    const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : currentStep;
    // Save draft with the *next* step
    saveBookingDraft({
      step: nextStep,
      data: {
        bookingData,
        selectedMenuItems,
        eventDetailsForm,
        eventDetailsForm3,
        preferencesForm,
        bookingId,
      },
    });
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
    // Skip cart step for custom booking
    if (isCustomBooking && currentStep === "cart") {
      handleNext();

      return null;
    }

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
            onBack={isCustomBooking ? undefined : handleBack}
            onNext={handleNext}
            menu={isCustomBooking ? undefined : menu}
            formData={eventDetailsForm}
            onChange={setEventDetailsForm}
            isCustomBooking={isCustomBooking}
          />
        );
      case "event-details3":
        return (
          <EventDetailsForm3
            onBack={handleBack}
            onNext={handleNext}
            menu={isCustomBooking ? undefined : menu}
            formData={eventDetailsForm3}
            onChange={setEventDetailsForm3}
            isCustomBooking={isCustomBooking}
          />
        );
      case "preferences":
        return (
          <PreferencesForm
            onNext={(data) => handleNext(data)}
            onBack={handleBack}
            menu={isCustomBooking ? undefined : menu}
            formData={preferencesForm}
            onChange={(data) =>
              setPreferencesForm({
                allergyDetails: data.allergyDetails ?? "",
                dietaryRestrictions: data.dietaryRestrictions ?? [],
              })
            }
            isCustomBooking={isCustomBooking}
          />
        );
      case "messages":
        return (
          <MessagesForm
            onBack={handleBack}
            onNext={handleNext}
            bookingData={bookingData}
            selectedMenuItems={isCustomBooking ? [] : selectedMenuItems}
            menuId={isCustomBooking ? undefined : (menu?.id ?? undefined)}
            menu={isCustomBooking ? undefined : menu}
            dietaryRestrictions={preferencesForm.dietaryRestrictions}
            isCustomBooking={isCustomBooking}
          />
        );
      case "checkout":
        return (
          <Checkout bookingId={bookingId} isCustomBooking={isCustomBooking} />
        );
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
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-2 py-4 sm:px-4 lg:px-6">
      <div className="w-full max-w-4xl">{renderStep()}</div>
    </div>
  );
};

export default ChefAtHomeBookingPage;
