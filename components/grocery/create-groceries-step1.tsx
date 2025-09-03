"use client";
import React, { useState } from "react";

import { FormField } from "../ui/form-field";
import { PriceInput } from "../ui/price-input";
import { ProgressStepper } from "../menus/progress-indicator";
import { FormNavigationFooter } from "../menus/form-navigation-footer";
import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

export type GroceryItemRow = {
  item: string;
  weightValue?: string; // numeric value as string to keep input control
  weightUnit: string;
};

export type GroceryFormData = {
  productType: "Single Item" | "Multiple Item";
  productName: string;
  category:
    | "Grains"
    | "Dairy and Eggs"
    | "Fruits"
    | "Vegetables"
    | "Proteins"
    | "Bakery Items"
    | "Snacks and Confectionery"
    | "Canned and Packaged Foods"
    | "Condiments and Spices"
    | "Beverages"
    | "Frozen Foods"
    | "Pantry Staples"
    | "Nuts and Seeds"
    | "Health Foods and Supplements"
    | "Non-Food Items"
    | "Herbs and Aromatics"
    | "Deli and Prepared Foods"
    | "Desserts and Sweets"
    | "Baking Supplies";
  quantityUnit:
    | "Kilogram (kg)"
    | "Gram (g)"
    | "Pound (lb)"
    | "Ounce (oz)"
    | "Metric Ton (tonne)"
    | "Liter (L)"
    | "Milliliter (mL)"
    | "Gallon (gal)"
    | "Quart (qt)"
    | "Pint (pt)"
    | "Cup"
    | "Fluid Ounce (fl oz)"
    | "Piece (pcs)"
    | "Unit"
    | "Dozen"
    | "Pack"
    | "Bundle"
    | "Tray"
    | "Case";
  price: string;
  quantityValue?: string; // numeric value as string
  items?: GroceryItemRow[]; // Visible only when productType === "Multiple Item"
};

interface CreateGroceriesStep1Props {
  onContinue: () => void;
  onBack: () => void;
  formData: Partial<GroceryFormData>;
  updateFormData: (data: Partial<GroceryFormData>) => void;
}

