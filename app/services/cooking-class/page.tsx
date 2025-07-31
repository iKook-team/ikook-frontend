"use client";

import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";

const CookingClassPage: React.FC = () => {
  const [formData, setFormData] = useState({
    startingPrice: "",
    minimumGuests: "",
    availability: false,
    physical: false,
    virtual: true,
    selectedCuisines: ["African", "Modern English", "Italian"],
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const allCuisines = [
    "African",
    "Modern English",
    "Italian",
    "Chinese",
    "French",
    "English",
    "Spicy Mediterranean",
    "Pizza",
    "Pastries",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (1MB max)
      if (file.size > 1024 * 1024) {
        alert('File size should not exceed 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  return (
    <main className="w-full max-w-[655px] mx-auto px-4 py-8 max-md:px-5 bg-[#FBFBFB] min-h-screen">
      <h1 className="text-black text-2xl font-bold leading-8 mb-[53px] max-sm:text-xl max-sm:leading-7">
        Cooking class
      </h1>

      <section className="bg-white rounded-[15px] border border-solid border-[#E7E7E7] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Availability Toggle */}
        <div className="flex items-center justify-between px-[17px] py-11 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
          <label
            htmlFor="availability"
            className="text-[#020101] text-[15px] font-normal"
          >
            Availability
          </label>
          <Toggle 
            checked={formData.availability} 
            onChange={(checked) => 
              setFormData(prev => ({ ...prev, availability: checked }))
            } 
          />
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="px-5 pb-5">
          <div className="space-y-6">
            {/* Starting Price */}
            <div className="space-y-1.5">
              <label
                htmlFor="startingPrice"
                className="block text-[#3F3E3D] text-[15px] font-normal"
              >
                Starting price (per person)
              </label>
              <div className="flex border border-solid border-[#CFCFCE] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white">
                <div className="flex items-center px-3.5 py-2.5 bg-white rounded-l-lg">
                  <span className="text-[#3F3E3D] text-[15px] font-normal">
                    £
                  </span>
                </div>
                <input
                  id="startingPrice"
                  type="number"
                  value={formData.startingPrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startingPrice: e.target.value,
                    }))
                  }
                  className="flex-1 px-3.5 py-2.5 border-l border-solid border-[#CFCFCE] rounded-r-lg text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                  placeholder="000"
                  required
                />
              </div>
            </div>

            {/* Minimum Guests */}
            <div className="space-y-1.5">
              <label
                htmlFor="minGuests"
                className="block text-[#3F3E3D] text-[15px] font-normal"
              >
                Minimum number of guests
              </label>
              <input
                id="minGuests"
                type="number"
                value={formData.minimumGuests}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    minimumGuests: e.target.value,
                  }))
                }
                className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                placeholder="Enter Number"
                required
              />
            </div>

            {/* Cuisines */}
            <div className="space-y-1.5">
              <label className="text-[#3F3E3D] text-[15px] font-medium block">
                Cuisines
              </label>
              <div className="relative">
                <div className="items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden flex-wrap bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#9F9F9E]">
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedCuisines.map((cuisine, index) => (
                      <div
                        key={index}
                        className="justify-center items-center border flex gap-2.5 whitespace-nowrap bg-[#FFFCF5] px-2.5 py-1 rounded-[40px] border-solid border-[#F9DF98]"
                      >
                        <span className="self-stretch my-auto text-xs">{cuisine}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ml-auto"
                    onClick={() => {
                      // Implement cuisine selection dropdown
                      console.log("Open cuisine selection");
                    }}
                  >
                    <img
                      src="https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/42bd1dbae42ae099e37cc5b59c5eb797f293ee10?placeholderIfAbsent=true"
                      className="w-4 h-4"
                      alt="Dropdown arrow"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Class Type */}
            <fieldset className="space-y-4">
              <legend className="text-[#3F3E3D] text-[15px] font-normal">
                Class Type
              </legend>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="physical"
                    checked={formData.physical}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        physical: e.target.checked,
                      }))
                    }
                  />
                  <label
                    htmlFor="physical"
                    className="text-[#3F3E3D] text-[15px] font-normal"
                  >
                    Physical
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="virtual"
                    checked={formData.virtual}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        virtual: e.target.checked,
                      }))
                    }
                  />
                  <label
                    htmlFor="virtual"
                    className="text-[#3F3E3D] text-[15px] font-normal"
                  >
                    Virtual
                  </label>
                </div>
              </div>
            </fieldset>

            {/* Image Upload Section */}
            <div className="mt-12 mb-8">
              {!uploadedImage ? (
                <div className="flex flex-col items-center justify-center gap-[9px] border-dashed border border-[#CFCFCE] rounded-xl p-2.5 h-[122px]">
                  <p className="text-[#323335] text-center text-[10px] font-normal max-w-[272px]">
                    (Recommended 1000px width, 1000px height. Maximum of 1MB file size)
                  </p>
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <div className="flex justify-center items-center gap-2.5 border border-solid border-[#B7B7B6] p-2.5 rounded-md">
                      <span className="text-[#323335] text-center text-[10px] font-normal">
                        Select cover image
                      </span>
                    </div>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded cover"
                    className="w-full h-[257px] rounded-[15px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-[11px] right-3 bg-[#FFF5F5] p-1 rounded-[30px] hover:bg-red-100 transition-colors"
                    aria-label="Remove image"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 18L18 6M6 6L18 18"
                        stroke="#EF4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#FCC01C] hover:bg-[#e6b01a] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CookingClassPage;
