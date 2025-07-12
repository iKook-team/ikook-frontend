"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ChefRegistrationForm1 } from "@/components/auth/chef-registration-form1";
import { ChefRegistrationForm2 } from "@/components/auth/chef-registration-form2";
import { OTPVerification } from "@/components/auth/otp-verification";
import { ChefRegistrationForm3 } from "@/components/auth/chef-registration-form3";
import { ChefRegistrationForm4 } from "@/components/auth/chef-registration-form4";
import { RegistrationForm } from "@/components/auth/registration-form";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { saveTokens } from "@/src/lib/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

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
  const { chefFormData, clearChefFormData } = useAuthStore();
  const searchParams = useSearchParams();

  // Check for verification success in URL params
  useEffect(() => {
    const verified = searchParams.get("verified") === "true";
    if (verified) {
      setStep(4); // Skip to form 4 after email verification
    }
  }, [searchParams]);

  const nextStep = () => setStep((prev) => prev + 1);

  const handleNext = async (data: any) => {
    const newData =
      typeof data === "object" && data !== null && !Array.isArray(data)
        ? data
        : { otp: data };

    setFormData((prev) => ({ ...prev, ...newData }));
    
    if (step === 6) {
      setIsSubmitting(true);
      
      try {
        if (!chefFormData) {
          throw new Error("Chef form data not found");
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

        // Map work authorization to has_work_permit
        const hasWorkPermit = chefFormData.workAuthorization === "yes";
        
        // Map criminal record to has_criminal_record
        const hasCriminalRecord = chefFormData.criminalRecord === "yes";

        // Determine chef services based on service type
        const chefServices = chefFormData.serviceType === "Chef" 
          ? ["Fine Dining", "Chef at Home"] 
          : [];

        // Combine data from all forms
        const signupData = {
          user_type: "Chef",
          first_name: chefFormData.firstName,
          last_name: chefFormData.lastName,
          email: chefFormData.email,
          username: data.username,
          password: data.password,
          phone_number: chefFormData.phoneNumber,
          date_of_birth: chefFormData.dateOfBirth,
          service_type: chefFormData.serviceType,
          chef_services: chefServices,
          country: chefFormData.country,
          city: chefFormData.city,
          landmark: chefFormData.address || "", // TODO: Update later - using address as landmark for now
          address: chefFormData.address,
          postal_code: chefFormData.postalCode,
          has_work_permit: hasWorkPermit,
          has_criminal_record: hasCriminalRecord,
          link_to_cooking_images: chefFormData.instagramAccount || null,
          website: chefFormData.website || null,
          location: location,
          weekly_charges: "0.00", // Default
          monthly_charges: "0.00", // Default
        };

        // Call the signup endpoint
        const response = await authService.signup(signupData);

        // Save tokens
        if (response.data?.access_token && response.data?.refresh_token) {
          saveTokens(response.data.access_token, response.data.refresh_token);
        }

        // Show success toast
        showToast.success("Chef account created successfully! Welcome to iKook.");

        // Clear form data from store
        clearChefFormData();

        // Redirect to chef dashboard
        router.push("/dashboard/chef");
      } catch (error) {
        handleApiError(error, "Chef signup failed. Please try again.");
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
            userType="chef"
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

export default ChefSignupPage;
