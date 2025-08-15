"use client";

import React, { useState } from "react";
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

type BookingStep =
  | "cart"
  | "meal-details"
  | "meal-details2"
  | "meal-details3"
  | "meal-details4"
  | "delivery"
  | "preferences"
  | "messages"
  | "checkout";

const MealPrepBookingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCustomBooking = searchParams.get("is_custom") === "true";
  const [currentStep, setCurrentStep] = useState<BookingStep>(
    isCustomBooking ? "meal-details" : "cart",
  );
  const [bookingData, setBookingData] = useState<Record<string, any>>({});
  const [formData, setFormData] = useState<Record<string, any>>({
    allergyDetails: "",
    dietaryRestrictions: [],
  });
  const menu = useAuthStore((s) => s.bookingMenu);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const setMenuId = (id: number) => {};

  const handleNext = (data?: Record<string, any>) => {
    if (data) {
      if (data.bookingId) setBookingId(data.bookingId);
      setBookingData((prev) => ({ ...prev, ...data }));
    }

    const steps: BookingStep[] = [
      "cart",
      "meal-details",
      "meal-details2",
      "meal-details3",
      "meal-details4",
      "delivery",
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
      "meal-details",
      "meal-details2",
      "meal-details3",
      "meal-details4",
      "delivery",
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
            setMenuId={setMenuId}
          />
        );
      case "meal-details":
        return <MealDetailsForm onBack={handleBack} onNext={handleNext} />;
      case "meal-details2":
        return <MealDetailsForm2 onBack={handleBack} onNext={handleNext} />;
      case "meal-details3":
        return <MealDetailsForm3 onBack={handleBack} onNext={handleNext} />;
      case "meal-details4":
        return <MealDetailsForm4 onBack={handleBack} onNext={handleNext} />;
      case "delivery":
        return <DeliveryForm onBack={handleBack} onNext={handleNext} />;
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
          />
        );
      case "messages":
        return <MessagesForm onBack={handleBack} onNext={handleNext} />;
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
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      {renderStep()}
    </div>
  );
};

export default MealPrepBookingPage;
