"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ClassDetailsForm } from "@/components/booking/class-details-form";
import { ClassDetailsForm2 } from "@/components/booking/class-details-form2";
import { ClassDetailsForm3 } from "@/components/booking/class-details-form3";
import { ClassRate } from "@/components/booking/class-rate";
import BudgetStep from "@/components/booking/budget-step";
import { PreferencesForm } from "@/components/booking/preferences";
import CookingClassMessageForm from "@/components/booking/cooking-class-message-form";
import { StatusCard } from "@/components/booking/status-card";
import { useAuthStore } from "@/lib/store/auth-store";
import { listingService } from "@/lib/api/listing";
import { showToast } from "@/lib/utils/toast";

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
type Step = typeof steps[number];

const CookingClassBookingPage = () => {
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const router = useRouter();
  const { bookingService, setBookingService } = useAuthStore();
  
  // Ensure we have a valid booking service
  if (!bookingService || !bookingService.id) {
    console.error("[CookingClassBookingPage] No booking service found in store");
    router.push('/');
    return null;
  }
  
  const validatedServiceId = parseInt(bookingService.id, 10);
  if (isNaN(validatedServiceId)) {
    console.error("[CookingClassBookingPage] Invalid service ID in store:", bookingService.id);
    router.push('/');
    return null;
  }

  const [isLoading, setIsLoading] = useState(!bookingService);
  
  // Set the booking service when the component mounts
  useEffect(() => {
    const fetchService = async () => {
      try {
        // Only fetch service details if we have a service ID and don't already have complete service details
        if (validatedServiceId) {
          const hasCompleteDetails = bookingService?.name && bookingService?.description && bookingService?.price;
          
          if (!hasCompleteDetails) {
            console.log("[CookingClassBookingPage] Fetching service details for ID:", validatedServiceId);
            const service = await listingService.getServiceById(validatedServiceId);
            console.log("[CookingClassBookingPage] Fetched service:", service);
            
            // Only update if we got valid service data
            if (service) {
              setBookingService((prev: any) => ({
                ...prev,
                ...service,
                id: validatedServiceId.toString()
              }));
            }
          } else {
            console.log("[CookingClassBookingPage] Using existing service details");
          }
        }
      } catch (error) {
        console.error('[CookingClassBookingPage] Error fetching service:', error);
        showToast.error('Failed to load service details. Please try again.');
        router.push('/');
      }
    };
    
    fetchService();
    
    // Clean up when component unmounts
    return () => {
      // Don't clear the booking service here as we need it during the booking flow
    };
  }, [validatedServiceId, bookingService, setBookingService, router]);

  const handleNext = (data?: Record<string, any>) => {
    if (data) setFormData(prev => ({ ...prev, ...data }));
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
      StepComponent = <ClassDetailsForm onNext={handleNext} onBack={handleBack} />;
      break;
    case "class-details2":
      StepComponent = <ClassDetailsForm2 onNext={handleNext} onBack={handleBack} />;
      break;
    case "class-details3":
      StepComponent = <ClassDetailsForm3 onNext={handleNext} onBack={handleBack} />;
      break;
    case "class-rate":
      StepComponent = <ClassRate onNext={handleNext} onBack={handleBack} />;
      break;
    case "budget":
      StepComponent = (
        <BudgetStep
          onNext={(data) => {
            setFormData(prev => ({
              ...prev,
              budget: data.budget,
              budgetType: data.budgetType
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
            setFormData(prev => ({ ...prev, ...data }));
            handleNext(data);
          }}
          onBack={handleBack}
          formData={formData}
          onChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
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
          serviceId={validatedServiceId}
          service={bookingService}
          dietaryRestrictions={formData.dietaryRestrictions || []}
          budget={formData.budget}
          budgetType={formData.budgetType}
          preferredCuisines={formData.preferredCuisines || []}
        />
      );
      break;
    case "status":
      StepComponent = <StatusCard />;
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
