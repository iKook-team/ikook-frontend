"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ClassDetailsForm } from "@/components/booking/class-details-form";
import { ClassDetailsForm2 } from "@/components/booking/class-details-form2";
import { ClassDetailsForm3 } from "@/components/booking/class-details-form3";
import { ClassRate } from "@/components/booking/class-rate";
import BudgetStep from "@/components/booking/budget-step";
import { PreferencesForm } from "@/components/booking/preferences";
import MessagesForm from "@/components/booking/message-form";
import { StatusCard } from "@/components/booking/status-card";

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
      StepComponent = <BudgetStep onNext={handleNext} onBack={handleBack} />;
      break;
    case "preferences":
      StepComponent = <PreferencesForm onNext={handleNext} onBack={handleBack} />;
      break;
    case "message":
      StepComponent = <MessagesForm onNext={handleNext} onBack={handleBack} />;
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
