"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { HostRegistrationForm } from "@/components/auth/host-registration-form";
import { OTPVerification } from "@/components/auth/otp-verification";
import { RegistrationForm } from "@/components/auth/registration-form";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { saveTokens } from "@/src/lib/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

interface AllFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  referralCode?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
}

const HostSignupPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AllFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { hostFormData, clearHostFormData } = useAuthStore();
  const searchParams = useSearchParams();

  // Check for verification success in URL params
  useEffect(() => {
    const verified = searchParams.get("verified") === "true";
    if (verified) {
      setStep(2); // Skip to form 2 after email verification
    }
  }, [searchParams]);

  const nextStep = () => setStep((prev) => prev + 1);

  const handleNext = async (data: any) => {
    const newData =
      typeof data === "object" && data !== null && !Array.isArray(data)
        ? data
        : { otp: data };

    setFormData((prev) => ({ ...prev, ...newData }));
    
    if (step === 3) {
      setIsSubmitting(true);
      
      try {
        if (!hostFormData) {
          throw new Error("Host form data not found");
        }

        // Get user location from localStorage
        let location = "POINT(0.0 0.0)"; // Default location
        if (typeof window !== "undefined") {
          const userLocation = localStorage.getItem("userLocation");
          if (userLocation) {
            try {
              const coords = JSON.parse(userLocation);
              if (coords.latitude && coords.longitude) {
                location = `POINT(${coords.longitude} ${coords.latitude})`;
              }
            } catch (error) {
              console.warn("Failed to parse user location from localStorage:", error);
            }
          }
        }

        // Combine data from all forms
        const signupData = {
          user_type: "Host",
          first_name: hostFormData.firstName,
          last_name: hostFormData.lastName,
          email: hostFormData.email,
          username: data.username,
          password: data.password,
          phone_number: hostFormData.phoneNumber,
          referral_code: hostFormData.referralCode || "",
          location: location,
        };

        // Call the signup endpoint
        const response = await authService.signup(signupData);

        // Save tokens
        if (response.data?.access_token && response.data?.refresh_token) {
          saveTokens(response.data.access_token, response.data.refresh_token);
        }

        // Show success toast
        showToast.success("Host account created successfully! Welcome to iKook.");

        // Clear form data from store
        clearHostFormData();

        // Redirect to host dashboard
        router.push("/dashboard/host");
      } catch (error) {
        handleApiError(error, "Host signup failed. Please try again.");
        setIsSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <HostRegistrationForm />
        );
      case 2:
        return (
          <OTPVerification
            isSubmitting={isSubmitting}
            onSubmit={handleNext}
          />
        );
      case 3:
        return (
          <RegistrationForm
            formData={formData}
            isSubmitting={isSubmitting}
            userType="host"
            onSubmit={handleNext}
          />
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        {renderForm()}
      </main>
    </div>
  );
};

export default HostSignupPage;
