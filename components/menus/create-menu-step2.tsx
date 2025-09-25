"use client";

import React, { useState, useEffect } from "react";
import { showToast } from "@/lib/utils/toast";
import { menuService } from "@/lib/api/menus";

import { FormField } from "../ui/form-field";
import { PriceInput } from "../ui/price-input";

import { ProgressStepper } from "./progress-indicator";
import FormNavigationFooter from "./form-navigation-footer";

import { MenuFormData } from "@/types/menu-form";
import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

interface CreateMenuStep2Props {
  onContinue: () => void;
  onBack: () => void;
  formData: Partial<MenuFormData>;
  updateFormData: (data: Partial<MenuFormData>) => void;
}

const courseLabels = ["Starter", "Main", "Dessert", "Side"];

export const CreateMenuStep2: React.FC<CreateMenuStep2Props> = ({
  onContinue,
  onBack,
  formData,
  updateFormData,
}) => {
  const { user, chefFormData } = useAuthStore();
  const country = chefFormData?.country;
  
  // Get courses from formData or use default course labels
  const courses = React.useMemo(() => 
    Array.isArray(formData.courses) && formData.courses.length > 0 
      ? formData.courses 
      : courseLabels,
    [formData.courses]
  );
  
  // Initialize currentCourseIdx from formData, ensuring it's within bounds
  const [currentCourseIdx, setCurrentCourseIdx] = useState<number>(() => {
    const savedIdx = typeof formData.currentCourseIdx === 'number' 
      ? formData.currentCourseIdx 
      : 0;
    return Math.min(Math.max(0, savedIdx), courses.length - 1);
  });
  
  // Get current course name, default to first course if not found
  const currentCourse = courses[Math.min(currentCourseIdx, courses.length - 1)] || courses[0] || 'Starter';
  
  // Update form data when currentCourseIdx changes
  useEffect(() => {
    // Only update if the index is valid and has actually changed
    if (currentCourseIdx >= 0 && 
        currentCourseIdx < courses.length && 
        formData.currentCourseIdx !== currentCourseIdx) {
      updateFormData({
        ...formData,
        currentCourseIdx,
      });
    }
  }, [currentCourseIdx, formData, updateFormData, courses.length]);
  const [courseItems, setCourseItems] = useState<
    Record<string, { name: string; description: string; id?: number }[]>
  >(formData.courseItems || {});
  const [itemInput, setItemInput] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [menuSelection, setMenuSelection] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      const courses = formData.courses || courseLabels;
      
      courses.forEach((course: string) => {
        // Use saved value or default to "1"
        initial[course] = formData.coursesSelectionLimit?.[course]?.toString() || "1";
      });

      return initial;
    },
  );
  
  const [additionalStarterCharge, setAdditionalStarterCharge] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    const courses = formData.courses || courseLabels;
    
    courses.forEach((course: string) => {
      // Use saved value or default to "0"
      initial[course] = formData.coursesExtraChargePerPerson?.[course]?.toString() || "0";
    });

    return initial;
  });

  // Only initialize state from form data on mount
  React.useEffect(() => {
    if (Object.keys(formData.courseItems || {}).length > 0) {
      setCourseItems(formData.courseItems || {});
    }
    
    if (formData.coursesSelectionLimit) {
      setMenuSelection(prev => ({
        ...prev,
        ...formData.coursesSelectionLimit
      }));
    }
    
    if (formData.coursesExtraChargePerPerson) {
      setAdditionalStarterCharge(prev => ({
        ...prev,
        ...formData.coursesExtraChargePerPerson
      }));
    }
  }, []); // Empty dependency array to run only on mount


  const handleInputChange =
    (field: "name" | "description") =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setItemInput((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleMenuSelectionChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value } = e.target;
    const itemCount = courseItems[currentCourse]?.length || 0;
    let newValue = parseInt(value, 10);
    
    // Ensure the value is within valid range
    if (isNaN(newValue)) {
      newValue = 1;
    } else if (newValue < 1) {
      newValue = 1;
    } else if (newValue > itemCount) {
      newValue = itemCount;
    }
    
    setMenuSelection((prev) => ({
      ...prev,
      [currentCourse]: newValue.toString(),
    }));
  };

  const handleAdditionalStarterChargeChange =
    (course: string) => (value: string) => {
      setAdditionalStarterCharge((prev) => ({ ...prev, [course]: value }));
    };

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    const { name, description } = itemInput;

    if (!name) return;
    const newItem = { name, description };
    const updated = {
      ...courseItems,
      [currentCourse]: [...(courseItems[currentCourse] || []), newItem],
    };

    setCourseItems(updated);
    setItemInput({ name: "", description: "" });
  };

  const handleRemoveItem = (idx: number) => {
    const updated = {
      ...courseItems,
      [currentCourse]: (courseItems[currentCourse] || []).filter(
        (_, i) => i !== idx,
      ),
    };

    setCourseItems(updated);
  };

  const saveCurrentCourseData = () => {
    // Make sure we have the latest course items and menu selection
    const allCourseItems = { ...courseItems };
    
    // If there's an item in the input, save it to the current course
    if (itemInput.name.trim()) {
      const currentItems = allCourseItems[currentCourse] || [];
      allCourseItems[currentCourse] = [...currentItems, { ...itemInput }];
      setCourseItems(allCourseItems);
      setItemInput({ name: "", description: "" });
    }
    
    // Get all courses with items
    const courseKeys = Object.keys(allCourseItems).filter(
      (key: string) => allCourseItems[key]?.length > 0
    );
    
    // Prepare menu items array for form data
    const menuItems = Object.entries(allCourseItems).flatMap(
      ([course, items]) =>
        (items || []).map((item) => ({
          ...item,
          course,
          // Preserve id if it exists (for edit mode)
          ...(item.id ? { id: item.id } : {}),
        })),
    );
    
    // Get the current course index
    const currentIdx = courses.findIndex(course => course === currentCourse);
    
    // Ensure menu selection limits are valid
    const validatedMenuSelection = { ...menuSelection };
    Object.keys(validatedMenuSelection).forEach(course => {
      const itemCount = allCourseItems[course]?.length || 0;
      const currentLimit = parseInt(validatedMenuSelection[course] || '1', 10);
      
      // Ensure limit is at least 1 and at most the number of items (if there are items)
      if (itemCount > 0) {
        validatedMenuSelection[course] = Math.min(
          Math.max(1, currentLimit),
          itemCount
        ).toString();
      } else {
        validatedMenuSelection[course] = '0';
      }
    });
    
    // Prepare the data to be saved
    const updatedData = {
      courseItems: allCourseItems,
      menuItems,
      courses: courseLabels,
      coursesSelectionLimit: {
        ...(formData.coursesSelectionLimit || {}), // Preserve existing values
        ...validatedMenuSelection, // Apply validated selection limits
      },
      coursesExtraChargePerPerson: {
        ...(formData.coursesExtraChargePerPerson || {}), // Preserve existing values
        ...additionalStarterCharge, // Apply current additional charges
      },
      currentCourseIdx: currentIdx >= 0 ? currentIdx : 0,
    };

    // Update the form data in the parent component
    updateFormData(updatedData);
    return updatedData;
  };

  const handleNextCourse = () => {
    // Save current data before proceeding
    const updatedData = saveCurrentCourseData();
    
    // Get the next course index
    const nextCourseIdx = currentCourseIdx + 1;
    
    if (nextCourseIdx < courses.length) {
      // Move to next course
      setCurrentCourseIdx(nextCourseIdx);
      setItemInput({ name: "", description: "" });
      
      // Update form data with the next course
      updateFormData({
        ...updatedData,
        currentCourseIdx: nextCourseIdx,
      });
    } else {
      // All courses completed, proceed to next step
      onContinue();
    }
  };

  const handleBack = () => {
    // Save current data before going back
    const updatedData = saveCurrentCourseData();
    
    if (currentCourseIdx > 0) {
      // Move to previous course
      const prevCourseIdx = currentCourseIdx - 1;
      setCurrentCourseIdx(prevCourseIdx);
      setItemInput({ name: "", description: "" });
      
      // Update form data with the previous course
      updateFormData({
        ...updatedData,
        currentCourseIdx: prevCourseIdx,
      });
    } else {
      // No more previous courses, go back to previous step
      onBack();
    }
  };

  const progressSteps = [
    { id: "details", label: "Details", isCompleted: true },
    { id: "menu-prices", label: "Menu & prices", isCompleted: true },
    { id: "menu-images", label: "Menu images", isCompleted: false },
    { id: "finish-upload", label: "Finish upload", isCompleted: false },
  ];

  return (
    <div className="flex flex-col w-full max-w-[655px] mx-auto">
      <header className="text-xl font-semibold text-black mb-6">
        Create menu
      </header>

      <main className="flex flex-col w-full bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 p-6">
        <div className="flex justify-center w-full">
          <ProgressStepper steps={progressSteps} />
        </div>

        <section className="mt-6 max-md:max-w-full" key={currentCourse}>
          <h3 className="text-base font-medium text-black">
            {currentCourse} Menu
          </h3>
          <div className="mt-6 max-md:max-w-full">
            <div className="flex flex-col w-full">
              <FormField
                label="Menu item name"
                placeholder={`What's the ${currentCourse?.toLowerCase?.() || 'menu item'} name?`}
                value={itemInput.name}
                onChange={handleInputChange("name")}
              />
              <FormField
                label="Menu item description"
                className="mt-5"
                placeholder={`Describe the ${currentCourse?.toLowerCase?.() || 'menu item'}?`}
                value={itemInput.description}
                type="textarea"
                rows={4}
                onChange={handleInputChange("description")}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!itemInput.name?.trim()) {
                      showToast.warning("Please enter the menu item name first.");
                      return;
                    }
                    try {
                      setIsGenerating(true);
                      const payload = {
                        name: itemInput.name,
                        course: currentCourse,
                        cuisine_types: Array.isArray(formData.cuisineTypes)
                          ? formData.cuisineTypes
                          : [],
                      };
                      const res = await menuService.generateMenuItemDescription(payload);
                      const description = res?.data?.description || "";
                      if (!description) {
                        showToast.error("No description received. Please try again.");
                        return;
                      }
                      setItemInput((prev) => ({ ...prev, description }));
                      showToast.success("AI description generated.");
                    } catch (err) {
                      showToast.error("Failed to generate description. Please try again.");
                    } finally {
                      setIsGenerating(false);
                    }
                  }}
                  disabled={isGenerating}
                  className={`text-sm px-3 py-2 rounded-lg border border-stone-300 shadow-sm ${
                    isGenerating
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-slate-700 hover:bg-gray-50"
                  }`}
                >
                  {isGenerating ? "Generating..." : "Generate with AI"}
                </button>
              </div>
              <button
                className="flex justify-end mt-3 text-sm font-semibold leading-none rounded-lg text-slate-700"
                onClick={handleAddItem}
              >
                <div className="flex overflow-hidden gap-2 justify-center items-center px-3.5 py-2 bg-white rounded-lg border border-solid shadow-sm border-stone-300">
                  <span className="self-stretch my-auto text-slate-700">
                    Add new {currentCourse?.toLowerCase?.() || 'menu item'}
                  </span>
                </div>
              </button>
              {/* List of added items for this course */}
              {(courseItems[currentCourse]?.length ?? 0) > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-semibold mb-2">
                    Added {currentCourse ? `${currentCourse}s` : 'menu items'}
                  </h4>
                  <ul className="space-y-2">
                    {courseItems[currentCourse].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between bg-gray-100 rounded px-3 py-2"
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-600">
                            {item.description}
                          </div>
                        </div>
                        <button
                          className="ml-2 text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveItem(idx)}
                          aria-label={`Remove ${currentCourse} item`}
                          type="button"
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

    {/* Per-course menu selection limit and additional charge - Only show if more than one menu item exists */}
    {(courseItems[currentCourse]?.length > 1) && (
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col gap-6 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Menu selection limit
            </label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg bg-transparent focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base h-[42px]"
              value={menuSelection[currentCourse] || "1"}
              onChange={handleMenuSelectionChange}
            >
              {Array.from(
                { length: courseItems[currentCourse]?.length || 0 },
                (_, i) => (i + 1).toString()
              ).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-full">
            <PriceInput
              label="Additional charge per extra selection (per person)"
              placeholder="e.g. 5.00"
              value={additionalStarterCharge[currentCourse] || ""}
              onChange={handleAdditionalStarterChargeChange(currentCourse)}
              currency={getCurrencySymbol({
                currency: user?.currency,
                country: chefFormData?.country
              })}
            />
          </div>
        </div>
      </div>
    )}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4e5e0e8d7af4287197a7d5d0575a23c15b68d216?placeholderIfAbsent=true"
          alt=""
          className="object-contain mt-28 w-full aspect-[500] stroke-[1px] stroke-neutral-200 max-md:mt-10 max-md:max-w-full"
        />

        <div className="flex justify-end w-full mt-8">
          <FormNavigationFooter
            onBack={handleBack}
            onContinue={handleNextCourse}
          />
        </div>
      </main>
    </div>
  );
};

export default CreateMenuStep2;
