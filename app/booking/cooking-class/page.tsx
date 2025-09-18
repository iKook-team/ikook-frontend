"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ClassDetailsForm } from "@/components/booking/class-details-form";
import { ClassDetailsForm2 } from "@/components/booking/class-details-form2";
import { ClassDetailsForm3 } from "@/components/booking/class-details-form3";
import { ClassRate } from "@/components/booking/class-rate";
import BudgetStep from "@/components/booking/budget-step";
import { PreferencesForm } from "@/components/booking/preferences";
import CookingClassMessageForm from "@/components/booking/cooking-class-message-form";
import { StatusCard } from "@/components/booking/status-card";
import { useAuthStore } from "@/lib/store/auth-store";

const steps = [
  "class-details",
  "class-details2",
  "class-details3",
  "class-rate",
  "budget",
  "preferences",
  "message",
  "status",
] as const;

type Step = (typeof steps)[number];

const CookingClassBookingPage = () => {
  // All hooks must be called unconditionally at the top level
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isValidService, setIsValidService] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const router = useRouter();
  const { bookingService, setBookingService } = useAuthStore();

  // Validate service from store
  useEffect(() => {
    if (!bookingService?.id) {
      console.log(
        "[CookingClassBookingPage] No service found in store, redirecting to home",
      );
      router.push("/");

      return;
    }

    const id = parseInt(bookingService.id, 10);

    if (isNaN(id)) {
      console.error(
        "[CookingClassBookingPage] Invalid service ID in store, redirecting",
      );
      router.push("/");

      return;
    }

    setServiceId(id);
    setIsValidService(true);
    setIsLoading(false);

    // No need to fetch service details as they should be in the store
    console.log(
      "[CookingClassBookingPage] Using service from store:",
      bookingService,
    );
  }, [bookingService, router]);

  // Show loading state while checking service
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  // If service is not valid, show nothing (redirect will happen in useEffect)
  if (!isValidService) {
    return null;
  }

  const handleNext = (data?: Record<string, any>) => {
    if (data) setFormData((prev) => ({ ...prev, ...data }));
    const idx = steps.indexOf(currentStep);

    if (idx < steps.length - 1) {
      setCurrentStep(steps[idx + 1]);
      window.scrollTo(0, 0);
    }
  };
  const handleBack = () => {
    const idx = steps.indexOf(currentStep);

    if (idx > 0) {
      setCurrentStep(steps[idx - 1]);
      window.scrollTo(0, 0);
    }
  };

  let StepComponent;

  switch (currentStep) {
    case "class-details":
      StepComponent = (
        <ClassDetailsForm
          onNext={handleNext}
          onBack={handleBack}
          initialValues={{
            location: formData.location || "",
            teaching: formData.teaching || "",
            guests: formData.guests || 1,
          }}
          chefName={bookingService?.chef?.first_name ? `Chef ${bookingService.chef.first_name}` : 'Chef'}
        />
      );
      break;
    case "class-details2":
      StepComponent = (
        <ClassDetailsForm2
          onNext={handleNext}
          onBack={handleBack}
          initialValues={{
            appearance: formData.appearance || "",
            experience: formData.experience || "",
            days: formData.days || 1,
          }}
          chefName={bookingService?.chef?.first_name ? `Chef ${bookingService.chef.first_name}` : 'Chef'}
        />
      );
      break;
    case "class-details3":
      StepComponent = (
        <ClassDetailsForm3
          onNext={handleNext}
          onBack={handleBack}
          initialValues={{
            startDate: formData.startDate || "",
            endDate: formData.endDate || "",
            cuisines: formData.cuisines || [],
          }}
          chefName={bookingService?.chef?.first_name ? `Chef ${bookingService.chef.first_name}` : 'Chef'}
        />
      );
      break;
    case "class-rate":
      StepComponent = <ClassRate onNext={handleNext} onBack={handleBack} />;
      break;
    case "budget":
      StepComponent = (
        <BudgetStep
          onNext={(data) => {
            setFormData((prev) => ({
              ...prev,
              budget: data.budget,
              budgetType: data.budgetType,
            }));
            handleNext(data);
          }}
          onBack={handleBack}
          menu={bookingService}
          guestCount={formData.guests || 1}
        />
      );
      break;
    case "preferences":
      StepComponent = (
        <PreferencesForm
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            handleNext(data);
          }}
          onBack={handleBack}
          formData={formData}
          onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
          menu={bookingService}
        />
      );
      break;
    case "message":
      StepComponent = (
        <CookingClassMessageForm
          onNext={handleNext}
          onBack={handleBack}
          bookingData={formData}
          serviceId={serviceId || undefined}
          service={bookingService}
          dietaryRestrictions={formData.dietaryRestrictions || []}
          budget={formData.budget}
          budgetType={formData.budgetType}
          preferredCuisines={formData.preferredCuisines || []}
        />
      );
      break;
    case "status":
      StepComponent = (
        <StatusCard
          bookingId={
            formData?.bookingId != null ? String(formData.bookingId) : undefined
          }
        />
      );
      break;
    default:
      StepComponent = null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {StepComponent}
    </div>
  );
};

export default CookingClassBookingPage;
