"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import CreateMenuStep1 from "@/components/menus/create-menu-step1";
import CreateMenuStep2 from "@/components/menus/create-menu-step2";
import CreateMenuStep3 from "@/components/menus/create-menu-step3";
import CreateMenuStep4 from "@/components/menus/create-menu-step4";
import CreateMenuStep5 from "@/components/menus/create-menu-step5";

import { MenuFormData } from "@/types/menu-form";
import { menuService } from "@/lib/api/menus";
import { showToast, handleApiError } from "@/lib/utils/toast";
const CreateMenuPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MenuFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Memoize navigation handlers
  const nextStep = useCallback(
    () => setCurrentStep((prev) => Math.min(prev + 1, 5)),
    []
  );

  const prevStep = useCallback(
    () => setCurrentStep((prev) => Math.max(prev - 1, 1)),
    []
  );

  // Memoize updateFormData to prevent unnecessary re-renders
  const updateFormData = useCallback((newData: Partial<MenuFormData>) => {
    setFormData((prev) => {
      // Only update if there are actual changes
      const hasChanges = Object.keys(newData).some(
        (key) => JSON.stringify(prev[key]) !== JSON.stringify(newData[key])
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
    router.push("/menus");
  }, [router]);

  // Final submission handler
  const handleFinalSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // 1. Create menu
      const menuPayload = {
        name: formData.menuName,
        price_per_person: formData.price,
        num_of_guests: formData.minimumGuests,
        max_menu_selection: formData.maxMenuSelection ? parseInt(formData.maxMenuSelection, 10) : undefined,
        event_types: formData.eventTypes,
        cuisine_types: formData.cuisineTypes,
        menu_type: formData.menuType,
        courses: formData.courses, // e.g. ["Starter", "Main", ...]
        courses_selection_limit: formData.coursesSelectionLimit, // { Starter: 1, ... }
        courses_extra_charge_per_person: formData.coursesExtraChargePerPerson, // { Starter: "500", ... }
        status: "Draft",
      };
      const menuRes = await menuService.createMenu(menuPayload);
      const menuId = menuRes.data.id;
      // 2. Create menu items for each course
      const allItems = formData.menuItems || [];
      // Deduplicate by course and name
      const uniqueItems = Array.from(
        new Map(allItems.map((item: any) => [item.course + '|' + item.name, item])).values()
      );
      for (const item of uniqueItems) {
        if (item && typeof item === 'object') {
          await menuService.createMenuItem({ ...item, menu: menuId });
        }
      }
      // 3. Upload images
      const images = formData.uploadedImages || [];
      for (const image of images) {
        const form = new FormData();
        form.append("image", image instanceof File ? image : "");
        form.append("menu", menuId);
        await menuService.uploadMenuImage(form);
      }
      // Success: go to success step
      setCurrentStep(5);
    } catch (err: any) {
      handleApiError(err, "Failed to create menu. Please try again.");
      setSubmitError(
        err?.message || "Failed to create menu. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Common props for all steps
  const commonProps = useMemo(
    () => ({
      onContinue: nextStep,
      onBack: prevStep,
      formData,
      updateFormData,
      onSaveDraft: handleSaveDraft,
      onBackToMenus: handleBackToMenus,
    }),
    [
      formData,
      updateFormData,
      nextStep,
      prevStep,
      handleSaveDraft,
      handleBackToMenus,
    ]
  );

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
        return (
          <CreateMenuStep4
            {...stepProps}
            onFinalSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        );
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
  }, [
    currentStep,
    commonProps,
    handleSaveDraft,
    handleBackToMenus,
    handleFinalSubmit,
    isSubmitting,
    submitError,
  ]);

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <main className="w-full">{renderStep()}</main>
      </div>
    </div>
  );
};

export default CreateMenuPage;
