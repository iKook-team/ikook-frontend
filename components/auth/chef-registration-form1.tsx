"use client";

import React, { useState } from "react";

import { FormField } from "@/components/ui/form-field";
import { ProgressBar } from "@/components/ui/progress-bar";

interface ChefRegistrationForm1Props {
  formData: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    serviceType?: string;
  };
  isSubmitting: boolean;
  onSubmit: (data: any) => void;
}

const serviceOptions = [
  { value: "Chef", label: "Chef" },
  { value: "Sous Chef", label: "Sous Chef" },
  { value: "Pastry Chef", label: "Pastry Chef" },
  { value: "Line Cook", label: "Line Cook" },
  { value: "Prep Cook", label: "Prep Cook" },
  { value: "Kitchen Manager", label: "Kitchen Manager" },
];

export const ChefRegistrationForm1: React.FC<ChefRegistrationForm1Props> = ({
  formData: initialFormData,
  isSubmitting,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    firstName: initialFormData.firstName || "",
    lastName: initialFormData.lastName || "",
    dateOfBirth: initialFormData.dateOfBirth || "",
    serviceType: initialFormData.serviceType || "",
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

    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters.";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters.";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Service type is required.";
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
          <ProgressBar progress={20} />
        </div>

        <h1 className="absolute top-[51px] left-[49px] h-[29px] w-[275px] text-[19px] font-medium text-black">
          Hi there, What is your Name?
        </h1>

        <form
          className="absolute top-[104px] left-[49px] w-[508px]"
          onSubmit={handleSubmit}
        >
          <fieldset className="flex w-full flex-col items-start gap-6">
            <legend className="sr-only">Personal Information</legend>

            <FormField
              required
              className="w-full"
              error={errors.firstName}
              label="First Name"
              placeholder="Given name"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />

            <FormField
              required
              className="w-full"
              error={errors.lastName}
              label="Last Name"
              placeholder="Family name"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />

            <FormField
              required
              className="w-full"
              error={errors.dateOfBirth}
              label="Date of Birth"
              placeholder="17/01/1990"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            />

            <FormField
              required
              className="w-full"
              error={errors.serviceType}
              label="What type of service are you providing?"
              options={serviceOptions}
              placeholder="Select service type"
              type="select"
              value={formData.serviceType}
              onChange={(e) => handleInputChange("serviceType", e.target.value)}
            />
          </fieldset>

          <div className="absolute top-[400px] h-12 w-[508px]">
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
