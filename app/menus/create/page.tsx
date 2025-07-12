"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import CreateMenuStep1 from "@/components/menus/create-menu-step1";
import CreateMenuStep2 from "@/components/menus/create-menu-step2";
import CreateMenuStep3 from "@/components/menus/create-menu-step3";
import CreateMenuStep4 from "@/components/menus/create-menu-step4";
import CreateMenuStep5 from "@/components/menus/create-menu-step5";

import { MenuFormData } from "@/types/menu-form";
const CreateMenuPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MenuFormData>>({});

  // Memoize navigation handlers
  const nextStep = useCallback(() => 
    setCurrentStep(prev => Math.min(prev + 1, 5)), []);
  
  const prevStep = useCallback(() => 
    setCurrentStep(prev => Math.max(prev - 1, 1)), []);

  // Memoize updateFormData to prevent unnecessary re-renders
  const updateFormData = useCallback((newData: Partial<MenuFormData>) => {
    setFormData(prev => {
      // Only update if there are actual changes
      const hasChanges = Object.keys(newData).some(
        key => JSON.stringify(prev[key]) !== JSON.stringify(newData[key])
      );
      
      if (!hasChanges) return prev;
      
      return {
        ...prev,
        ...newData,
      };
    });
  }, []);

  // Handle save draft functionality
  const handleSaveDraft = useCallback(() => {
    // Save draft logic here
    // Debug logging removed
  }, [formData]);

  // Handle navigation back to menus
  const handleBackToMenus = useCallback(() => {
    router.push('/menus');
  }, [router]);

  // Common props for all steps
  const commonProps = useMemo(() => ({
    onContinue: nextStep,
    onBack: prevStep,
    formData,
    updateFormData,
    onSaveDraft: handleSaveDraft,
    onBackToMenus: handleBackToMenus,
  }), [formData, updateFormData, nextStep, prevStep, handleSaveDraft, handleBackToMenus]);

  // Render the current step
  const renderStep = useCallback(() => {
    const stepProps = {
      ...commonProps,
      onSaveDraft: handleSaveDraft,
    };

    switch (currentStep) {
      case 1:
        return <CreateMenuStep1 {...stepProps} />;
      case 2:
        return <CreateMenuStep2 {...stepProps} />;
      case 3:
        return <CreateMenuStep3 {...stepProps} />;
      case 4:
        return <CreateMenuStep4 {...stepProps} />;
      case 5:
        return (
          <CreateMenuStep5
            {...commonProps}
            successTitle="Menu created successfully!"
            successDescription="Your menu has been created and is now live on iKooK. You can view and manage it from your dashboard."
            buttonText="Back to Menus"
            onBackToMenus={handleBackToMenus}
          />
        );
      default:
        return <CreateMenuStep1 {...stepProps} />;
    }
  }, [currentStep, commonProps, handleSaveDraft, handleBackToMenus]);

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <main className="w-full">
          {renderStep()}
        </main>
      </div>
    </div>
  );
};

export default CreateMenuPage;
