"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { HostRegistrationForm } from "@/components/auth/host-registration-form";
import { RegistrationForm } from "@/components/auth/registration-form";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { saveTokens } from "@/src/lib/auth";

const HostSignupPage: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  // Form data for registration
  const [formData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const { hostFormData, clearHostFormData } = useAuthStore();

  // Check for verification success in URL params
  useEffect(() => {
    const verified = searchParams.get("verified") === "true";

    if (verified) {
      setShowRegistrationForm(true);
    }
  }, [searchParams]);

  const handleRegistrationSubmit = async (data: { username: string; password: string; confirmPassword: string }) => {
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

      // Combine data from both forms
      const signupData = {
        user_type: "Host",
        first_name: hostFormData.firstName,
        last_name: hostFormData.lastName,
        email: hostFormData.email,
        username: data.username,
        password: data.password,
        phone_number: hostFormData.phoneNumber,
        country: "Nigeria", // Default country since not in UI
        location: location,
        referral_code: hostFormData.referralCode || undefined,
      };

      // Call the signup endpoint
      const response = await authService.signup(signupData);

      // Save tokens
      if (response.data?.access_token && response.data?.refresh_token) {
        saveTokens(response.data.access_token, response.data.refresh_token);
      }

      // Clear form data from store
      clearHostFormData();

      // Redirect to host dashboard
      window.location.href = "/dashboard/host";
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        {showRegistrationForm ? (
          <RegistrationForm
            formData={formData}
            isSubmitting={isSubmitting}
            userType="host"
            onSubmit={handleRegistrationSubmit}
          />
        ) : (
          <HostRegistrationForm />
        )}
      </main>
    </div>
  );
};

export default HostSignupPage;
