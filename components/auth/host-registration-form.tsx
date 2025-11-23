"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { ProgressBar } from "@/components/ui/progress-bar";
import { FormField } from "@/components/ui/form-field";
import { PhoneInput } from "@/components/ui/phone-input";
import { GooglePlacesAutocomplete } from "@/components/ui/google-places-autocomplete";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  referralCode?: string;
  countryCode: string;
  city: string;
}

interface HostRegistrationFormProps {
  onSubmit?: (data: FormData) => void;
}

export const HostRegistrationForm: React.FC<HostRegistrationFormProps> = ({
  onSubmit,
}) => {
  const router = useRouter();
  const { setUserType, setHostFormData } = useAuthStore();
  // Track selected country code for phone input
  const [countryCode, setCountryCode] = useState("NG");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
    clearErrors,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      city: "",
    },
  });

  const onLocalSubmit = async (data: FormData) => {
    try {
      // Set user type to 'host' in global state
      setUserType("host");

      // Save form data locally
      setHostFormData({ ...data, countryCode });

      // Send OTP to email using the real API
      await authService.sendOtp(data.email);

      // Show success toast
      showToast.success("Verification code sent to your email");

      // Remove navigation to /email-verification so the OTP step stays in the flow
      // router.push("/email-verification");
      if (onSubmit) {
        onSubmit({ ...data, countryCode });
      }
    } catch (error) {
      handleApiError(
        error,
        "Failed to send verification code. Please try again.",
      );
    }
  };

  // Check if form is valid by checking if all required fields are filled
  const formValues = watch();

  const isFormValid =
    formValues.firstName?.trim() &&
    formValues.lastName?.trim() &&
    formValues.email?.trim() &&
    formValues.city?.trim() &&
    formValues.phoneNumber?.trim() &&
    Object.keys(errors).length === 0;

  return (
    <div className="mx-auto my-0 flex w-[603px] flex-col items-start justify-center gap-1.5 p-5 max-lg:w-full max-lg:max-w-[603px] max-lg:px-4 max-md:px-3 max-sm:px-2">
      <header>
        <h1 className="h-[30px] w-[201px] text-xl font-medium leading-[30px] text-black">
          Join iKook as a Host
        </h1>
      </header>

      <main className="w-[605px] rounded-[15px] border border-solid border-[#E7E7E7] bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] max-lg:w-full max-lg:max-w-[605px] max-sm:rounded-[10px]">
        <div className="pt-[27px] w-full">
          <ProgressBar progress={25} />
        </div>

        <div className="px-[49px] pt-6 pb-8 max-md:px-6 max-sm:px-4">
          <h1 className="text-[19px] font-medium text-black mb-6 max-sm:text-[17px]">
            Personal Information
          </h1>

          <form onSubmit={handleSubmit(onLocalSubmit)}>
            <fieldset className="flex flex-col items-start gap-6 max-sm:gap-5">
              <legend className="sr-only">Personal Information</legend>

              <FormField
                label="First Name"
                placeholder="Given name"
                required
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
                error={errors.firstName?.message}
                className="w-full"
              />

              <FormField
                label="Last Name"
                placeholder="Family name"
                required
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
                error={errors.lastName?.message}
                className="w-full"
              />

              <FormField
                label="Email Address"
                placeholder="info@ikook.co.uk"
                type="email"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
                className="w-full"
              />

              {/* City selector using Google Places Autocomplete */}
              <GooglePlacesAutocomplete
                value={formValues.city || ""}
                onChange={(city) => {
                  setValue("city", city, { shouldValidate: true });
                  clearErrors("city");
                }}
                placeholder="Enter city"
                label="City/State"
                error={errors.city?.message}
                required
                className="w-full"
              />

              <PhoneInput
                label="Phone Number"
                placeholder="Enter your phone number"
                required
                value={formValues.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  // Validate phone number
                  if (!value || value.trim() === "") {
                    setValue("phoneNumber", value, { shouldValidate: true });
                  } else if (value.trim().length < 7) {
                    setValue("phoneNumber", value, { shouldValidate: true });
                  } else {
                    setValue("phoneNumber", value, { shouldValidate: true });
                    clearErrors("phoneNumber");
                  }
                }}
                onCountryChange={(code) => setCountryCode(code)}
                error={errors.phoneNumber?.message}
                className="w-full"
              />

              <FormField
                label="Referral Code (Optional)"
                placeholder="Enter referral code"
                {...register("referralCode")}
                className="w-full"
              />
            </fieldset>

            <button
              className="mt-8 h-12 w-full cursor-pointer gap-2 rounded-lg border border-solid border-[#FCC01C] bg-[#FCC01C] px-4 py-3 text-base font-semibold leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!isFormValid || isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Sending..." : "Continue"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
