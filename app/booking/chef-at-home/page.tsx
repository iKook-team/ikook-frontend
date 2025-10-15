"use client";

console.log("🏠 Chef-at-home page.tsx file is being executed!");

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { Cart } from "@/components/cart/cart";
import { EventDetailsForm } from "@/components/booking/event-details-form";
import { EventDetailsForm3 } from "@/components/booking/event-details-form3";
import { PreferencesForm } from "@/components/booking/preferences";
import { MessagesForm } from "@/components/booking/message-form";
import { Checkout } from "@/components/checkout/checkout";
import { saveBookingDraft, getBookingDraft, clearBookingDraft } from "@/lib/booking-intent";
import { addonService } from "@/lib/api/addons";

type BookingStep =
  | "cart"
  | "event-details"
  | "event-details3"
  | "preferences"
  | "messages"
  | "checkout";

const ChefAtHomeBookingPage = () => {
  console.log("🏠 ChefAtHomeBookingPage component rendering!");
  const searchParams = useSearchParams();
  const isCustomBooking = searchParams.get("is_custom") === "true";
  const isResuming = searchParams.get("resume") === "true";
  console.log("🏠 Chef-at-home page params:", { isCustomBooking, isResuming });
  const bookingMenu = useAuthStore((s) => s.bookingMenu);
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const bookingMenuSelection = useAuthStore((s) => s.bookingMenuSelection);
  const setBookingMenuSelection = useAuthStore(
    (s) => s.setBookingMenuSelection,
  );
  const bookingSelectedAddons = useAuthStore((s) => s.bookingSelectedAddons) ?? [];
  const setBookingSelectedAddons = useAuthStore((s) => s.setBookingSelectedAddons);
  const [availableAddons, setAvailableAddons] = React.useState<any[]>([]);
  const [addonsLoading, setAddonsLoading] = React.useState(true);
  
  console.log("🏠 Chef-at-home store subscription - bookingSelectedAddons:", bookingSelectedAddons);
  
  // Direct store check
  const directStoreCheck = useAuthStore.getState();
  console.log("🏠 Chef-at-home direct store check:", {
    bookingSelectedAddons: directStoreCheck.bookingSelectedAddons,
    bookingMenu: !!directStoreCheck.bookingMenu,
    bookingMenuSelection: directStoreCheck.bookingMenuSelection
  });
  
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>(
    (bookingMenuSelection || []).map((id: any) => String(id)),
  );
  const menu = bookingMenu;
  const [currentStep, setCurrentStep] = useState<BookingStep>(
    isCustomBooking ? "event-details" : "cart",
  );
  console.log("🏠 Chef-at-home currentStep:", currentStep);
  const [bookingData, setBookingData] = useState<Record<string, any>>({});

  // Fetch addons on component mount
  useEffect(() => {
    setAddonsLoading(true);
    addonService.getAddons().then((response) => {
      setAvailableAddons(response.data || []);
      setAddonsLoading(false);
    });
  }, []);

  // Sync selectedAddons with store (same pattern as selectedMenuItems)
  // REMOVE: useState+useEffect pair for selectedAddons
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
    console.log("🏠 Chef-at-home renderStep called with currentStep:", currentStep);
    // Skip cart step for custom booking
    if (isCustomBooking && currentStep === "cart") {
      console.log("🏠 Chef-at-home: Skipping cart step for custom booking");
      handleNext();

      return null;
    }

    switch (currentStep) {
      case "cart":
        if (addonsLoading) return <div className='text-lg text-center py-20'>Loading Addon Services...</div>;
        console.log("[ChefAtHome] Cart step: bookingSelectedAddons =", bookingSelectedAddons);
        console.log("🏠 Chef-at-home rendering cart step with:", {
          bookingSelectedAddons,
          localSelectedAddons: bookingSelectedAddons,
          availableAddonsCount: availableAddons.length,
          selectedMenuItemsCount: selectedMenuItems.length,
          menu: !!menu
        });
        
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
        
        const cartProps = {
          onNext: handleNext,
          menu: menu,
          menuLoading: menuLoading,
          menuError: menuError,
          selectedMenuItems: selectedMenuItems,
          setSelectedMenuItems: setSelectedMenuItems,
          setMenuId: () => {},
          selectedAddons: bookingSelectedAddons, // always from store
          availableAddons: availableAddons,
          onAddonToggle: (addonId: number) => {
            // This toggles - don't mutate in place
            const exists = bookingSelectedAddons.includes(addonId);
            const newAddons = exists
              ? bookingSelectedAddons.filter(a => a !== addonId)
              : [...bookingSelectedAddons, addonId];
            setBookingSelectedAddons(newAddons);
          }
        };
        
        console.log("🏠 Chef-at-home Cart props:", {
          selectedAddons: cartProps.selectedAddons,
          availableAddonsCount: cartProps.availableAddons.length,
          menu: !!cartProps.menu
        });
        
        return <Cart {...cartProps} />;
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

  console.log("🏠 Chef-at-home page about to render, currentStep:", currentStep);
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-2 py-4 sm:px-4 lg:px-6">
      <div className="w-full max-w-4xl">{renderStep()}</div>
    </div>
  );
};

export default ChefAtHomeBookingPage;
