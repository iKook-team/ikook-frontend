"use client";
import * as React from "react";

import { ProgressStepper } from "./progress-indicator";
import { SuccessMessage } from "./success-message";

interface MenuCreationSuccessProps {
  title?: string;
  steps?: string[];
  successTitle: string;
  successDescription: string;
  buttonText: string;
  onBackToMenus: () => void;
  iconSrc?: string;
  // Common props from parent
  onContinue?: () => void;
  onBack?: () => void;
  formData?: Record<string, unknown>;
  updateFormData?: (data: Record<string, unknown>) => void;
  onSaveDraft?: () => void;
}

export const CreateMenuStep5: React.FC<MenuCreationSuccessProps> = ({
  title = "Create menu",
  successTitle = "Menu created successfully!",
  successDescription = "Your menu has been created and is now live on iKooK. You can view and manage it from your dashboard.",
  buttonText = "Back to Menus",
  onBackToMenus,
  iconSrc,
  formData,
  updateFormData,
}) => {
  // Progress steps for the stepper
  const progressSteps = [
    { id: "details", label: "Details", isCompleted: true },
    { id: "menu-prices", label: "Menu & Prices", isCompleted: true },
    { id: "menu-images", label: "Menu Images", isCompleted: true },
    { id: "finish-upload", label: "Finish Upload", isCompleted: true },
  ];
  // Sync form data when component mounts
  React.useEffect(() => {
    if (updateFormData && formData) {
      updateFormData({ ...formData, isComplete: true });
    }
  }, [formData, updateFormData]);


  return (
    <div className="flex flex-col w-full max-w-[655px] mx-auto">
      <header className="text-xl font-semibold text-black mb-6">{title}</header>
      <main className="flex flex-col w-full bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 p-6">
        <ProgressStepper steps={progressSteps} />
        <SuccessMessage
          buttonText={buttonText}
          description={successDescription}
          iconSrc={iconSrc}
          title={successTitle}
          onButtonClick={onBackToMenus}
        />
      </main>
    </div>
  );
};

export default CreateMenuStep5;
