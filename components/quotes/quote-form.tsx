import React, { useState } from "react";
import toast from "react-hot-toast";

import { FormField } from "../ui/form-field";

import { MenuSection } from "./menu-section";

export interface MenuItemInput {
  name: string;
  description: string;
  price?: string;
  course: string;
}

interface QuoteFormProps {
  menuItems: MenuItemInput[];
  onCreateQuote: (data: {
    items: MenuItemInput[];
    menuName: string;
  }) => Promise<void>;
  onMenuItemsChange?: (count: number) => void;
  isSubmitting?: boolean;
  bookingId?: number;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  menuItems = [],
  onCreateQuote,
  onMenuItemsChange,
  isSubmitting = false,
  bookingId,
}) => {
  const [menuName, setMenuName] = useState("");

  type CourseType = "starter" | "main" | "dessert" | "side";

  const [menuItemsState, setMenuItemsState] = useState<
    Record<CourseType, MenuItemInput[]>
  >(() => {
    const initialItems: Record<CourseType, MenuItemInput[]> = {
      starter: [],
      main: [],
      dessert: [],
      side: [],
    };

    // Initialize with any provided menu items
    (menuItems || []).forEach((item) => {
      if (item.course in initialItems) {
        const course = item.course as CourseType;

        initialItems[course].push(item);
      }
    });

    return initialItems;
  });

  const handleAddItem = (
    course: CourseType,
    item: { name: string; description: string; price?: string },
  ) => {
    const newItem: MenuItemInput = {
      ...item,
      course,
    };

    const updatedItems = {
      ...menuItemsState,
      [course]: [...menuItemsState[course], newItem],
    };

    setMenuItemsState(updatedItems);

    // Notify parent about the updated item count
    const allItems = Object.values(updatedItems).flat();

    onMenuItemsChange?.(allItems.length);
  };

  const handleRemoveItem = (course: CourseType, index: number) => {
    const updatedItems = {
      ...menuItemsState,
      [course]: menuItemsState[course].filter(
        (_item: MenuItemInput, i: number) => i !== index,
      ),
    };

    setMenuItemsState(updatedItems);

    // Notify parent about the updated item count
    const allItems = Object.values(updatedItems).flat();

    onMenuItemsChange?.(allItems.length);
  };

  // Update local state when menuItems prop changes
  React.useEffect(() => {
    const initialItems: Record<CourseType, MenuItemInput[]> = {
      starter: [],
      main: [],
      dessert: [],
      side: [],
    };

    // Initialize with any provided menu items
    (menuItems || []).forEach((item) => {
      if (item.course in initialItems) {
        const course = item.course as CourseType;

        initialItems[course].push(item);
      }
    });

    setMenuItemsState(initialItems);
  }, [menuItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allItems = Object.values(menuItemsState).flat();

    if (allItems.length === 0) {
      toast.error("Please add at least one menu item");

      return;
    }

    if (!menuName.trim()) {
      toast.error("Please enter a name for this menu");

      return;
    }

    // Call parent handler with current form data
    await onCreateQuote({
      items: allItems,
      menuName: menuName.trim(),
    });
  };

  return (
    <form className="flex flex-col h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center px-2.5 py-3 w-full bg-white rounded-md border-solid shadow-2xl border-[0.639px] border-neutral-200 max-md:max-w-full">
        <div className="flex gap-4 items-start">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9f5b325159a2a4814c8c96c3a0659ce4ebd41156?placeholderIfAbsent=true"
            className="object-contain shrink-0 aspect-[1.12] w-[113px]"
            alt="Braised Chicken"
          />
          <div className="flex flex-col min-w-60 w-[339px]">
            <h2 className="text-lg font-semibold leading-7 text-zinc-800">
              Braised Chicken With Lemon and Olives
            </h2>
            <div className="flex gap-2 items-center self-start px-2 py-1 mt-1 text-xs text-black bg-amber-100 rounded-md">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a9da32595396357c135403f4072880ce67d7078f?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                alt="Chef"
              />
              <span className="self-stretch my-auto">Chloe Esther</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Name Input */}
      <div className="my-6">
        <FormField
          label="Menu Name"
          type="text"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="Enter a name for this menu"
          required
        />
      </div>

      {/* Menu sections */}
      <MenuSection
        title="Starters"
        course="starter"
        items={menuItemsState.starter}
        onAddItem={(item) => handleAddItem("starter", item)}
        onRemoveItem={(index) => handleRemoveItem("starter", index)}
      />

      <MenuSection
        title="Mains"
        course="main"
        items={menuItemsState.main}
        onAddItem={(item) => handleAddItem("main", item)}
        onRemoveItem={(index) => handleRemoveItem("main", index)}
      />

      <MenuSection
        title="Desserts"
        course="dessert"
        items={menuItemsState.dessert}
        onAddItem={(item) => handleAddItem("dessert", item)}
        onRemoveItem={(index) => handleRemoveItem("dessert", index)}
      />

      <MenuSection
        title="Sides"
        course="side"
        items={menuItemsState.side}
        onAddItem={(item) => handleAddItem("side", item)}
        onRemoveItem={(index) => handleRemoveItem("side", index)}
      />

      {/* Submit Button */}
      <div className="mt-auto pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-800 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Creating Quote..." : "Create Quote"}
        </button>
      </div>
    </form>
  );
};
