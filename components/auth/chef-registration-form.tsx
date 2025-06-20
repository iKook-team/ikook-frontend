"use client";

import React from "react";
import { ProgressBar } from "../ui/progress-bar";
import { FormField } from "../ui/form-field";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  serviceType: string;
}

export const ChefRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>();

  const formValues = watch();
  const isFormValid =
    formValues.firstName &&
    formValues.lastName &&
    formValues.dateOfBirth &&
    formValues.serviceType;

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Handle successful form submission
      console.log("Form submitted successfully!");
      // You can add navigation or success message here
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  const serviceOptions = [
    "Chef",
    "Sous Chef",
    "Pastry Chef",
    "Line Cook",
    "Prep Cook",
    "Kitchen Manager",
  ];

  return (
    <div className="flex flex-col justify-center items-start gap-1.5 w-[603px] h-[786px] mx-auto my-0 p-5 max-md:w-full max-md:max-w-[603px] max-md:p-[15px] max-sm:w-full max-sm:p-2.5">
      <header className="font-medium text-xl text-black leading-[30px] w-[203px] h-[30px] mb-1.5 max-sm:text-sm">
        Join iKook as a Chef
      </header>

      <main className="w-[605px] h-[750px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] relative bg-white rounded-[15px] border-solid border-[#E7E7E7] max-md:w-full max-md:max-w-[605px] max-sm:w-full max-sm:h-auto max-sm:min-h-[650px] max-sm:pb-5">
        {/* Progress Indicator */}
        <div className="absolute top-[27px] left-0 w-full px-0">
          <ProgressBar progress={25} />
        </div>

        {/* Form Header */}
        <h1 className="font-medium text-[19px] text-black absolute w-[275px] h-[29px] left-[49px] top-[51px] max-sm:text-sm">
          Hi there, What is your Name?
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute w-[508px] left-[49px] top-[104px] max-md:w-[calc(100%_-_64px)] max-md:left-8 max-sm:w-[calc(100%_-_48px)] max-sm:left-6 max-sm:top-[90px]"
        >
          <fieldset className="flex flex-col items-start gap-6 w-full max-sm:gap-5">
            <legend className="sr-only">Personal Information</legend>

            <FormField
              label="First Name"
              type="text"
              placeholder="Given name"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
              required
              error={errors.firstName?.message}
              className="w-full"
            />

            <FormField
              label="Last Name"
              type="text"
              placeholder="Family name"
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
              required
              error={errors.lastName?.message}
              className="w-full"
            />

            <FormField
              label="Date of Birth"
              type="date"
              placeholder="17/01/1990"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
                pattern: {
                  value: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
                  message: "Invalid date format",
                },
              })}
              required
              error={errors.dateOfBirth?.message}
              className="w-full"
            />

            <FormField
              label="What type of service are you providing?"
              type="select"
              placeholder="Select service type"
              {...register("serviceType", {
                required: "Service type is required",
              })}
              required
              options={serviceOptions}
              error={errors.serviceType?.message}
              className="w-full"
            />
          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-[508px] justify-center items-center gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] absolute h-12 bg-[#FCC01C] px-[113px] py-3 rounded-lg border-solid border-[#FCC01C] left-0 top-[557px] max-md:w-[calc(100%_-_98px)] max-md:max-w-[508px] max-sm:w-[calc(100%_-_40px)] max-sm:max-w-none hover:bg-[#E6AC19] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2"
            aria-label="Continue to next step"
          >
            <span className="font-semibold text-base text-white leading-6 relative max-sm:text-sm">
              Continue
            </span>
          </button>
        </form>
      </main>
    </div>
  );
};
