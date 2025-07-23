import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { FormField } from "../ui/form-field";
import { MenuSection } from "./menu-section";

interface QuoteFormProps {
  onPreview: (data: any) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ onPreview }) => {
  const [formData, setFormData] = useState({
    // Add your form fields here
    menuItems: [],
    totalPrice: 0,
    menuName: '',
    // ... other form fields
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just prevent default, don't trigger preview here
    // The preview will be handled by the drawer's footer button
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <form id="quote-form" className="grow mt-6 max-md:mt-10 max-md:max-w-full">
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

<div className="mt-6 max-md:max-w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Menu name
        </label>
        <input
          type="text"
          name="menuName"
          placeholder="Give this Quote a name"
          value={formData.menuName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

<div className="mt-6 max-md:max-w-full">
        <MenuSection title="Starter Menu" />
        <MenuSection title="Main Menu" />
        <MenuSection title="Dessert Menu" />
        <MenuSection title="Side Menu" />
      </div>
    </form>
  );
};
