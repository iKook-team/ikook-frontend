"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { ProgressBar } from "@/components/ui/progress-bar";
import { FormField } from "@/components/ui/form-field";
import { PhoneInput } from "@/components/ui/phone-input";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  referralCode?: string;
}

export const HostRegistrationForm: React.FC = () => {
  const router = useRouter();
  const { setUserType, setHostFormData } = useAuthStore();
  // Track selected country code for phone input
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_countryCode, setCountryCode] = useState("NG");

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

  const onSubmit = async (data: FormData) => {
    try {
      // Set user type to 'host' in global state
      setUserType('host');
      
      // Save form data locally
      setHostFormData(data);
      
      // Send OTP to email using the real API
      await authService.sendOtp(data.email);
      
      // Navigate to email verification page
      router.push("/email-verification");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to send verification code. Please try again.");
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
    <div className="max-w-none flex flex-col justify-center items-start gap-1.5 w-[603px] min-h-[850px] mx-auto my-0 p-5 max-md:max-w-[603px] max-md:w-full max-md:p-4 max-sm:max-w-screen-sm max-sm:p-3">
      <h1 className="text-black text-xl font-medium leading-[30px] w-[201px] h-[30px] max-sm:text-lg">
        Join iKook as a Host
      </h1>

      <div className="w-[605px] min-h-[750px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] relative bg-white rounded-[15px] border-solid border-[#E7E7E7] max-md:w-full pb-8">
        <div className="absolute left-0 top-[27px] w-full px-0">
          <ProgressBar progress={25} />
        </div>

        <h2 className="text-black text-[19px] font-medium absolute w-[267px] h-[29px] left-[49px] top-[51px] max-md:text-lg max-md:left-8 max-sm:text-[17px] max-sm:left-6 max-sm:top-[45px]">
          Hi there, Let get to know you
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
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

            <div className="w-full">
              <PhoneInput
                error={errors.phoneNumber?.message}
                label="Phone Number"
                onChange={(e) => {
                  const value = e.target.value;
                  setValue("phoneNumber", value, { shouldValidate: true });
                  if (value.trim()) {
                    clearErrors("phoneNumber");
                  }
                }}
                onCountryChange={(country) => {
                  setCountryCode(country);
                  trigger("phoneNumber");
                }}
                placeholder="810 166 7299"
                required
                value={watch("phoneNumber")}
              />
            </div>

            <FormField
              label="Referral Code (optional)"
              placeholder="Enter code"
              {...register("referralCode")}
              className="w-full"
            />
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="text-white text-base font-semibold leading-6 w-full gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] h-12 cursor-pointer bg-[#FCC01C] px-6 py-3 rounded-lg border-solid border-[#FCC01C] mt-[100px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E6AC19] transition-colors max-md:px-6 max-md:py-3 max-sm:text-[15px] max-sm:px-6 max-sm:py-3.5 max-sm:mt-8"
          >
            {isSubmitting ? "Processing..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};
