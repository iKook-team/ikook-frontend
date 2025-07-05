"use client";

import React, { useState } from "react";

import { FormField } from "@/components/ui/form-field";
import { ProgressBar } from "@/components/ui/progress-bar";

interface ChefRegistrationForm3Props {
  formData: {
    country?: string;
    city?: string;
    postalCode?: string;
    address?: string;
    workAuthorization?: string;
  };
  isSubmitting: boolean;
  onSubmit: (data: any) => void;
}

const countryOptions = [
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
];

const cityOptions = [
  { value: "London", label: "London" },
  { value: "Manchester", label: "Manchester" },
  { value: "Birmingham", label: "Birmingham" },
  { value: "Liverpool", label: "Liverpool" },
  { value: "Leeds", label: "Leeds" },
  { value: "Sheffield", label: "Sheffield" },
];

const workAuthOptions = [
  { value: "yes", label: "Yes, I have the right to work" },
  { value: "no", label: "No, I need sponsorship" },
  { value: "pending", label: "Application pending" },
];

export const ChefRegistrationForm3: React.FC<ChefRegistrationForm3Props> = ({
  formData: initialFormData,
  isSubmitting,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    country: initialFormData.country || "United Kingdom",
    city: initialFormData.city || "London",
    postalCode: initialFormData.postalCode || "",
    address: initialFormData.address || "",
    workAuthorization: initialFormData.workAuthorization || "",
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

    if (!formData.country) {
      newErrors.country = "Country is required.";
    }

    if (!formData.city) {
      newErrors.city = "City is required.";
    }

    if (!formData.postalCode) {
      newErrors.postalCode = "Postal code is required.";
    }

    if (!formData.address) {
      newErrors.address = "Address is required.";
    }

    if (!formData.workAuthorization) {
      newErrors.workAuthorization = "Work authorization is required.";
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
    <div className="mx-auto my-0 flex w-[603px] flex-col items-start justify-center gap-1.5 p-5">
      <header>
        <h1 className="h-[30px] w-[201px] text-xl font-medium leading-[30px] text-black">
          Join iKook as a Host
        </h1>
      </header>

      <main className="relative h-[750px] w-[605px] rounded-[15px] border border-solid border-[#E7E7E7] bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)]">
        <div className="absolute top-[27px] left-0 w-full px-0">
          <ProgressBar progress={60} />
        </div>

        <h1 className="absolute top-[51px] left-[49px] h-[29px] text-[19px] font-medium text-black">
          Way to go Iyabo, Where are you based?
        </h1>

        <form
          className="absolute top-[104px] left-[49px] w-[508px]"
          onSubmit={handleSubmit}
        >
          <fieldset className="flex w-full flex-col items-start gap-6">
            <legend className="sr-only">Location Information</legend>
            <FormField
              required
              className="w-full"
              error={errors.country}
              label="Country of Residence"
              options={countryOptions}
              placeholder="Select country"
              type="select"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
            <FormField
              required
              className="w-full"
              error={errors.city}
              label="City/State"
              options={cityOptions}
              placeholder="Select city"
              type="select"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
            <FormField
              required
              className="w-full"
              error={errors.postalCode}
              label="Postal Code"
              placeholder="Enter postal code"
              type="text"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            />
            <FormField
              required
              className="w-full"
              error={errors.address}
              label="Your Address"
              placeholder="Enter address"
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            <FormField
              required
              className="w-full"
              error={errors.workAuthorization}
              label="Do you have right to work in this country?"
              options={workAuthOptions}
              placeholder="Select work authorization"
              type="select"
              value={formData.workAuthorization}
              onChange={(e) =>
                handleInputChange("workAuthorization", e.target.value)
              }
            />
          </fieldset>

          <div className="absolute top-[550px] h-12 w-[508px]">
            <button
              className="h-12 w-full cursor-pointer gap-2 rounded-lg border border-solid border-[#FCC01C] bg-[#FCC01C] px-4 py-3 text-base font-semibold leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Continue"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
