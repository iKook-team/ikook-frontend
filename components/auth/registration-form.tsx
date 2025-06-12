"use client";

import React, { useState } from "react";

import { FormField } from "@/components/ui/form-field";
import { PasswordStrengthIndicator } from "@/components/ui/password-strength-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <div className="flex flex-col justify-center items-start gap-1.5 w-[603px] h-[786px] mx-auto my-0 p-5 max-md:w-full max-md:max-w-[603px] max-md:p-[15px] max-sm:w-full max-sm:p-2.5">
      <header>
        <h1 className="text-black text-xl font-medium leading-[30px] w-[201px] h-[30px]">
          Join iKook as a Host
        </h1>
      </header>

      <main className="w-[605px] h-[750px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] relative bg-white rounded-[15px] border-solid border-[#E7E7E7] max-md:w-full max-md:max-w-[605px] max-sm:w-full">
        <ProgressBar
          progress={33}
          className="absolute left-0 top-[27px] w-full"
        />

        <div className="absolute w-[350px] h-[58px] left-[49px] top-[51px] max-sm:left-5">
          <h2 className="text-black text-[19px] font-medium">
            <span>Weldone Iyabo,</span>
            <br />
            <span>Setup your Username and password</span>
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-[508px] flex-col items-start gap-[22px] absolute h-[344px] left-[49px] top-[133px] max-md:w-[calc(100%_-_98px)] max-md:max-w-[508px] max-sm:w-[calc(100%_-_40px)] max-sm:left-5"
          noValidate
        >
          <fieldset className="flex flex-col items-start gap-6 self-stretch border-none p-0 m-0">
            <legend className="sr-only">Account Setup</legend>

            <FormField
              label="Username"
              type="text"
              placeholder="Enter a username"
              value={formData.username}
              onChange={updateFormData("username")}
              required
              error={errors.username}
              className="w-full"
            />

            <FormField
              label="Password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={updateFormData("password")}
              required
              error={errors.password}
              className="w-full"
            />

            <FormField
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={updateFormData("confirmPassword")}
              required
              error={errors.confirmPassword}
              className="w-full"
            />
          </fieldset>

          <PasswordStrengthIndicator
            password={formData.password}
            confirmPassword={formData.confirmPassword}
          />

          <div className="absolute w-[348px] h-9 left-0 top-[467px] max-sm:left-0">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="terms-checkbox"
                checked={formData.acceptTerms}
                onChange={updateFormData("acceptTerms")}
                className="w-5 h-5 border cursor-pointer bg-white rounded-md border-solid border-[#CFCFCE] accent-[#FCC01C]"
                aria-describedby={
                  errors.acceptTerms ? "terms-error" : "terms-description"
                }
              />
              <label
                htmlFor="terms-checkbox"
                id="terms-description"
                className="text-[#6F6E6D] text-xs font-normal cursor-pointer"
              >
                <span>By signing up, you accept our </span>
                <a
                  href="https://ikook.co.uk"
                  className="text-[#090807] underline hover:no-underline"
                >
                  EULA Agreement
                </a>
                <span>, </span>
                <a
                  href="https://ikook.co.uk"
                  className="text-[#020101] underline hover:no-underline"
                >
                  Terms of service
                </a>
                <span> and </span>
                <a
                  href="https://ikook.co.uk"
                  className="text-[#020101] underline hover:no-underline"
                >
                  Privacy policy
                </a>
              </label>
            </div>
            {errors.acceptTerms && (
              <span
                id="terms-error"
                className="text-red-500 text-xs block mt-1"
                role="alert"
              >
                {errors.acceptTerms}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white text-base font-semibold leading-6 w-[508px] gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] absolute h-12 cursor-pointer bg-[#FCC01C] px-[113px] py-3 rounded-lg border-solid border-[#FCC01C] left-0 top-[528px] max-sm:w-full max-sm:left-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E6AC19] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 transition-colors"
          >
            {isSubmitting ? "Processing..." : "Continue"}
          </button>
        </form>
      </main>
    </div>
  );
};
