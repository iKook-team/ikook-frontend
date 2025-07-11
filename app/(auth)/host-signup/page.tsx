"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { HostRegistrationForm } from "@/components/auth/host-registration-form";
import { RegistrationForm } from "@/components/auth/registration-form";
import { useAuthStore } from "@/lib/store/auth-store";

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

  useAuthStore(); // Initialize auth store if needed

  // Check for verification success in URL params
  useEffect(() => {
    const verified = searchParams.get("verified") === "true";

    if (verified) {
      setShowRegistrationForm(true);
    }
  }, [searchParams]);

  const handleRegistrationSubmit = async (_data: unknown) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to host dashboard
      window.location.href = "/dashboard/host";
    } catch {
      // Error handling would go here in a real app
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
