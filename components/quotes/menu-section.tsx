import React, { useState } from "react";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";

import { FormField } from "../ui/form-field";
import { PriceInput } from "../ui/price-input";

export interface MenuItemInput {
  name: string;
  description: string;
  price?: string;
  course: string;
}

interface MenuSectionProps {
  title: string;
  course: string;
  items: MenuItemInput[];
  onAddItem: (item: {
    name: string;
    description: string;
    price?: string;
  }) => void;
  onRemoveItem: (index: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  course,
  items = [],
  onAddItem,
  onRemoveItem,
}) => {
  const { market } = useMarket();
  const cfg = getMarketConfig(market);
  const currencySymbol = cfg.currencySymbol;
  const [itemInput, setItemInput] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleInputChange =
    (field: "name" | "description" | "price") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setItemInput((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handlePriceChange = (value: string) => {
    setItemInput((prev) => ({ ...prev, price: value }));
  };

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    const { name, description, price } = itemInput;

    if (!name) return;

    onAddItem({ name, description, price });
    setItemInput({ name: "", description: "", price: "" });
  };

  return (
    <div className="mt-6 max-md:max-w-full">
      <h3 className="text-base font-medium text-black">{title}</h3>
      <div className="mt-6 max-md:max-w-full">
        <div className="flex flex-col w-full">
          <FormField
            label="Menu item name"
            placeholder={`What's the ${course.toLowerCase()} name?`}
            value={itemInput.name}
            onChange={handleInputChange("name")}
          />
          <FormField
            label="Menu item description"
            className="mt-5"
            placeholder={`Describe the ${course.toLowerCase()}?`}
            value={itemInput.description}
            onChange={handleInputChange("description")}
          />
          <div className="mt-5">
            <PriceInput
              label="Price"
              placeholder="Enter price"
              value={itemInput.price}
              onChange={handlePriceChange}
              currency={currencySymbol}
              className="max-w-full w-full"
            />
          </div>
          <button
            className="flex justify-end mt-3 text-sm font-semibold leading-none rounded-lg text-slate-700"
            onClick={handleAddItem}
            type="button"
          >
            <div className="flex overflow-hidden gap-2 justify-center items-center px-3.5 py-2 bg-white rounded-lg border border-solid shadow-sm border-stone-300">
              <span className="self-stretch my-auto text-slate-700">
                Add new {course.toLowerCase()}
              </span>
            </div>
          </button>

          {/* List of added items */}
          {items.length > 0 && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold mb-2">Added {title}</h4>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-gray-100 rounded px-3 py-2"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        {item.price && (
                          <span className="ml-2 font-medium">
                            {currencySymbol}
                            {item.price}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <div className="text-xs text-gray-600 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <button
                      className="ml-2 text-gray-400 hover:text-red-500"
                      onClick={() => onRemoveItem(idx)}
                      aria-label={`Remove ${course} item`}
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
    </div>
  );
};
