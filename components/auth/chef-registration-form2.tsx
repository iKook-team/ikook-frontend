"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FormField } from "@/components/ui/form-field";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PhoneInput } from "@/components/ui/phone-input";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";

interface ChefRegistrationForm2Props {
  formData: {
    email?: string;
    phoneNumber?: string;
  };
  isSubmitting: boolean;
  onSubmit: (data: any) => void;
}

export const ChefRegistrationForm2: React.FC<ChefRegistrationForm2Props> = ({
  formData: initialFormData,
  isSubmitting,
  onSubmit,
}) => {
  const router = useRouter();
  const { setUserType, setChefFormData, chefFormData } = useAuthStore();
  const [formData, setFormData] = useState({
    email: initialFormData.email || "",
    phoneNumber: initialFormData.phoneNumber || "",
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    try {
      // Set user type to 'chef' in global state
      setUserType("chef");

      // Update chef form data with email and phone
      const updatedChefData = {
        ...chefFormData,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };

      setChefFormData(updatedChefData);

      // Send OTP to email using the real API
      await authService.sendOtp(formData.email);

      // Notify parent to advance to OTP step
      if (onSubmit) {
        onSubmit(formData);
      }
      // Remove navigation to /email-verification
      // router.push("/email-verification");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to send verification code. Please try again.");
    }
  };

  return (
    <div className="mx-auto my-0 flex w-[603px] flex-col items-start justify-center gap-1.5 p-5 max-lg:w-full max-lg:max-w-[603px] max-lg:px-4 max-md:px-3 max-sm:px-2">
      <header>
        <h1 className="h-[30px] w-[201px] text-xl font-medium leading-[30px] text-black">
          Join iKook as a Chef
        </h1>
      </header>

      <main className="w-[605px] rounded-[15px] border border-solid border-[#E7E7E7] bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] max-lg:w-full max-lg:max-w-[605px] max-sm:rounded-[10px]">
        <div className="pt-[27px] w-full">
          <ProgressBar progress={40} />
        </div>

        <div className="px-[49px] pt-6 pb-8 max-md:px-6 max-sm:px-4">
          <h1 className="text-[19px] font-medium text-black mb-6 max-sm:text-[17px]">
            Contact Information
          </h1>

          <form onSubmit={handleSubmit}>
            <fieldset className="flex w-full flex-col items-start gap-6">
              <legend className="sr-only">Contact Information</legend>

              <FormField
                required
                className="w-full"
                error={errors.email}
                label="Email Address"
                placeholder="your.email@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />

              <div className="w-full">
                <PhoneInput
                  error={errors.phoneNumber}
                  label="Phone Number"
                  placeholder="Enter phone number"
                  required={true}
                  value={formData.phoneNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  onCountryChange={(_countryCode: string) => {
                    // Handle country code change if needed
                  }}
                />
              </div>
            </fieldset>

            <div className="mt-8 h-12 w-full">
              <button
                className="h-12 w-full cursor-pointer gap-2 rounded-lg border border-solid border-[#FCC01C] bg-[#FCC01C] px-4 py-3 text-base font-semibold leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Submitting..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
