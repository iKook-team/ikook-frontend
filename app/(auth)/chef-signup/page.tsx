"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { ChefRegistrationForm1 } from "@/components/auth/chef-registration-form1";
import { ChefRegistrationForm2 } from "@/components/auth/chef-registration-form2";
import { OTPVerification } from "@/components/auth/otp-verification";
import { ChefRegistrationForm3 } from "@/components/auth/chef-registration-form3";
import { ChefRegistrationForm4 } from "@/components/auth/chef-registration-form4";
import { RegistrationForm } from "@/components/auth/registration-form";

interface AllFormData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  serviceType?: string;
  email?: string;
  phoneNumber?: string;
  otp?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  workAuthorization?: string;
  criminalRecord?: string;
  instagramAccount?: string;
  website?: string;
  password?: string;
  confirmPassword?: string;
}

const ChefSignupPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AllFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);

  const handleNext = (data: any) => {
    const newData =
      typeof data === "object" && data !== null && !Array.isArray(data)
        ? data
        : { otp: data };

    setFormData((prev) => ({ ...prev, ...newData }));
    if (step === 6) {
      setIsSubmitting(true);
      // This is where you would typically make an API call to register the chef
      // For demonstration, we'll just log the data and redirect.
      setTimeout(() => {
        setIsSubmitting(false);
        router.push("/dashboard/chef");
      }, 1000);
    } else {
      nextStep();
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <ChefRegistrationForm1
            formData={formData}
            isSubmitting={isSubmitting}
            onSubmit={handleNext}
          />
        );
      case 2:
        return (
          <ChefRegistrationForm2
            formData={formData}
            isSubmitting={isSubmitting}
            onSubmit={handleNext}
          />
        );
      case 3:
        return (
          <OTPVerification
            isSubmitting={isSubmitting}
            onSubmit={handleNext}
          />
        );
      case 4:
        return (
          <ChefRegistrationForm3
            formData={formData}
            isSubmitting={isSubmitting}
            onSubmit={handleNext}
          />
        );
      case 5:
        return (
          <ChefRegistrationForm4
            formData={formData}
            isSubmitting={isSubmitting}
            onSubmit={handleNext}
          />
        );
      case 6:
        return (
          <RegistrationForm
            formData={formData}
            isSubmitting={isSubmitting}
            onSubmit={handleNext}
          />
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative flex items-center justify-center min-h-screen">
        {renderForm()}
      </main>
    </div>
  );
};

export default ChefSignupPage;
