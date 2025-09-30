"use client";

import React, { useState } from "react";

import { FormField } from "@/components/ui/form-field";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useAuthStore } from "@/lib/store/auth-store";

interface ChefRegistrationForm4Props {
  formData: {
    criminalRecord?: string;
    instagramAccount?: string;
    website?: string;
  };
  isSubmitting: boolean;
  onSubmit: (data: any) => void;
}

const criminalRecordOptions = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const ChefRegistrationForm4: React.FC<ChefRegistrationForm4Props> = ({
  formData: initialFormData,
  isSubmitting,
  onSubmit,
}) => {
  const { setChefFormData, chefFormData } = useAuthStore();
  const [formData, setFormData] = useState({
    criminalRecord: initialFormData.criminalRecord || "no",
    instagramAccount: initialFormData.instagramAccount || "",
    website: initialFormData.website || "",
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

    if (!formData.criminalRecord) {
      newErrors.criminalRecord = "Please select an option.";
    }

    if (formData.website) {
      try {
        new URL(formData.website);
      } catch {
        newErrors.website = "Please enter a valid URL.";
      }
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

    // Save form data to store
    const updatedChefData = {
      ...chefFormData,
      criminalRecord: formData.criminalRecord,
      instagramAccount: formData.instagramAccount,
      website: formData.website,
    };

    setChefFormData(updatedChefData);

    onSubmit(formData);
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
          <ProgressBar progress={80} />
        </div>

        <div className="px-[49px] pt-6 pb-8 max-md:px-6 max-sm:px-4">
          <h1 className="text-[19px] font-medium text-black mb-6 max-sm:text-[17px]">
            Thank you {chefFormData?.firstName || "there"}, Tell us about you?
          </h1>

          <form onSubmit={handleSubmit}>
            <fieldset className="flex w-full flex-col items-start gap-6">
              <legend className="sr-only">Additional Information</legend>
              <FormField
                required
                className="w-full"
                error={errors.criminalRecord}
                label="Do you have any criminal record?"
                options={criminalRecordOptions}
                placeholder="Select"
                type="select"
                value={formData.criminalRecord}
                onChange={(e) =>
                  handleInputChange("criminalRecord", e.target.value)
                }
              />

              <FormField
                className="w-full"
                label="Cooking images (optional)"
                placeholder="Link your cooking related Instagram account?"
                type="text"
                value={formData.instagramAccount}
                onChange={(e) =>
                  handleInputChange("instagramAccount", e.target.value)
                }
              />

              <FormField
                className="w-full"
                error={errors.website}
                label="Your website (optional)"
                placeholder="Link your cooking related Website address?"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
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
