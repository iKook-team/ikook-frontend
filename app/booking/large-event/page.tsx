"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";

import { Cart } from "@/components/cart/cart";
import { EventDetailsForm } from "@/components/booking/event-details-form";
import { EventDetailsForm2 } from "@/components/booking/event-details-form2";
import { EventDetailsForm3 } from "@/components/booking/event-details-form3";
import { PreferencesForm } from "@/components/booking/preferences";
import { MessagesForm } from "@/components/booking/message-form";
import { Checkout } from "@/components/checkout/checkout";
import BudgetStep from "@/components/booking/budget-step";

type BookingStep =
  | "cart"
  | "event-details"
  | "event-details2"
  | "event-details3"
  | "budget"
  | "preferences"
  | "messages"
  | "checkout";

const LargeEventBookingPage = () => {
  const bookingMenu = useAuthStore((s) => s.bookingMenu);
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const bookingMenuSelection = useAuthStore((s) => s.bookingMenuSelection);
  const setBookingMenuSelection = useAuthStore((s) => s.setBookingMenuSelection);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>(
    (bookingMenuSelection || []).map((id: any) => String(id))
  );
  const menu = bookingMenu;
  const [currentStep, setCurrentStep] = useState<BookingStep>("cart");
  const [bookingData, setBookingData] = useState<Record<string, any>>({});
  const [eventDetailsForm, setEventDetailsForm] = useState({
    location: "",
    eventDate: "",
    guests: menu?.num_of_guests || 1,
  });
  const [eventDetailsForm2, setEventDetailsForm2] = useState({
    eventType: "",
    preferredCuisines: [],
  });
  const [eventDetailsForm3, setEventDetailsForm3] = useState({
    eventTime: "",
    venue: "",
  });
  const [budgetStep, setBudgetStep] = useState({
    budget: 1500,
    budgetType: null as "Flexible" | "Fixed" | null,
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

    const steps: BookingStep[] = [
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
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    const steps: BookingStep[] = [
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
      case "event-details2":
        return (
          <EventDetailsForm2
            onBack={handleBack}
            onNext={handleNext}
            menu={menu}
            formData={eventDetailsForm2}
            onChange={setEventDetailsForm2}
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
      case "budget":
        return (
          <BudgetStep
            onBack={handleBack}
            menu={menu}
            guestCount={eventDetailsForm.guests}
            onNext={(data) => {
              setBudgetStep({
                budget: data.budget,
                budgetType: data.budgetType === 'flexible' ? 'Flexible' : data.budgetType === 'fixed' ? 'Fixed' : null
              });
              handleNext(data);
            }}
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
            budget={budgetStep.budget}
            budgetType={budgetStep.budgetType}
            preferredCuisines={eventDetailsForm2.preferredCuisines}
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

export default LargeEventBookingPage;
