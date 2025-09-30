"use client";

import React, { useState } from "react";

import { FormField } from "@/components/ui/form-field";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useAuthStore } from "@/lib/store/auth-store";
import { getLocationsForMarket } from "@/lib/locations";
import { useMarket } from "@/lib/market-context";

interface ChefRegistrationForm3Props {
  formData: {
    city?: string;
    postalCode?: string;
    address?: string;
    workAuthorization?: string;
  };
  isSubmitting: boolean;
  onSubmit: (data: any) => void;
}

// City options based on current market
type CityOption = { value: string; label: string };

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
  const { setChefFormData, chefFormData } = useAuthStore();
  const { market } = useMarket();
  const marketCityOptions: CityOption[] = getLocationsForMarket(market).map(
    (c) => ({ value: c, label: c }),
  );
  const [formData, setFormData] = useState(() => ({
    city: initialFormData.city || "",
    postalCode: initialFormData.postalCode || "",
    address: initialFormData.address || "",
    workAuthorization: initialFormData.workAuthorization || "yes",
  }));

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.city) {
      newErrors.city = "City is required.";
    }

    // Postal code is optional

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

    // Save form data to store
    const updatedChefData = {
      ...chefFormData,
      city: formData.city,
      postalCode: formData.postalCode,
      address: formData.address,
      workAuthorization: formData.workAuthorization,
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
          <ProgressBar progress={60} />
        </div>

        <div className="px-[49px] pt-6 pb-8 max-md:px-6 max-sm:px-4">
          <h1 className="text-[19px] font-medium text-black mb-6 max-sm:text-[17px]">
            Way to go {chefFormData?.firstName || "there"}, Where are you based?
          </h1>

          <form onSubmit={handleSubmit}>
            <fieldset className="flex w-full flex-col items-start gap-6">
              <legend className="sr-only">Location Information</legend>
              <FormField
                required
                className="w-full"
                error={errors.city}
                label="City/State"
                options={[
                  { value: "", label: "Select city" },
                  ...marketCityOptions,
                ]}
                placeholder="Select city"
                type="select"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
              <FormField
                className="w-full"
                error={errors.postalCode}
                label="Postal Code"
                placeholder="Enter postal code"
                type="text"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
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
