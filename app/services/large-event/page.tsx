"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TagSelector } from "@/components/ui/tag-selector";

const EventForm = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [formData, setFormData] = useState({
    startingPrice: "000",
    minGuests: "",
    cuisines: ["African", "Modern English", "Italian"],
    events: ["Wedding", "Naming", "BBQ"],
  });
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    "https://api.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c7deb1c504227a725c7687bebba405b0d8b5f8fc?placeholderIfAbsent=true"
  );
  
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

  const allEvents = [
    "Wedding",
    "Naming",
    "BBQ",
    "Birthday",
    "Corporate",
    "Anniversary",
    "Festival",
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, uploadedImage });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[655px] mx-auto px-4 py-8 max-md:px-5">
        <h1 className="text-black text-2xl font-bold leading-8 mb-[53px] max-sm:text-xl max-sm:leading-7">
          Large Event
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
            <div className="flex items-center">
              <button
                type="button"
                role="switch"
                aria-checked={isAvailable}
                onClick={() => setIsAvailable(!isAvailable)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCC01C] ${
                  isAvailable ? "bg-[#FCC01C]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`${
                    isAvailable ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>
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
                  type="text"
                  id="startingPrice"
                  value={formData.startingPrice}
                  onChange={(e) => handleInputChange("startingPrice", e.target.value)}
                  className="w-full px-3.5 py-2.5 text-[#3F3E3D] text-[15px] font-normal bg-transparent border-0 focus:ring-0 focus:outline-none"
                  placeholder="000"
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
                type="number"
                id="minGuests"
                value={formData.minGuests}
                onChange={(e) => handleInputChange("minGuests", e.target.value)}
                className="w-full px-3.5 py-2.5 text-[#3F3E3D] text-[15px] font-normal border border-solid border-[#CFCFCE] rounded-lg focus:ring-1 focus:ring-[#FCC01C] focus:border-[#FCC01C] outline-none"
                placeholder="0"
              />
            </div>

            {/* Cuisines Field */}
            <div className="space-y-1.5">
              <TagSelector
                label="Cuisines"
                tags={allCuisines}
                selectedTags={formData.cuisines}
                onTagsChange={(cuisines) =>
                  setFormData((prev) => ({ ...prev, cuisines }))
                }
                className="w-full"
              />
            </div>

            {/* Event Field */}
            <div className="space-y-1.5">
              <TagSelector
                label="Event"
                tags={allEvents}
                selectedTags={formData.events}
                onTagsChange={(events) =>
                  setFormData((prev) => ({ ...prev, events }))
                }
                className="w-full"
              />
            </div>

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
            <div className="border-t border-solid border-[#CFCFCE] pt-[33px] pb-[23px] -mx-5 px-5 mt-6">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-[#FCC01C] border border-solid border-[#FCC01C] px-7 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#E6AC19] transition-colors"
              >
                <span className="text-white text-base font-bold leading-6">
                  Save changes
                </span>
              </button>
            </div>
          </div>
        </form>
      </section>
      </div>
    </div>
  );
};

export default EventForm;
