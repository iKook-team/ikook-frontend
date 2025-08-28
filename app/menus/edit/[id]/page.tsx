"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import CreateMenuStep1 from "@/components/menus/create-menu-step1";
import CreateMenuStep2 from "@/components/menus/create-menu-step2";
import CreateMenuStep3 from "@/components/menus/create-menu-step3";
import CreateMenuStep4 from "@/components/menus/create-menu-step4";
import CreateMenuStep5 from "@/components/menus/create-menu-step5";
import { MenuFormData } from "@/types/menu-form";
import { menuService } from "@/lib/api/menus";
import { handleApiError } from "@/lib/utils/toast";
import BackButton from "@/components/common/BackButton";

const EditMenuPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const menuId = params.id as string;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MenuFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [originalMenuData, setOriginalMenuData] = useState<any>(null);

  // Load existing menu data
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        setIsLoading(true);
        const response = await menuService.getMenuById(menuId);
        const menuData = response.data;
        setOriginalMenuData(menuData);
        
        // Transform backend data to form format
        const menuItems = menuData.items || []; // Backend uses 'items' not 'menu_items'
        
        // Group menu items by course for the form
        const courseItems: Record<string, { name: string; description: string; id?: number }[]> = {};
        menuItems.forEach((item: any) => {
          if (!courseItems[item.course]) {
            courseItems[item.course] = [];
          }
          courseItems[item.course].push({
            name: item.name,
            description: item.description || '',
            id: item.id
          });
        });

        // Handle existing images - convert to File-like objects for display
        const existingImages = menuData.images || [];
        const imageFiles: File[] = [];
        
        const transformedData: Partial<MenuFormData> = {
          menuName: menuData.name,
          price: menuData.price_per_person,
          minimumGuests: menuData.num_of_guests,
          maxMenuSelection: menuData.max_menu_selection?.toString(),
          eventTypes: menuData.event_types || [],
          cuisineTypes: menuData.cuisine_types || [],
          menuType: menuData.menu_type,
          courses: menuData.courses || [],
          coursesSelectionLimit: menuData.courses_selection_limit || {},
          coursesExtraChargePerPerson: menuData.courses_extra_charge_per_person || {},
          courseItems,
          menuItems,
          uploadedImages: imageFiles,
          existingImages, // Keep reference to existing images
        };
        
        setFormData(transformedData);
      } catch (error) {
        handleApiError(error, "Failed to load menu data");
        router.push("/menus");
      } finally {
        setIsLoading(false);
      }
    };

    if (menuId) {
      loadMenuData();
    }
  }, [menuId, router]);

  // Memoize navigation handlers
  const nextStep = useCallback(
    () => setCurrentStep((prev) => Math.min(prev + 1, 5)),
    [],
  );

  const prevStep = useCallback(
    () => setCurrentStep((prev) => Math.max(prev - 1, 1)),
    [],
  );

  // Memoize updateFormData to prevent unnecessary re-renders
  const updateFormData = useCallback((newData: Partial<MenuFormData>) => {
    setFormData((prev) => {
      // Only update if there are actual changes
      const hasChanges = Object.keys(newData).some(
        (key) => JSON.stringify(prev[key]) !== JSON.stringify(newData[key]),
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
    // Save draft logic here if needed
  }, [formData]);

  // Handle navigation back to menus
  const handleBackToMenus = useCallback(() => {
    router.push("/menus");
  }, [router]);

  // Final submission handler for updates
  const handleFinalSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Filter out courses that have no items
      const coursesWithItems = (formData.courses || []).filter((course: string) => {
        const courseItems = formData.courseItems?.[course] || [];
        return courseItems.length > 0;
      });

      // Filter courses_selection_limit to only include courses that have items
      const filteredSelectionLimit = Object.entries(formData.coursesSelectionLimit || {})
        .filter(([course]) => coursesWithItems.includes(course))
        .reduce((acc, [key, value]) => ({
          ...acc,
          [key]: value
        }), {});

      // Filter courses_extra_charge_per_person to only include non-zero values
      const filteredExtraCharges = Object.entries(formData.coursesExtraChargePerPerson || {})
        .filter(([_, value]) => value && value !== '0' && value !== '0.00')
        .reduce((acc, [key, value]) => ({
          ...acc,
          [key]: value
        }), {});

      // 1. Update menu
      const menuPayload = {
        name: formData.menuName,
        price_per_person: formData.price,
        num_of_guests: formData.minimumGuests,
        max_menu_selection: formData.maxMenuSelection
          ? parseInt(formData.maxMenuSelection, 10)
          : undefined,
        event_types: formData.eventTypes,
        cuisine_types: formData.cuisineTypes,
        menu_type: formData.menuType,
        courses: coursesWithItems,
        courses_selection_limit: filteredSelectionLimit,
        courses_extra_charge_per_person: filteredExtraCharges,
      };
      
      await menuService.updateMenu(menuId, menuPayload);

      // 2. Handle menu items updates
      const allItems = formData.menuItems || [];
      console.log('Form menuItems:', allItems);
      
      const uniqueItems = Array.from(
        new Map(
          allItems.map((item: any) => [item.course + "|" + item.name, item]),
        ).values(),
      );
      console.log('Unique items for processing:', uniqueItems);

      // Delete existing items that are not in the new list
      const existingItems = originalMenuData?.items || []; // Backend uses 'items' not 'menu_items'
      for (const existingItem of existingItems) {
        const stillExists = uniqueItems.some((newItem: any) => 
          newItem.id === existingItem.id
        );
        if (!stillExists) {
          await menuService.deleteMenuItem(existingItem.id);
        }
      }

      // Create or update items
      for (const item of uniqueItems) {
        if (item && typeof item === "object") {
          const itemId = 'id' in item ? (item as any).id : null;
          console.log('Processing item:', { name: (item as any).name, course: (item as any).course, id: itemId });
          
          if (itemId && itemId > 0) {
            // Check if item has actually changed
            const originalItem = existingItems.find((orig: any) => orig.id === itemId);
            const hasChanged = !originalItem || 
              originalItem.name !== (item as any).name ||
              originalItem.description !== (item as any).description ||
              originalItem.course !== (item as any).course;
            
            if (hasChanged) {
              // Update existing item only if it changed
              console.log('UPDATING changed item with ID:', itemId);
              const updatePayload = { ...item } as any;
              delete updatePayload.menu; // Remove menu field for updates
              delete updatePayload.id; // Remove id from payload
              await menuService.updateMenuItem(itemId, updatePayload);
            } else {
              console.log('SKIPPING unchanged item with ID:', itemId);
            }
          } else {
            // Create new item (no ID or ID is null/undefined/0)
            console.log('CREATING new item:', (item as any).name);
            const createPayload = { ...item } as any;
            delete createPayload.id; // Remove any undefined/null id
            await menuService.createMenuItem({ ...createPayload, menu: menuId });
          }
        }
      }

      // 3. Handle image updates
      const newImages = formData.uploadedImages || [];
      const currentExistingImages = formData.existingImages || [];
      const originalExistingImages = originalMenuData?.images || [];
      
      // Delete removed existing images
      for (const originalImage of originalExistingImages) {
        const stillExists = currentExistingImages.some((img: any) => 
          img.id === originalImage.id
        );
        if (!stillExists) {
          await menuService.deleteMenuImage(originalImage.id);
        }
      }
      
      // Upload new images
      for (const image of newImages) {
        if (image instanceof File) {
          const form = new FormData();
          form.append("image", image);
          form.append("menu", menuId);
          await menuService.uploadMenuImage(form);
        }
      }

      // Success: go to success step
      setCurrentStep(5);
    } catch (err: any) {
      handleApiError(err, "Failed to update menu. Please try again.");
      setSubmitError(
        err?.message || "Failed to update menu. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, menuId, originalMenuData]);

  // Common props for all steps
  const commonProps = useMemo(
    () => ({
      onContinue: nextStep,
      onBack: prevStep,
      formData,
      updateFormData,
      onSaveDraft: handleSaveDraft,
      onBackToMenus: handleBackToMenus,
      isEditMode: true,
      originalMenuData,
    }),
    [
      formData,
      updateFormData,
      nextStep,
      prevStep,
      handleSaveDraft,
      handleBackToMenus,
      originalMenuData,
    ],
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
            successTitle="Menu updated successfully!"
            successDescription="Your menu has been updated and the changes are now live on iKooK."
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

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#FBFBFB] flex justify-center items-center px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCC01C] mx-auto mb-4"></div>
          <p>Loading menu data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-4">
          <BackButton fallback="/menus" />
        </div>
        <main className="w-full">{renderStep()}</main>
      </div>
    </div>
  );
};

export default EditMenuPage;
