"use client";
import * as React from "react";

import { ProgressStepper } from "../menus/progress-indicator";
import { ServiceIncludes } from "../menus/service-includes";
import { FormNavigationFooter } from "../menus/form-navigation-footer";

interface FinishUploadProps {
  onBack: () => void;
  onContinue: () => void;
  onSaveDraft?: () => void;
  formData: any;
  updateFormData: (data: any) => void;
  onFinalSubmit?: () => void;
  isSubmitting?: boolean;
}

const CreateGroceriesStep3: React.FC<FinishUploadProps> = ({
  onBack,
  onContinue,
  onSaveDraft,
  formData: _formData,
  updateFormData: _updateFormData,
  onFinalSubmit,
  isSubmitting,
}) => {
  const progressSteps = [
    { id: "details", label: "Details", isCompleted: true },
    { id: "menu-images", label: "Images", isCompleted: true },
    { id: "finish-upload", label: "Finish upload", isCompleted: true },
  ];

  const handleBack = () => onBack();
  const handleContinue = () => {
    if (onFinalSubmit) onFinalSubmit();
    else onContinue();
  };

  const serviceItems = [
    { title: "Quality control" },
    { title: "Chef's travel and insurance costs" },
    { title: "Customer support" },
    { title: "Money Protection", description: "We pay the chefs after the event, to protect your money" },
  ];

  return (
    <div className="flex flex-col w-full max-w-[655px] mx-auto">
      <header className="text-xl font-semibold text-black mb-6">Create product</header>

      <div className="flex flex-col items-center w-full mt-8">
        <div className="flex flex-col w-full">
          <div className="bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 p-6 w-full">
            <div className="mb-8">
              <ProgressStepper steps={progressSteps} />
            </div>

            <main className="flex flex-col items-center w-full">
              <div className="w-full max-w-[613px]">
                <h2 className="text-2xl font-semibold leading-8 text-black">Finish upload</h2>
                <p className="mt-4 text-base leading-6 text-neutral-600">
                  Your product has been prepared. Submit to publish it to your groceries list.
                </p>

                <section className="mt-8">
                  <ServiceIncludes items={serviceItems as any} />
                </section>
              </div>
            </main>

            <div
              aria-label="Product preview"
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
                continueButtonText={isSubmitting ? "Submitting..." : "Submit Product"}
                onBack={handleBack}
                onContinue={handleContinue}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroceriesStep3;
