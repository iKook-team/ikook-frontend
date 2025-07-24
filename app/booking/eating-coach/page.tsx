"use client";

import React, { useState } from "react";
import EatingCoachForm from "@/components/booking/eating-coach-form";
import PreferencesForm from "@/components/booking/preferences";
import EatingCoachMessageForm from "@/components/booking/eating-coach-message-form";
import { StatusCard } from "@/components/booking/status-card";
import { useAuthStore } from "@/lib/store/auth-store";

export default function EatingCoachBookingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { bookingService } = useAuthStore();

  const handleNext = (data?: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
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
          onChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
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