"use client";
import * as React from "react";

import { ProgressStepper } from "./progress-indicator";
import { ServiceIncludes } from "./service-includes";
import { FormNavigationFooter } from "./form-navigation-footer";


const CarrotIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.91732 1.75V2.91667C9.91732 3.561 10.4397 4.08333 11.084 4.08333H12.2507M9.91732 7.58333L8.16732 5.83333M6.41732 7.58333L5.25065 6.41667M2.36431 11.2977L5.78774 4.83125C6.22134 4.01224 7.07213 3.5 7.99883 3.5C9.38055 3.5 10.5007 4.62011 10.5007 6.00183C10.5007 6.92853 9.98841 7.77932 9.1694 8.21291L2.70292 11.6363C2.48489 11.7518 2.24889 11.5158 2.36431 11.2977Z" stroke="#A07A13" strokeLinecap="round"/>
  </svg>
);

const CarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.4993 6.41797H11.666C12.3103 6.41797 12.8327 6.9403 12.8327 7.58464V8.16797C12.8327 8.8123 12.3103 9.33464 11.666 9.33464M10.4993 6.41797L9.59859 3.7157C9.43979 3.2393 8.99396 2.91797 8.4918 2.91797H5.83268M10.4993 6.41797H5.83268M2.33268 6.41797L3.23344 3.7157C3.39224 3.2393 3.83807 2.91797 4.34023 2.91797H5.83268M2.33268 6.41797H5.83268M2.33268 6.41797C1.68835 6.41797 1.16602 6.9403 1.16602 7.58464V8.16797C1.16602 8.8123 1.68835 9.33464 2.33268 9.33464M5.83268 6.41797V2.91797M4.66602 9.33464H9.33268M4.66602 9.33464C4.66602 9.97897 4.14368 10.5013 3.49935 10.5013C2.85502 10.5013 2.33268 9.97897 2.33268 9.33464M4.66602 9.33464C4.66602 8.6903 4.14368 8.16797 3.49935 8.16797C2.85502 8.16797 2.33268 8.6903 2.33268 9.33464M9.33268 9.33464C9.33268 9.97897 9.85502 10.5013 10.4993 10.5013C11.1437 10.5013 11.666 9.97897 11.666 9.33464M9.33268 9.33464C9.33268 8.6903 9.85502 8.16797 10.4993 8.16797C11.1437 8.16797 11.666 8.6903 11.666 9.33464" stroke="#A07A13"/>
  </svg>
);

const DishIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.83333 2.33203H8.16667M1.75 9.33203C1.75 6.43254 4.1005 4.08203 7 4.08203C9.89949 4.08203 12.25 6.43254 12.25 9.33203C12.25 9.97636 11.7277 10.4987 11.0833 10.4987H2.91667C2.27233 10.4987 1.75 9.97636 1.75 9.33203Z" stroke="#A07A13" strokeLinecap="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.25 5.25L6.21043 6.21043C6.32433 6.32433 6.32433 6.509 6.21043 6.62291L5.25 7.58333M7.58333 7.58333H8.75M4.42361 1.75H9.57639C9.76432 1.75 9.91667 1.90235 9.91667 2.09028C9.91667 3.02993 10.6784 3.79167 11.6181 3.79167H11.8611C12.0759 3.79167 12.25 3.96578 12.25 4.18056V4.68141C12.25 7.91265 10.4982 10.8899 7.67356 12.4591L7.45293 12.5817C7.17125 12.7382 6.82875 12.7382 6.54707 12.5817L6.32644 12.4591C3.50183 10.8899 1.75 7.91265 1.75 4.68141V4.18056C1.75 3.96578 1.92411 3.79167 2.13889 3.79167H2.38194C3.3216 3.79167 4.08333 3.02993 4.08333 2.09028C4.08333 1.90235 4.23568 1.75 4.42361 1.75Z" stroke="#A07A13" strokeLinecap="round"/>
  </svg>
);

interface FinishUploadStepProps {
  onBack: () => void;
  onContinue: () => void;
  onSaveDraft: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export const FinishUploadStep: React.FC<FinishUploadStepProps> = ({
  onBack,
  onContinue,
  onSaveDraft,
  formData: _formData,
  updateFormData: _updateFormData,
}) => {
  const progressSteps = [
    { id: "details", label: "Details", isCompleted: true },
    { id: "menu-prices", label: "Menu & prices", isCompleted: true },
    { id: "finish-upload", label: "Finish upload", isCompleted: true },
  ];

  const handleBack = () => {
    onBack();
  };

  const handleContinue = () => {
    onContinue();
  };
  
  // Handle save draft functionality through the provided prop
  const _handleSaveDraft = onSaveDraft;

  const serviceItems = [
    {
      icon: <CarrotIcon />,
      title: "All ingredients"
    },
    {
      icon: <CarIcon />,
      title: "Chef's travel and insurance costs"
    },
    {
      icon: <DishIcon />,
      title: "Serving and Cleanup"
    },
    {
      icon: <ShieldIcon />,
      title: "Money Protection",
      description: "We pay the chefs after the event, to protect your money"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-[655px] mx-auto">
      <header className="text-xl font-semibold text-black mb-6">
        Create menu
      </header>

      <div className="flex flex-col items-center w-full mt-8">
        <div className="flex flex-col w-full">
          <div className="bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 p-6 w-full">
            <div className="mb-8">
              <ProgressStepper steps={progressSteps} />
            </div>

            <main className="flex flex-col items-center w-full">
              <div className="w-full max-w-[613px]">
                <h2 className="text-2xl font-semibold leading-8 text-black">
                  Finish upload
                </h2>
                <p className="mt-4 text-base leading-6 text-neutral-600">
                  Your menu has been uploaded successfully. You can now view it
                  in your dashboard.
                </p>

                <section className="mt-8">
                  <ServiceIncludes items={serviceItems} />
                </section>
              </div>
            </main>

            {/* Replaced img with div to fix lint warning */}
            <div
              aria-label="Menu preview"
              className="w-full mt-8 aspect-[500] bg-neutral-100 border border-neutral-200 rounded-lg"
              role="img"
              style={{
                backgroundImage:
                  "url(https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4e5e0e8d7af4287197a7d5d0575a23c15b68d216?placeholderIfAbsent=true)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            />

            <div className="flex justify-end w-full mt-8">
              <FormNavigationFooter
                backButtonText="Back"
                className="w-full"
                continueButtonText="Submit Menu"
                onBack={handleBack}
                onContinue={handleContinue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishUploadStep;
