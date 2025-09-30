"use client";

import React, { useState } from "react";

import { FormField } from "@/components/ui/form-field";
import { PasswordStrengthIndicator } from "@/components/ui/password-strength-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";

interface RegistrationFormProps {
  formData: {
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
  isSubmitting: boolean;
  userType?: "chef" | "host";
  onSubmit: (data: any) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData: initialFormData,
  isSubmitting,
  userType = "chef", // Default to 'chef' for backward compatibility
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    username: initialFormData.username || "",
    password: initialFormData.password || "",
    confirmPassword: initialFormData.confirmPassword || "",
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

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="mx-auto my-0 flex w-[603px] flex-col items-start justify-center gap-1.5 p-5 max-lg:w-full max-lg:max-w-[603px] max-lg:px-4 max-md:px-3 max-sm:px-2">
      <header>
        <h1 className="h-[30px] w-[201px] text-xl font-medium leading-[30px] text-black">
          {`Join iKook as a ${userType === "chef" ? "Chef" : "Host"}`}
        </h1>
      </header>

      <main className="w-[605px] rounded-[15px] border border-solid border-[#E7E7E7] bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] max-lg:w-full max-lg:max-w-[605px] max-sm:rounded-[10px]">
        <div className="pt-[27px] w-full">
          <ProgressBar progress={100} />
        </div>

        <div className="px-[49px] pt-6 pb-8 max-md:px-6 max-sm:px-4">
          <h1 className="text-[19px] font-medium text-black mb-6 max-sm:text-[17px]">
            Create your password
          </h1>

          <form onSubmit={handleSubmit}>
            <fieldset className="flex w-full flex-col items-start gap-6">
              <legend className="sr-only">Account Information</legend>

              <FormField
                required
                className="w-full"
                error={errors.username}
                label="Username"
                placeholder="Enter a username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />

              <FormField
                required
                className="w-full"
                error={errors.password}
                label="Password"
                placeholder="Create a password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />

              <FormField
                required
                className="w-full"
                error={errors.confirmPassword}
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
              />

              <PasswordStrengthIndicator
                confirmPassword={formData.confirmPassword}
                password={formData.password}
              />
            </fieldset>

            <div className="mt-8 h-12 w-full">
              <button
                className="h-12 w-full cursor-pointer gap-2 rounded-lg border border-solid border-[#FCC01C] bg-[#FCC01C] px-4 py-3 text-base font-semibold leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
