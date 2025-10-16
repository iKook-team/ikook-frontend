"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { Cart } from "@/components/cart/cart";
import MealDetailsForm from "@/components/booking/meal-details-form";
import MealDetailsForm2 from "@/components/booking/meal-details-form2";
import MealDetailsForm3 from "@/components/booking/meal-details-form3";
import MealDetailsForm4 from "@/components/booking/meal-details-form4";
import DeliveryForm from "@/components/booking/delivery-form";
import { PreferencesForm } from "@/components/booking/preferences";
import { MessagesForm } from "@/components/booking/message-form";
import { Checkout } from "@/components/checkout/checkout";
import BudgetStep from "@/components/booking/budget-step";
import { saveBookingDraft, getBookingDraft, clearBookingDraft } from "@/lib/booking-intent";
import { addonService } from "@/lib/api/addons";

type BookingStep =
  | "cart"
  | "meal-details"
  | "meal-details2"
  | "meal-details3"
  | "meal-details4"
  | "delivery"
  | "preferences"
  | "budget"
  | "messages"
  | "checkout";

const MealPrepBookingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCustomBooking = searchParams.get("is_custom") === "true";
  const isResuming = searchParams.get("resume") === "true";
  const [currentStep, setCurrentStep] = useState<BookingStep>(
    isCustomBooking ? "meal-details" : "cart",
  );
  const [bookingData, setBookingData] = useState<Record<string, any>>({});
  // Persist budget across navigation, similar to Large Event
  const [budgetStep, setBudgetStep] = useState<{
    budget: number;
    budgetType: "flexible" | "fixed" | null;
  }>({ budget: 0, budgetType: null });
  const [formData, setFormData] = useState<Record<string, any>>({
    allergyDetails: "",
    dietaryRestrictions: [],
  });

  // Fetch addons on component mount
  useEffect(() => {
    setAddonsLoading(true);
    addonService.getAddons().then((response) => {
      setAvailableAddons(response.data || []);
      setAddonsLoading(false);
    });
  }, []);
  const menu = useAuthStore((s) => s.bookingMenu);
  const setBookingMenu = useAuthStore((s) => s.setBookingMenu);
  const bookingMenuSelection = useAuthStore((s) => s.bookingMenuSelection);
  const setBookingMenuSelection = useAuthStore((s) => s.setBookingMenuSelection);
  const bookingSelectedAddons = useAuthStore((s) => s.bookingSelectedAddons) || [];
  const setBookingSelectedAddons = useAuthStore((s) => s.setBookingSelectedAddons);
  const [availableAddons, setAvailableAddons] = React.useState<any[]>([]);
  const [addonsLoading, setAddonsLoading] = React.useState(true);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const setMenuId = (id: number) => {};

  React.useEffect(() => {
    if (isResuming) {
      const draft = getBookingDraft();
      if (draft) {
        setCurrentStep(draft.step as BookingStep);
        setBookingData(draft.data.bookingData || {});
        setBudgetStep(draft.data.budgetStep || { budget: 0, budgetType: null });
        setFormData(draft.data.formData || { allergyDetails: "", dietaryRestrictions: [] });
        setSelectedMenuItems(draft.data.selectedMenuItems || []);
        setBookingId(draft.data.bookingId || null);
        clearBookingDraft();
      }
    }
  }, [isResuming]);

  const handleNext = (data?: Record<string, any>) => {
    if (data) {
      if (data.bookingId) setBookingId(data.bookingId);
      // Map step-specific keys to the keys expected by MessagesForm payload
      const mapped: Record<string, any> = { ...data };
      if ("deliveryAddress" in data) mapped.location = data.deliveryAddress;
      if ("guests" in data) {
        mapped.guests = data.guests;
        mapped.numOfPersons = data.guests;
      }
      if ("numberOfWeeks" in data) mapped.numOfWeeks = data.numberOfWeeks;
      if ("weeklyVisits" in data) mapped.numOfWeeklyVisits = data.weeklyVisits;
      if ("option" in data) mapped.deliveryOption = data.option;
      if ("days" in data) mapped.deliveryDays = data.days;
      setBookingData((prev) => ({
        service: "Meal Prep",
        ...prev,
        ...mapped,
      }));
    }
    const steps: BookingStep[] = isCustomBooking
      ? [
          "meal-details",
          "meal-details2",
          "meal-details3",
          "meal-details4",
          "delivery",
          "preferences",
          "budget",
          "messages",
          "checkout",
        ]
      : [
          "cart",
          "meal-details",
          "meal-details2",
          "meal-details3",
          "meal-details4",
          "delivery",
          "preferences",
          "budget",
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
        budgetStep,
        formData,
        selectedMenuItems,
        bookingId,
      },
    });
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      window.scrollTo(0, 0); // Scroll to top on step change
    }
  };

  const handleBack = () => {
    const steps: BookingStep[] = isCustomBooking
      ? [
          "meal-details",
          "meal-details2",
          "meal-details3",
          "meal-details4",
          "delivery",
          "preferences",
          "budget",
          "messages",
          "checkout",
        ]
      : [
          "cart",
          "meal-details",
          "meal-details2",
          "meal-details3",
          "meal-details4",
          "delivery",
          "preferences",
          "budget",
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
        if (addonsLoading) return <div className='text-lg text-center py-20'>Loading Addon Services...</div>;
        
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
            menuError={!menu ? "No menu data found. Please start from the menu detail page." : null}
            selectedMenuItems={selectedMenuItems}
            setSelectedMenuItems={setSelectedMenuItems}
            setMenuId={() => {}}
            selectedAddons={bookingSelectedAddons}
            availableAddons={availableAddons}
            onAddonToggle={(addonId: number) => {
              const exists = bookingSelectedAddons.includes(addonId);
              const newAddons = exists
                ? bookingSelectedAddons.filter(a => a !== addonId)
                : [...bookingSelectedAddons, addonId];
              setBookingSelectedAddons(newAddons);
            }}
          />
        );
      case "meal-details2":
        return (
          <MealDetailsForm2
            onBack={handleBack}
            onNext={handleNext}
            isCustomBooking={isCustomBooking}
            menu={menu}
            initialNumberOfWeeks={
              bookingData.numberOfWeeks || bookingData.numOfWeeks || 1
            }
            initialWeeklyVisits={
              bookingData.weeklyVisits || bookingData.numOfWeeklyVisits || 1
            }
            initialExperience={bookingData.experience || ""}
          />
        );
      case "meal-details3":
        return (
          <MealDetailsForm3
            onBack={handleBack}
            onNext={handleNext}
            isCustomBooking={isCustomBooking}
            menu={menu}
            initialMealType={
              Array.isArray(bookingData.mealType)
                ? bookingData.mealType
                : bookingData.mealType
                  ? [bookingData.mealType]
                  : []
            }
            initialPreferredCuisines={bookingData.preferredCuisines || []}
          />
        );
      case "meal-details4":
        return (
          <MealDetailsForm4
            onBack={handleBack}
            onNext={handleNext}
            isCustomBooking={isCustomBooking}
            menu={menu}
            initialStartDate={bookingData.startDate || ""}
            initialEndDate={bookingData.endDate || ""}
            initialDeliveryTime={bookingData.deliveryTime || ""}
          />
        );
      case "delivery":
        return (
          <DeliveryForm
            onBack={handleBack}
            onNext={handleNext}
            isCustomBooking={isCustomBooking}
            menu={menu}
            initialOption={bookingData.deliveryOption || ""}
            initialDays={bookingData.deliveryDays || []}
          />
        );
      case "preferences":
        return (
          <PreferencesForm
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            onChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
            menu={menu}
            isCustomBooking={isCustomBooking}
          />
        );
      case "budget":
        return (
          <BudgetStep
            onBack={handleBack}
            onNext={(data) => {
              setBudgetStep({
                budget: data.budget,
                budgetType: data.budgetType,
              });
              handleNext({
                budget: data.budget,
                budgetType:
                  data.budgetType === "flexible"
                    ? "Flexible"
                    : data.budgetType === "fixed"
                      ? "Fixed"
                      : null,
              });
            }}
            menu={menu}
            guestCount={bookingData.guests || 0}
            isCustomBooking={isCustomBooking}
            initialBudget={budgetStep.budget}
            initialBudgetType={budgetStep.budgetType}
          />
        );
      case "messages":
        return (
          <MessagesForm
            onBack={handleBack}
            onNext={handleNext}
            bookingData={{ service: "Meal Prep", ...bookingData }}
            dietaryRestrictions={formData.dietaryRestrictions}
            preferredCuisines={bookingData.preferredCuisines || []}
            budget={budgetStep.budget}
            budgetType={
              budgetStep.budgetType === "fixed"
                ? "Fixed"
                : budgetStep.budgetType === "flexible"
                  ? "Flexible"
                  : null
            }
            isCustomBooking={isCustomBooking}
            menu={menu}
            selectedAddons={bookingSelectedAddons}
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
            setMenuId={setMenuId}
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

export default MealPrepBookingPage;
