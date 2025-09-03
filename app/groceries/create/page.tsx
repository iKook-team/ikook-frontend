"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import BackButton from "@/components/common/BackButton";
import { useAuthStore } from "@/lib/store/auth-store";
import { groceriesService } from "@/lib/api/groceries";
import { showToast, handleApiError } from "@/lib/utils/toast";

import CreateGroceriesStep1, { GroceryFormData } from "@/components/grocery/create-groceries-step1";
import CreateGroceriesStep2 from "@/components/grocery/create-groceries-step2";
import CreateGroceriesStep3 from "@/components/grocery/create-groceries-step3";

const GroceriesCreatePage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<GroceryFormData & { uploadedImages: File[]; existingImages: any[] }>>({
    productType: "Single Item",
    items: [{ item: "", weightUnit: "Kilogram (kg)" }],
    uploadedImages: [],
    existingImages: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (user?.user_type !== "Chef") {
      router.replace("/");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.user_type !== "Chef") return null;

  const updateFormData = useCallback((data: Partial<GroceryFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const goBack = () => setStep((s) => Math.max(1, s - 1));
  const goNext = () => setStep((s) => Math.min(3, s + 1));

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

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);

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
        status: "Pending",
      };

      if (isMultiple) {
        const mappedItems = (formData.items || []).filter(Boolean).map((r: any) => ({
          name: r.item,
          weight: String(r.weightValue ?? ""),
          measurement_unit: unitLabelToApi(r.weightUnit),
        }));
        payload.items = mappedItems;
        // Also include top-level weight/measurement to satisfy backend requirement
        const numericWeights = mappedItems
          .map((it: any) => ({
            w: parseFloat(it.weight || "0"),
            u: it.measurement_unit,
          }))
          .filter((x: any) => !isNaN(x.w) && x.w > 0 && !!x.u);
        const uniqueUnits = Array.from(new Set(numericWeights.map((x: any) => x.u)));
        if (numericWeights.length > 0 && uniqueUnits.length === 1) {
          const total = numericWeights.reduce((sum: number, x: any) => sum + x.w, 0);
          payload.weight_or_quantity = String(total);
          payload.measurement_unit = uniqueUnits[0];
        } else {
          // Fallback: number of items as quantity in Units
          payload.weight_or_quantity = String(mappedItems.length || 1);
          payload.measurement_unit = "Unit";
        }
      } else {
        payload.weight_or_quantity = String(formData.quantityValue ?? "");
        payload.measurement_unit = unitLabelToApi(formData.quantityUnit as any);
      }

      const created = await groceriesService.createGrocery(payload);

      // Upload images (up to 4) to /groceries/images/
      const files: File[] = (formData.uploadedImages as File[]) || [];
      const filesToUpload = files.slice(0, 4);

      if (filesToUpload.length > 0 && created?.id) {
        try {
          if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
            console.log("[Grocery Create] uploading images (multipart):", filesToUpload.length, {
              groceryId: created.id,
              names: filesToUpload.map((f) => f.name),
            });
          }
          // Backend expects a file in the "image" field (multipart/form-data)
          for (let i = 0; i < filesToUpload.length; i++) {
            const file = filesToUpload[i];
            if (!(file instanceof File)) continue;
            const form = new FormData();
            form.append("image", file);
            form.append("grocery", String(created.id));
            if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
              console.log("[Grocery Create] POST /groceries/images/ #", i + 1);
            }
            await groceriesService.uploadGroceryImageForm(form);
          }
        } catch (imgErr) {
          // Warn but continue navigation
          showToast.warning("Some images failed to upload. You can try again later.");
        }
      }

      showToast.success("Grocery created successfully");
      router.push("/groceries");
    } catch (error) {
      handleApiError(error, "Failed to create grocery");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB]">
      <main className="relative">
        <div className="flex justify-center">
          <div className="w-full max-w-[1114px]">
            <div className="mt-4 ml-28 max-md:ml-2.5">
              <BackButton fallback="/groceries" />
            </div>
          </div>
        </div>

        <section className="flex justify-center mt-6">
          <div className="w-full max-w-[1114px] px-6">
            {step === 1 && (
              <CreateGroceriesStep1
                onBack={() => router.push("/groceries")}
                onContinue={goNext}
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {step === 2 && (
              <CreateGroceriesStep2
                onBack={goBack}
                onContinue={goNext}
                formData={formData}
                updateFormData={updateFormData as any}
              />
            )}

            {step === 3 && (
              <CreateGroceriesStep3
                onBack={goBack}
                onContinue={handleFinalSubmit}
                formData={formData}
                updateFormData={updateFormData as any}
                onFinalSubmit={handleFinalSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GroceriesCreatePage;
