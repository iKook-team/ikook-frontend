"use client";

import React, { useState } from "react";

import { FormField } from "@/components/ui/form-field";

// Custom Toggle component for the specific design
const CustomToggle: React.FC<{
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center flex-wrap max-md:max-w-full">
      <div className="text-[#020101] text-[15px] font-normal self-stretch w-[298px] my-auto">
        {label}
      </div>
      <button
        onClick={handleToggle}
        className="self-stretch w-[37px] my-auto focus:outline-none"
        role="switch"
        aria-checked={isChecked}
      >
        <div
          className={`flex flex-col justify-center px-1 py-0.5 rounded-[33.333px] border-[0.667px] border-solid transition-colors ${isChecked ? "bg-[#FCC01C] border-[#F9DF98]" : "bg-gray-300 border-gray-400"}`}
        >
          <div
            className={`flex w-[18px] shrink-0 h-[17px] bg-white rounded-[50%] transition-transform ${isChecked ? "translate-x-4" : "translate-x-0"}`}
          />
        </div>
      </button>
    </div>
  );
};

// Custom Checkbox component for the specific design
const CustomCheckbox: React.FC<{
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleChange}
        className="self-stretch flex items-center justify-center w-5 my-auto focus:outline-none"
        role="checkbox"
        aria-checked={isChecked}
      >
        {isChecked ? (
          <img
            src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/24e72676cb86b014297e05fa4f79d27b06cf17b4?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-5 self-stretch my-auto"
            alt="Checked"
          />
        ) : (
          <div className="border self-stretch flex min-h-5 w-5 h-5 bg-white my-auto rounded-md border-solid border-[#CFCFCE]" />
        )}
      </button>
      <label className="text-[#3F3E3D] text-[15px] font-normal self-stretch my-auto cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export const CookingClassForm: React.FC = () => {
  const [formData, setFormData] = useState({
    startingPrice: "",
    minimumGuests: "",
    availability: false,
    physical: false,
    virtual: true,
    selectedCuisines: ["African", "Modern English", "Italian"],
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="self-center flex w-[655px] max-w-full flex-col items-stretch mt-[21px]">
      <h1 className="text-black text-2xl font-semibold leading-none">
        Cooking class
      </h1>

      <div className="border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-center bg-white mt-[21px] pt-11 rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full">
        <CustomToggle
          label="Availability"
          checked={formData.availability}
          onChange={(checked) =>
            setFormData((prev) => ({ ...prev, availability: checked }))
          }
        />

        <form
          onSubmit={handleSubmit}
          className="flex w-[608px] max-w-full flex-col items-stretch mt-[18px]"
        >
          <div className="space-y-1.5">
            <label className="block text-[#3F3E3D] text-[15px] font-normal">
              Starting price (per person)
            </label>
            <div className="flex border border-solid border-[#CFCFCE] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white">
              <div className="flex items-center px-3.5 py-2.5 bg-white rounded-l-lg">
                <span className="text-[#3F3E3D] text-[15px] font-normal">£</span>
              </div>
              <input
                type="number"
                value={formData.startingPrice}
                onChange={e => setFormData(prev => ({ ...prev, startingPrice: e.target.value }))}
                className="flex-1 px-3.5 py-2.5 border-l border-solid border-[#CFCFCE] rounded-r-lg text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                placeholder="000"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 mt-6">
            <label className="block text-[#3F3E3D] text-[15px] font-normal">
              Minimum number of guests
            </label>
            <input
              type="number"
              value={formData.minimumGuests}
              onChange={e => setFormData(prev => ({ ...prev, minimumGuests: e.target.value }))}
              className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
              placeholder="Enter Number"
              required
            />
          </div>

          <div className="flex w-full max-w-[608px] flex-col items-stretch mt-6 pb-2.5 max-md:max-w-full">
            <div className="max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <div className="w-full max-md:max-w-full">
                  <label className="text-[#3F3E3D] text-[15px] font-medium">
                    Cuisines
                  </label>
                  <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden flex-wrap bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid border-[#9F9F9E] max-md:max-w-full">
                    <div className="self-stretch flex min-w-60 w-[556px] shrink h-6 gap-2 flex-1 basis-[0%] my-auto" />
                    <img
                      src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/42bd1dbae42ae099e37cc5b59c5eb797f293ee10?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                      alt="Dropdown arrow"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="z-10 flex gap-1 text-xs text-black font-normal -mt-9">
              {formData.selectedCuisines.map((cuisine, index) => (
                <div
                  key={index}
                  className="justify-center items-center border flex gap-2.5 whitespace-nowrap bg-[#FFFCF5] px-2.5 py-1 rounded-[40px] border-solid border-[#F9DF98]"
                >
                  <span className="self-stretch my-auto">{cuisine}</span>
                </div>
              ))}
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="text-[#3F3E3D] text-[15px] font-medium">
              Appearance
            </legend>
            <div className="flex flex-col items-stretch mt-4">
              <CustomCheckbox
                label="Physical"
                checked={formData.physical}
                onChange={(checked) =>
                  setFormData((prev) => ({ ...prev, physical: checked }))
                }
              />
              <div className="mt-3">
                <CustomCheckbox
                  label="Virtual"
                  checked={formData.virtual}
                  onChange={(checked) =>
                    setFormData((prev) => ({ ...prev, virtual: checked }))
                  }
                />
              </div>
            </div>
          </fieldset>

          {uploadedImage ? (
            <div className="relative w-[613px] max-w-full mt-[51px] max-md:mt-10">
              <img
                src={uploadedImage}
                className="aspect-[2.39] object-contain w-full z-0 rounded-[15px]"
                alt="Uploaded cover"
              />
              <button
                type="button"
                onClick={() => setUploadedImage(null)}
                className="absolute z-0 flex w-6 gap-2.5 h-6 bg-[#FFF5F5] p-1 rounded-[30px] right-3 top-[11px] hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9ff3a8671eb60e8c4b232102699e1a0945d86519?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4"
                  alt="Remove"
                />
              </button>
            </div>
          ) : (
            <div className="relative w-[613px] max-w-full mt-[51px] max-md:mt-10">
              <img
                src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c7deb1c504227a725c7687bebba405b0d8b5f8fc?placeholderIfAbsent=true"
                className="aspect-[2.39] object-contain w-full z-0 rounded-[15px]"
                alt="Default cooking class"
              />
              <div className="absolute z-0 flex w-6 gap-2.5 h-6 bg-[#FFF5F5] p-1 rounded-[30px] right-3 top-[11px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9ff3a8671eb60e8c4b232102699e1a0945d86519?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4"
                  alt="Heart icon"
                />
              </div>
            </div>
          )}

          <div className="justify-center items-center self-stretch flex w-full flex-col overflow-hidden text-base text-white font-semibold bg-white px-[66px] py-7 border-t-[#CFCFCE] border-t border-solid max-md:max-w-full max-md:px-5">
            <button
              type="submit"
              className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden bg-[#FCC01C] ml-[11px] px-7 py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#E6AB19] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 max-md:px-5"
            >
              <span className="text-white self-stretch my-auto">
                Save changes
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const CenteredCookingClassPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#FBFBFB]">
    <CookingClassForm />
  </div>
);

export default CenteredCookingClassPage;