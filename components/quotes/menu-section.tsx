import React from "react";

import { FormField } from "../ui/form-field";
import { PriceInput } from "../ui/price-input";

interface MenuSectionProps {
  title: string;
  buttonText?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  buttonText = "Add new starter",
}) => {
  return (
    <div className="mt-6 max-w-full w-[488px]">
      <h3 className="text-lg font-medium leading-loose text-black">{title}</h3>
      <div className="flex flex-col items-end mt-5 w-full max-w-[488px] max-md:max-w-full">
        <FormField
          label="Menu name"
          placeholder="What's the menu name?"
          className="w-full"
        />
        <FormField
          label="Menu Description"
          placeholder="Describe the menu?"
          className="mt-3 w-full"
        />
        <PriceInput
          label="Price"
          placeholder="Price per person"
          className="mt-3"
        />
        <div className="flex items-start mt-3 text-sm font-semibold leading-none rounded-lg text-slate-700">
          <button className="flex overflow-hidden gap-2 justify-center items-center px-3.5 py-2 bg-white rounded-lg border border-solid shadow-sm border-stone-300">
            <span className="self-stretch my-auto text-slate-700">
              {buttonText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