const CreateGroceriesStep1: React.FC<CreateGroceriesStep1Props> = ({
  onContinue,
  onBack,
  formData,
  updateFormData,
}) => {
  const { user, chefFormData } = useAuthStore();

  const [localFormData, setLocalFormData] = useState<Partial<GroceryFormData>>({
    productType: formData.productType || "Single Item",
    productName: formData.productName || "",
    category: formData.category || undefined,
    quantityUnit: formData.quantityUnit || undefined,
    quantityValue: formData.quantityValue || "",
    price: formData.price || "",
    items: formData.items || [{ item: "", weightValue: "", weightUnit: "Kilogram (kg)" }],
  });

  const progressSteps = [
    { id: "details", label: "Details", isCompleted: true },
    { id: "menu-images", label: "Images", isCompleted: false },
    { id: "finish-upload", label: "Finish upload", isCompleted: false },
  ];

  const productTypeOptions = ["Single Item", "Multiple Item"] as const;
  const categoryOptions: GroceryFormData["category"][] = [
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

  const weightOptions: GroceryFormData["quantityUnit"][] = [
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

  const handleInputChange =
    (field: keyof GroceryFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const newData = { ...localFormData, [field]: event.target.value };
      setLocalFormData(newData);
      updateFormData(newData);
    };

  const handlePriceChange = (value: string) => {
    const newData = { ...localFormData, price: value };
    setLocalFormData(newData);
    updateFormData(newData);
  };

  const handleItemsRowChange = (
    index: number,
    field: keyof GroceryItemRow,
    value: string,
  ) => {
    const items = [...(localFormData.items || [])];
    items[index] = { ...items[index], [field]: value } as GroceryItemRow;
    const newData = { ...localFormData, items };
    setLocalFormData(newData);
    updateFormData(newData);
  };

  const addItemRow = () => {
    const items = [...(localFormData.items || [])];
    items.push({ item: "", weightValue: "", weightUnit: "Kilogram (kg)" });
    const newData = { ...localFormData, items };
    setLocalFormData(newData);
    updateFormData(newData);
  };

  const removeItemRow = (index: number) => {
    const items = [...(localFormData.items || [])];
    items.splice(index, 1);
    const newData = { ...localFormData, items };
    setLocalFormData(newData);
    updateFormData(newData);
  };

  const handleContinueClick = () => {
    updateFormData(localFormData);
    onContinue();
  };

  const isMultiple = localFormData.productType === "Multiple Item";

  const isStepValid =
    !!localFormData.productType &&
    !!localFormData.productName &&
    !!localFormData.category &&
    !!localFormData.price &&
    (
      isMultiple
        ? (localFormData.items || []).length > 0 && (localFormData.items || []).every((r) => r.item && r.weightUnit && r.weightValue)
        : !!localFormData.quantityUnit && !!localFormData.quantityValue
    );

  return (
    <div className="flex flex-col w-full max-w-[655px] mx-auto">
      <header className="text-xl font-semibold text-black mb-6">Create product</header>

      <main className="flex flex-col w-full bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 p-6">
        <ProgressStepper steps={progressSteps} />

        <section className="mb-4">
          <h2 className="self-start mt-7 text-lg font-semibold leading-loose text-black max-md:ml-0.5">
            Details
          </h2>

          <div className="mt-6 space-y-6 max-md:max-w-full">
            <FormField
              label="Product type"
              type="select"
              options={[...productTypeOptions] as unknown as string[]}
              value={localFormData.productType}
              onChange={handleInputChange("productType")}
              placeholder="Select product type"
              required
            />

            <FormField
              label="Product name"
              placeholder="What is the product name?"
              value={localFormData.productName}
              onChange={handleInputChange("productName")}
              required
            />

            <FormField
              label="Category"
              type="select"
              options={categoryOptions as unknown as string[]}
              placeholder="Select category"
              value={localFormData.category as string}
              onChange={handleInputChange("category")}
              required
            />

            {/* Combined quantity value + unit select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-900">
                Weight/Quantity<span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={localFormData.quantityValue || ""}
                  onChange={(e) => {
                    const newData = { ...localFormData, quantityValue: e.target.value };
                    setLocalFormData(newData);
                    updateFormData(newData);
                  }}
                  placeholder="Enter amount"
                  className="h-[42px] w-3/5 border border-[#CFCFCE] rounded-l-lg px-3.5 text-base placeholder:text-[#6F6E6D] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C] transition-colors"
                  required
                />
                <select
                  className="h-[42px] w-2/5 border border-l-0 border-[#CFCFCE] rounded-r-lg px-3.5 text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C] transition-colors"
                  value={localFormData.quantityUnit as string}
                  onChange={handleInputChange("quantityUnit")}
                  required
                >
                  <option value="" disabled>
                    Select unit
                  </option>
                  {(weightOptions as unknown as string[]).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <PriceInput
              label="Price"
              placeholder="Enter price"
              value={localFormData.price || ""}
              onChange={handlePriceChange}
              currency={getCurrencySymbol({
                currency: user?.currency,
                country: chefFormData?.country,
              })}
            />

            {isMultiple && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-black">Items</h3>
                  <span className="text-xs text-gray-500">
                    {(localFormData.items || []).length} item{(localFormData.items || []).length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-4">
                  {(localFormData.items || []).map((row, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="sm:col-span-5">
                        <FormField
                          label="Item"
                          placeholder="Enter item name"
                          value={row.item}
                          onChange={(e) =>
                            handleItemsRowChange(idx, "item", e.target.value)
                          }
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium text-gray-900">Weight</label>
                          <div className="flex">
                            <input
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="any"
                              value={row.weightValue || ""}
                              onChange={(e) =>
                                handleItemsRowChange(idx, "weightValue", e.target.value)
                              }
                              placeholder="Amount"
                              className="h-[42px] w-2/5 border border-[#CFCFCE] rounded-l-lg px-3.5 text-base placeholder:text-[#6F6E6D] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C] transition-colors"
                            />
                            <select
                              className="h-[42px] w-3/5 border border-l-0 border-[#CFCFCE] rounded-r-lg px-3.5 text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C] transition-colors"
                              value={row.weightUnit}
                              onChange={(e) =>
                                handleItemsRowChange(idx, "weightUnit", e.target.value)
                              }
                            >
                              {(weightOptions as unknown as string[]).map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-1 flex items-end">
                        <button
                          type="button"
                          onClick={() => removeItemRow(idx)}
                          className="h-[42px] px-3 rounded-lg border border-stone-300 text-sm text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 flex items-center justify-center w-full transition-colors"
                          aria-label={`Remove ${row.item || 'item'}`}
                          disabled={(localFormData.items || []).length === 1}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={addItemRow}
                      className="px-4 py-2 rounded-lg border border-stone-300 text-sm font-medium text-slate-700 hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-2"
                    >
                      <span>+</span>
                      Add item
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <FormNavigationFooter
          onBack={onBack}
          onContinue={handleContinueClick}
          disabled={!isStepValid}
        />
      </main>
    </div>
  );
};

export default CreateGroceriesStep1;
