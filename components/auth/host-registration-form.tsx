"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { ProgressBar } from "@/components/ui/progress-bar";
import { FormField } from "@/components/ui/form-field";
import { PhoneInput } from "@/components/ui/phone-input";
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
    formValues.phoneNumber?.trim() &&
    Object.keys(errors).length === 0;

  return (
    <div className="mx-auto my-0 flex w-[603px] flex-col items-start justify-center gap-1.5 p-5">
      <header>
        <h1 className="h-[30px] w-[201px] text-xl font-medium leading-[30px] text-black">
          Join iKook as a Host
        </h1>
      </header>

      <main className="relative h-[750px] w-[605px] rounded-[15px] border border-solid border-[#E7E7E7] bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)]">
        <div className="absolute top-[27px] left-0 w-full px-0">
          <ProgressBar progress={25} />
        </div>

        <h1 className="absolute top-[51px] left-[49px] h-[29px] w-[275px] text-[19px] font-medium text-black">
          Personal Information
        </h1>

        <form
          onSubmit={handleSubmit(onLocalSubmit)}
          className="absolute w-[508px] left-[49px] top-[104px] max-md:w-[calc(100%_-_64px)] max-md:left-8 max-sm:w-[calc(100%_-_48px)] max-sm:left-6 max-sm:top-[90px]"
        >
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

            <PhoneInput
              label="Phone Number"
              placeholder="Enter your phone number"
              required
              value={formValues.phoneNumber}
              onChange={(e) => {
                setValue("phoneNumber", e.target.value);
                clearErrors("phoneNumber");
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
      </main>
    </div>
  );
};
