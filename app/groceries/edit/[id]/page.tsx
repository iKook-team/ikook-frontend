"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import BackButton from "@/components/common/BackButton";
import CreateGroceriesStep1, { GroceryFormData } from "@/components/grocery/create-groceries-step1";
import CreateGroceriesStep2 from "@/components/grocery/create-groceries-step2";
import CreateGroceriesStep3 from "@/components/grocery/create-groceries-step3";
import { groceriesService, Grocery } from "@/lib/api/groceries";
import { handleApiError, showToast } from "@/lib/utils/toast";
import { useAuthStore } from "@/lib/store/auth-store";

const EditGroceryPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const groceryId = params.id as string;
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    const isChef = user?.user_type === "Chef";
    const isBoxGroceriesService = (user as any)?.service_type === "Box Groceries";
    if (!isChef || !isBoxGroceriesService) {
      router.replace("/dashboard/chef");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.user_type !== "Chef" || (user as any)?.service_type !== "Box Groceries") {
    return null;
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<GroceryFormData & { uploadedImages: File[]; existingImages: any[] }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [originalGroceryData, setOriginalGroceryData] = useState<Grocery | null>(null);

  // helpers to convert unit labels <-> API codes
  const unitLabelToApi = (label?: string): string | undefined => {
    if (!label) return undefined;
    const map: Record<string, string> = {
      "Kilogram (kg)": "Kg",
      "Gram (g)": "g",
      "Pound (lb)": "lb",
      "Ounce (oz)": "oz",
      "Metric Ton (tonne)": "tonne",
      "Liter (L)": "L",
      "Milliliter (mL)": "mL",
      "Gallon (gal)": "gal",
      "Quart (qt)": "qt",
      "Pint (pt)": "pt",
      "Cup": "cup",
      "Fluid Ounce (fl oz)": "fl oz",
      "Piece (pcs)": "pcs",
      "Unit": "Unit",
      "Dozen": "Dozen",
      "Pack": "Pack",
      "Bundle": "Bundle",
      "Tray": "Tray",
      "Case": "Case",
    };
    return map[label] || label;
  };

  // Allowed UI units (must match GroceryFormData["quantityUnit"])
  const UI_UNITS: GroceryFormData["quantityUnit"][] = [
    "Kilogram (kg)",
    "Gram (g)",
    "Pound (lb)",
    "Ounce (oz)",
    "Metric Ton (tonne)",
    "Liter (L)",
    "Milliliter (mL)",
    "Gallon (gal)",
    "Quart (qt)",
    "Pint (pt)",
    "Cup",
    "Fluid Ounce (fl oz)",
    "Piece (pcs)",
    "Unit",
    "Dozen",
    "Pack",
    "Bundle",
    "Tray",
    "Case",
  ];

  const apiToUnitLabel = (api?: string): GroceryFormData["quantityUnit"] | undefined => {
    if (!api) return undefined;
    const map: Record<string, GroceryFormData["quantityUnit"]> = {
      Kg: "Kilogram (kg)",
      g: "Gram (g)",
      lb: "Pound (lb)",
      oz: "Ounce (oz)",
      tonne: "Metric Ton (tonne)",
      L: "Liter (L)",
      mL: "Milliliter (mL)",
      gal: "Gallon (gal)",
      qt: "Quart (qt)",
      pt: "Pint (pt)",
      cup: "Cup",
      "fl oz": "Fluid Ounce (fl oz)",
      pcs: "Piece (pcs)",
      Unit: "Unit",
      Dozen: "Dozen",
      Pack: "Pack",
      Bundle: "Bundle",
      Tray: "Tray",
      Case: "Case",
    };
    if (api in map) return map[api];
    // If API already sends the same literal as UI, allow it if present in UI_UNITS
    if ((UI_UNITS as readonly string[]).includes(api)) {
      return api as GroceryFormData["quantityUnit"];
    }
    return undefined;
  };

  // Allowed UI categories (must match GroceryFormData["category"])
  const UI_CATEGORIES: GroceryFormData["category"][] = [
    "Grains",
    "Dairy and Eggs",
    "Fruits",
    "Vegetables",
    "Proteins",
    "Bakery Items",
    "Snacks and Confectionery",
    "Canned and Packaged Foods",
    "Condiments and Spices",
    "Beverages",
    "Frozen Foods",
    "Pantry Staples",
    "Nuts and Seeds",
    "Health Foods and Supplements",
    "Non-Food Items",
    "Herbs and Aromatics",
    "Deli and Prepared Foods",
    "Desserts and Sweets",
    "Baking Supplies",
  ];

  const apiCategoryToForm = (api?: string): GroceryFormData["category"] | undefined => {
    if (!api) return undefined;
    const reverseMap: Record<string, GroceryFormData["category"]> = {
      Grain: "Grains",
    };
    if (api in reverseMap) return reverseMap[api];
    // If API already sends the same literal as UI, accept it only if allowed
    if ((UI_CATEGORIES as readonly string[]).includes(api)) {
      return api as GroceryFormData["category"];
    }
    return undefined;
  };

  // Load existing grocery data
  useEffect(() => {
    const loadGroceryData = async () => {
      try {
        setIsLoading(true);
        const grocery = await groceriesService.getGroceryById(groceryId);
        setOriginalGroceryData(grocery);

        const isMultiple = grocery.product_type === "Multiple Items";
        const transformed: Partial<GroceryFormData & { uploadedImages: File[]; existingImages: any[] }> = {
          productType: isMultiple ? "Multiple Item" : "Single Item",
          productName: grocery.name,
          category: apiCategoryToForm(grocery.category),
          price: grocery.price,
          quantityUnit: apiToUnitLabel(grocery.measurement_unit),
          quantityValue: grocery.weight_or_quantity,
          items: isMultiple
            ? (grocery.items || []).map((it) => ({
                item: it.name,
                weightValue: it.weight,
                weightUnit: apiToUnitLabel(it.measurement_unit) as string,
              }))
            : [{ item: "", weightValue: "", weightUnit: "Kilogram (kg)" }],
          uploadedImages: [],
          existingImages: grocery.images || [],
        };

        setFormData(transformed);
      } catch (err) {
        handleApiError(err, "Failed to load grocery data");
        router.push("/groceries");
      } finally {
        setIsLoading(false);
      }
    };

    if (groceryId) loadGroceryData();
  }, [groceryId, router]);

  // navigation
  const nextStep = useCallback(() => setCurrentStep((p) => Math.min(p + 1, 3)), []);
  const prevStep = useCallback(() => setCurrentStep((p) => Math.max(p - 1, 1)), []);

  const updateFormData = useCallback((newData: Partial<GroceryFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  }, []);

  // Final submission handler for updates
  const handleFinalSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const isMultiple = (formData.productType || "Single Item").startsWith("Multiple");
      const productTypeForApi = isMultiple ? "Multiple Items" : "Single Item";

      const categoryMap: Record<string, string> = {
        "Grains": "Grain",
        "Dairy and Eggs": "Dairy and Eggs",
        "Fruits": "Fruits",
        "Vegetables": "Vegetables",
        "Proteins": "Proteins",
        "Bakery Items": "Bakery Items",
        "Snacks and Confectionery": "Snacks and Confectionery",
        "Canned and Packaged Foods": "Canned and Packaged Foods",
        "Condiments and Spices": "Condiments and Spices",
        "Beverages": "Beverages",
        "Frozen Foods": "Frozen Foods",
        "Pantry Staples": "Pantry Staples",
        "Nuts and Seeds": "Nuts and Seeds",
        "Health Foods and Supplements": "Health Foods and Supplements",
        "Non-Food Items": "Non-Food Items",
        "Herbs and Aromatics": "Herbs and Aromatics",
        "Deli and Prepared Foods": "Deli and Prepared Foods",
        "Desserts and Sweets": "Desserts and Sweets",
        "Baking Supplies": "Baking Supplies",
      };
      const categoryForApi = categoryMap[(formData.category as string) || ""] || (formData.category as string) || "";

      const payload: any = {
        name: formData.productName || "",
        product_type: productTypeForApi,
        category: categoryForApi,
        price: String(formData.price ?? ""),
        status: originalGroceryData?.status || "Pending",
      };

      if (isMultiple) {
        const mappedItems = (formData.items || [])
          .filter(Boolean)
          .map((r: any) => ({
            name: r.item,
            weight: String(r.weightValue ?? ""),
            measurement_unit: unitLabelToApi(r.weightUnit),
          }));
        payload.items = mappedItems;

        const numericWeights = mappedItems
          .map((it: any) => ({ w: parseFloat(it.weight || "0"), u: it.measurement_unit }))
          .filter((x: any) => !isNaN(x.w) && x.w > 0 && !!x.u);
        const uniqueUnits = Array.from(new Set(numericWeights.map((x: any) => x.u)));
        if (numericWeights.length > 0 && uniqueUnits.length === 1) {
          const total = numericWeights.reduce((sum: number, x: any) => sum + x.w, 0);
          payload.weight_or_quantity = String(total);
          payload.measurement_unit = uniqueUnits[0];
        } else {
          payload.weight_or_quantity = String(mappedItems.length || 1);
          payload.measurement_unit = "Unit";
        }
      } else {
        payload.weight_or_quantity = String(formData.quantityValue ?? "");
        payload.measurement_unit = unitLabelToApi(formData.quantityUnit as any);
      }

      // 1. Update grocery
      await groceriesService.updateGrocery(groceryId, payload);

      // 2. Handle images
      const newImages: File[] = (formData as any).uploadedImages || [];
      const currentExisting = (formData as any).existingImages || [];
      const originalExisting = originalGroceryData?.images || [];

      // Delete removed existing images
      for (const originalImg of originalExisting) {
        const stillExists = currentExisting.some((img: any) => img.id === originalImg.id);
        if (!stillExists) {
          await groceriesService.deleteGroceryImage(originalImg.id);
        }
      }

      // Upload new images (multipart)
      for (const image of newImages) {
        if (image instanceof File) {
          const form = new FormData();
          form.append("image", image);
          form.append("grocery", String(groceryId));
          await groceriesService.uploadGroceryImageForm(form);
        }
      }

      showToast.success("Grocery updated successfully");
      router.push("/groceries");
    } catch (err: any) {
      handleApiError(err, "Failed to update grocery. Please try again.");
      setSubmitError(err?.message || "Failed to update grocery. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, groceryId, originalGroceryData, router]);

  const commonProps = useMemo(
    () => ({
      onContinue: nextStep,
      onBack: prevStep,
      formData,
      updateFormData,
      isEditMode: true,
      originalGroceryData,
    }),
    [formData, updateFormData, nextStep, prevStep, originalGroceryData],
  );

  const renderStep = useCallback(() => {
    const stepProps = { ...commonProps } as any;
    switch (currentStep) {
      case 1:
        return <CreateGroceriesStep1 {...stepProps} />;
      case 2:
        return <CreateGroceriesStep2 {...stepProps} />;
      case 3:
        return (
          <CreateGroceriesStep3
            {...stepProps}
            onFinalSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return <CreateGroceriesStep1 {...stepProps} />;
    }
  }, [commonProps, currentStep, handleFinalSubmit, isSubmitting]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#FBFBFB] flex justify-center items-center px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCC01C] mx-auto mb-4"></div>
          <p>Loading grocery data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-4">
          <BackButton fallback="/groceries" />
        </div>
        <main className="w-full">{renderStep()}</main>
      </div>
    </div>
  );
};

export default EditGroceryPage;
