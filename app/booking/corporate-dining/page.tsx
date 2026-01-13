"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { Cart } from "@/components/cart/cart";
import { EventDetailsForm } from "@/components/booking/event-details-form";
import { type EventFormData } from "@/components/booking/event-details-form2";
import { MessagesForm } from "@/components/booking/message-form";
import { Checkout } from "@/components/checkout/checkout";
import {
  saveBookingDraft,
  getBookingDraft,
  clearBookingDraft,
} from "@/lib/booking-intent";
import { addonService } from "@/lib/api/addons";

type BookingStep =
  | "cart"
  | "event-details"
  | "event-details2"
  | "event-details3"
  | "budget"
  | "preferences"
  | "messages"
  | "checkout";

const CorporateDiningBookingPage = () => {
  const searchParams = useSearchParams();
  const isCustomBooking = searchParams.get("is_custom") === "true";
  const isResuming = searchParams.get("resume") === "true";
  const bookingMenu = useAuthStore((s) => s.bookingMenu);
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const bookingMenuSelection = useAuthStore((s) => s.bookingMenuSelection);
  const setBookingMenuSelection = useAuthStore(
    (s) => s.setBookingMenuSelection,
  );
  const bookingSelectedAddons =
    useAuthStore((s) => s.bookingSelectedAddons) || [];
  const setBookingSelectedAddons = useAuthStore(
    (s) => s.setBookingSelectedAddons,
  );
  const [availableAddons, setAvailableAddons] = React.useState<any[]>([]);
  const [addonsLoading, setAddonsLoading] = React.useState(true);
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
  const [eventDetailsForm2, setEventDetailsForm2] = useState<EventFormData>({
    eventType: "",
    preferredCuisines: [],
  });
  const [eventDetailsForm3, setEventDetailsForm3] = useState({
    eventTime: "",
    venue: "",
  });
  const [budgetStep, setBudgetStep] = useState({
    budget: 0,
    budgetType: null as "Flexible" | "Fixed" | null,
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

  // Fetch addons on component mount
  useEffect(() => {
    setAddonsLoading(true);
    addonService.getAddons().then((response) => {
      setAvailableAddons(response.data || []);
      setAddonsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (isResuming) {
      const draft = getBookingDraft();

      if (draft) {
        setCurrentStep(draft.step as BookingStep);
        setBookingData(draft.data.bookingData || {});
        setSelectedMenuItems(draft.data.selectedMenuItems || []);
        setEventDetailsForm(
          draft.data.eventDetailsForm || {
            location: "",
            eventDate: "",
            guests: menu?.num_of_guests || 1,
          },
        );
        setEventDetailsForm2(
          draft.data.eventDetailsForm2 || {
            eventType: "",
            preferredCuisines: [],
          },
        );
        setEventDetailsForm3(
          draft.data.eventDetailsForm3 || { eventTime: "", venue: "" },
        );
        setBudgetStep(draft.data.budgetStep || { budget: 0, budgetType: null });
        setPreferencesForm(
          draft.data.preferencesForm || {
            allergyDetails: "",
            dietaryRestrictions: [],
          },
        );
        setBookingId(draft.data.bookingId || null);
        clearBookingDraft();
      }
    }
  }, [isResuming]);

  const handleNext = (data?: Record<string, any>) => {
    if (data) {
      if (data.selectedMenuItems) setSelectedMenuItems(data.selectedMenuItems);
      if (data.menuId) setBookingMenu(data.menuId);
      if (data.bookingId) setBookingId(data.bookingId);
      setBookingData((prev) => ({ ...prev, ...data }));
      if (data.bookingId) {
        setCurrentStep("checkout");
        window.scrollTo(0, 0);

        return;
      }
    }
    const steps: BookingStep[] = isCustomBooking
      ? [
          "event-details",
          "event-details2",
          "event-details3",
          "budget",
          "preferences",
          "messages",
          "checkout",
        ]
      : [
          "cart",
          "event-details",
          "event-details2",
          "event-details3",
          "budget",
          "preferences",
          "messages",
          "checkout",
        ];
    const currentIndex = steps.indexOf(currentStep);
    const nextStep =
      currentIndex < steps.length - 1 ? steps[currentIndex + 1] : currentStep;

    // Save draft with the *next* step
    saveBookingDraft({
      step: nextStep,
      data: {
        bookingData,
        selectedMenuItems,
        eventDetailsForm,
        eventDetailsForm2,
        eventDetailsForm3,
        budgetStep,
        preferencesForm,
        bookingId,
      },
    });
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    const steps: BookingStep[] = isCustomBooking
      ? [
          "event-details",
          "event-details2",
          "event-details3",
          "budget",
          "preferences",
          "messages",
          "checkout",
        ]
      : [
          "cart",
          "event-details",
          "event-details2",
          "event-details3",
          "budget",
          "preferences",
          "messages",
          "checkout",
        ];

    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "cart":
        if (addonsLoading)
          return (
            <div className="text-lg text-center py-20">
              Loading Addon Services...
            </div>
          );

        // Show loading state if addons haven't been fetched yet
        if (availableAddons.length === 0 && !menuLoading) {
          return (
            <div className="flex justify-center items-center min-h-screen">
              <div className="text-center">
                <div className="text-gray-500 text-lg">Loading addons...</div>
                <div className="text-sm text-gray-400 mt-2">
                  Selected addons: {bookingSelectedAddons?.length || 0}
                </div>
              </div>
            </div>
          );
        }

        return (
          <Cart
            onNext={handleNext}
            menu={menu}
            menuLoading={false}
            menuError={
              !menu
                ? "No menu data found. Please start from the menu detail page."
                : null
            }
            selectedMenuItems={selectedMenuItems}
            setSelectedMenuItems={setSelectedMenuItems}
            setMenuId={() => {}}
            selectedAddons={bookingSelectedAddons}
            availableAddons={availableAddons}
            onAddonToggle={(addonId: number) => {
              const exists = bookingSelectedAddons.includes(addonId);
              const newAddons = exists
                ? bookingSelectedAddons.filter((a) => a !== addonId)
                : [...bookingSelectedAddons, addonId];

              setBookingSelectedAddons(newAddons);
            }}
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
            isCustomBooking={isCustomBooking}
          />
        );
      case "messages":
        return (
          <MessagesForm
            onBack={handleBack}
            onNext={handleNext}
            bookingData={{ ...bookingData, service: "Corporate Dining" }}
            selectedMenuItems={isCustomBooking ? [] : selectedMenuItems}
            menuId={isCustomBooking ? undefined : (menu?.id ?? undefined)}
            menu={isCustomBooking ? undefined : menu}
            dietaryRestrictions={preferencesForm.dietaryRestrictions}
            isCustomBooking={isCustomBooking}
            selectedAddons={bookingSelectedAddons}
            budget={budgetStep.budget}
            budgetType={budgetStep.budgetType}
            preferredCuisines={eventDetailsForm2.preferredCuisines}
          />
        );

      case "checkout":
        return <Checkout bookingId={bookingId} />;
      default:
        return isCustomBooking ? (
          <EventDetailsForm
            onBack={handleBack}
            onNext={handleNext}
            menu={menu}
            formData={eventDetailsForm}
            onChange={setEventDetailsForm}
            isCustomBooking={isCustomBooking}
          />
        ) : (
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

export default CorporateDiningBookingPage;
