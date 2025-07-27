"use client";

import React, { useState } from "react";

import { FormField } from "../ui/form-field";
import { PriceInput } from "../ui/price-input";

import { ProgressStepper } from "./progress-indicator";
import FormNavigationFooter from "./form-navigation-footer";

import { MenuFormData } from "@/types/menu-form";
import { useAuthStore } from "@/lib/store/auth-store";

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
  const chefFormData = useAuthStore((s) => s.chefFormData);
  const country = chefFormData?.country;

  function getCurrencySymbol(country?: string) {
    if (!country) return "£";
    if (country === "Nigeria") return "₦";
    if (country === "South Africa") return "R";
    if (country === "United Kingdom") return "£";

    return "£";
  }
  const currency = getCurrencySymbol(country);
  const courses = formData.courses || courseLabels;
  const [currentCourseIdx, setCurrentCourseIdx] = useState(0);
  const [courseItems, setCourseItems] = useState<
    Record<string, { name: string; description: string }[]>
  >(formData.courseItems || {});
  const [itemInput, setItemInput] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });
  const [menuSelection, setMenuSelection] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};

      (formData.courses || courseLabels).forEach((course: string) => {
        initial[course] = "1";
      });

      return initial;
    },
  );
  const [additionalStarterCharge, setAdditionalStarterCharge] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};

    (formData.courses || courseLabels).forEach((course: string) => {
      initial[course] = "";
    });

    return initial;
  });

  React.useEffect(() => {
    setCourseItems(formData.courseItems || {});
    setMenuSelection(() => {
      const initial: Record<string, string> = {};

      (formData.courses || courseLabels).forEach((course: string) => {
        initial[course] = "1";
      });

      return initial;
    });
    setAdditionalStarterCharge(() => {
      const initial: Record<string, string> = {};

      (formData.courses || courseLabels).forEach((course: string) => {
        initial[course] = "";
      });

      return initial;
    });
  }, [formData]);

  const currentCourse = courses[currentCourseIdx];

  const handleInputChange =
    (field: "name" | "description") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setItemInput((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleMenuSelectionChange =
    (course: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setMenuSelection((prev) => ({ ...prev, [course]: e.target.value }));
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

  const handleNextCourse = () => {
    if (currentCourseIdx < courses.length - 1) {
      setCurrentCourseIdx(currentCourseIdx + 1);
      setItemInput({ name: "", description: "" });
    } else {
      // Last course, continue to next step
      const courseKeys = Object.keys(courseItems).filter(
        (key: string) => courseItems[key] && courseItems[key].length > 0,
      );
      const coursesArr = courseKeys;
      const coursesSelectionLimit: Record<string, number> = {};
      const coursesExtraChargePerPerson: Record<string, string> = {};

      courseKeys.forEach((course: string) => {
        const itemCount = courseItems[course]?.length || 0;
        let limit = menuSelection[course]
          ? parseInt(menuSelection[course], 10)
          : 1;

        if (itemCount < 1) return; // skip if no items
        limit = Math.max(1, Math.min(limit, itemCount));
        coursesSelectionLimit[course] = limit;
        if (additionalStarterCharge[course]) {
          coursesExtraChargePerPerson[course] = additionalStarterCharge[course];
        }
      });
      // Flatten courseItems into menuItems array
      const menuItems = courseKeys.flatMap((course: string) =>
        (courseItems[course] || []).map((item) => ({
          course,
          name: item.name,
          description: item.description,
        })),
      );

      updateFormData({
        ...formData,
        courseItems,
        menuSelection,
        additionalStarterCharge,
        courses: coursesArr,
        coursesSelectionLimit,
        coursesExtraChargePerPerson,
        menuItems,
      });
      onContinue();
    }
  };

  const handleBack = () => {
    if (currentCourseIdx > 0) {
      setCurrentCourseIdx(currentCourseIdx - 1);
      setItemInput({ name: "", description: "" });
    } else {
      const courseKeys = Object.keys(courseItems).filter(
        (key: string) => courseItems[key] && courseItems[key].length > 0,
      );
      const coursesArr = courseKeys;
      const coursesSelectionLimit: Record<string, number> = {};
      const coursesExtraChargePerPerson: Record<string, string> = {};

      courseKeys.forEach((course: string) => {
        const itemCount = courseItems[course]?.length || 0;
        let limit = menuSelection[course]
          ? parseInt(menuSelection[course], 10)
          : 1;

        if (itemCount < 1) return; // skip if no items
        limit = Math.max(1, Math.min(limit, itemCount));
        coursesSelectionLimit[course] = limit;
        if (additionalStarterCharge[course]) {
          coursesExtraChargePerPerson[course] = additionalStarterCharge[course];
        }
      });
      // Flatten courseItems into menuItems array
      const menuItems = courseKeys.flatMap((course: string) =>
        (courseItems[course] || []).map((item) => ({
          course,
          name: item.name,
          description: item.description,
        })),
      );

      updateFormData({
        ...formData,
        courseItems,
        menuSelection,
        additionalStarterCharge,
        courses: coursesArr,
        coursesSelectionLimit,
        coursesExtraChargePerPerson,
        menuItems,
      });
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
                placeholder={`What's the ${currentCourse.toLowerCase()} name?`}
                value={itemInput.name}
                onChange={handleInputChange("name")}
              />
              <FormField
                label="Menu item description"
                className="mt-5"
                placeholder={`Describe the ${currentCourse.toLowerCase()}?`}
                value={itemInput.description}
                onChange={handleInputChange("description")}
              />
              <button
                className="flex justify-end mt-3 text-sm font-semibold leading-none rounded-lg text-slate-700"
                onClick={handleAddItem}
              >
                <div className="flex overflow-hidden gap-2 justify-center items-center px-3.5 py-2 bg-white rounded-lg border border-solid shadow-sm border-stone-300">
                  <span className="self-stretch my-auto text-slate-700">
                    Add new {currentCourse.toLowerCase()}
                  </span>
                </div>
              </button>
              {/* List of added items for this course */}
              {(courseItems[currentCourse]?.length ?? 0) > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-semibold mb-2">
                    Added {currentCourse}s
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

        {/* Per-course menu selection limit and additional charge */}
        <div className="flex flex-col gap-6 mt-6">
          <FormField
            label="Menu selection limit"
            type="number"
            value={menuSelection[currentCourse] || "1"}
            onChange={handleMenuSelectionChange(currentCourse)}
            placeholder="Enter maximum menu selection (1-10)"
          />
          <PriceInput
            label="Additional starter charge (per person)"
            placeholder="e.g. 5.00"
            value={additionalStarterCharge[currentCourse] || ""}
            onChange={handleAdditionalStarterChargeChange(currentCourse)}
            currency={currency}
          />
        </div>

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
