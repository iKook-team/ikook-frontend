"use client";

import React, { useState } from "react";

import EatingCoachForm from "@/components/booking/eating-coach-form";
import PreferencesForm from "@/components/booking/preferences";
import EatingCoachMessageForm from "@/components/booking/eating-coach-message-form";
import { StatusCard } from "@/components/booking/status-card";
import { useAuthStore } from "@/lib/store/auth-store";
import { saveBookingDraft, getBookingDraft, clearBookingDraft } from "@/lib/booking-intent";
import { useSearchParams } from "next/navigation";

export default function EatingCoachBookingPage() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isResuming = searchParams?.get("resume") === "true";
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { bookingService } = useAuthStore();

  React.useEffect(() => {
    if (isResuming) {
      const draft = getBookingDraft();
      if (draft) {
        setStep(Number(draft.step) || 0);
        setFormData(draft.data.formData || {});
        clearBookingDraft();
      }
    }
  }, [isResuming]);

  const handleNext = (data?: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    // Save draft on every step with the *next* step
    saveBookingDraft({
      step: String(step + 1),
      data: {
        formData,
      },
    });
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <>
      {step === 0 && (
        <EatingCoachForm onNext={handleNext} onBack={handleBack} />
      )}
      {step === 1 && (
        <PreferencesForm
          onNext={handleNext}
          onBack={handleBack}
          formData={formData}
          onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
        />
      )}
      {step === 2 && (
        <EatingCoachMessageForm
          onNext={handleNext}
          onBack={handleBack}
          bookingData={formData}
          service={bookingService}
        />
      )}
      {step === 3 && <StatusCard />}
    </>
  );
}
