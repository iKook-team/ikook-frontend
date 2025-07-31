"use client";
import * as React from "react";
import Image from "next/image";

import { TagSelector } from "@/components/ui/tag-selector";

interface FormData {
  startingPrice: string;
  minGuests: string;
  maxGuests: string;
  cuisines: string[];
  events: string[];
  deliveryHours: string;
}

const GourmetDeliveryForm: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(true);
  const [formData, setFormData] = React.useState<FormData>({
    startingPrice: "",
    minGuests: "",
    maxGuests: "",
    cuisines: [],
    events: [],
    deliveryHours: "",
  });

  React.useEffect(() => {
    setIsMounted(true);
    setFormData({
      startingPrice: "000",
      minGuests: "",
      maxGuests: "",
      cuisines: ["African", "Modern English", "Italian"],
      events: ["Wedding", "Naming", "BBQ"],
      deliveryHours: "",
    });
  }, []);
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Don't render the form until after mounting to prevent hydration issues
  if (!isMounted) {
    return (
      <main className="w-full max-w-[655px] mx-auto px-4 py-8 max-md:px-5">
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading form...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-[655px] mx-auto px-4 py-8 max-md:px-5">
      <h1 className="text-black text-2xl font-bold leading-8 mb-[53px] max-sm:text-xl max-sm:leading-7">
        Meal Delivery
      </h1>
        
        <section className="bg-white rounded-[15px] border border-solid border-[#E7E7E7] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Availability Toggle */}
          <div className="flex items-center justify-between px-[17px] py-11 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
            <label className="text-[#020101] text-[15px] font-normal">
              Availability
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAvailable(!isAvailable)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 ${
                  isAvailable ? 'bg-[#FCC01C]' : 'bg-gray-200'
                }`}
                aria-label="Toggle availability"
              >
                <span className={`${isAvailable ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-5 pb-5">
            <div className="space-y-6">

            <div className="space-y-6">
              {/* Starting Price */}
              <div className="space-y-1.5">
                <label htmlFor="startingPrice" className="block text-[#3F3E3D] text-[15px] font-normal">
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
                    className="flex-1 px-3.5 py-2.5 border-l border-solid border-[#CFCFCE] rounded-r-lg text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                    placeholder="000"
                  />
                </div>
              </div>

              {/* Minimum Guests */}
              <div className="space-y-1.5">
                <label className="block text-[#3F3E3D] text-[15px] font-normal">
                  Minimum number of guests
                </label>
                <input
                  type="number"
                  id="minGuests"
                  value={formData.minGuests}
                  onChange={(e) => handleInputChange("minGuests", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-sm bg-white text-[#6F6E6D] text-base focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                  placeholder="Enter Number"
                  min="0"
                />
              </div>

              {/* Maximum Guests */}
              <div className="space-y-1.5">
                <label className="block text-[#3F3E3D] text-[15px] font-normal">
                  Maximum number of guests
                </label>
                <input
                  type="number"
                  id="maxGuests"
                  value={formData.maxGuests}
                  onChange={(e) => handleInputChange("maxGuests", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-sm bg-white text-[#6F6E6D] text-base focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                  placeholder="Enter Number"
                  min={formData.minGuests || 0}
                />
              </div>

              {/* Cuisines */}
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

              {/* Events */}
              <div className="space-y-1.5">
                <TagSelector
                  label="Event Types"
                  tags={allEvents}
                  selectedTags={formData.events}
                  onTagsChange={(events) =>
                    setFormData((prev) => ({ ...prev, events }))
                  }
                  className="w-full"
                />
              </div>

              {/* Delivery Hours */}
              <div className="space-y-1.5">
                <label htmlFor="deliveryHours" className="block text-[#3F3E3D] text-[15px] font-normal">
                  Delivery hours
                </label>
                <input
                  type="text"
                  id="deliveryHours"
                  value={formData.deliveryHours}
                  onChange={(e) => handleInputChange("deliveryHours", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-sm bg-white text-[#6F6E6D] text-base focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-8 pt-6 border-t border-[#E7E7E7]">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#E7E7E7] rounded-xl p-6 text-center">
                <p className="text-[#6F6E6D] text-sm mb-3">
                  (Recommended 1000px width, 1000px height. Maximum of 1MB file size)
                </p>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-solid border-[#9F9F9E] bg-white text-[#3F3E3D] text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCC01C]"
                >
                  Select cover image
                </button>
              </div>
              
              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-[#FCC01C] hover:bg-[#E6AC00] text-[#3F3E3D] font-semibold py-3 px-6 rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default GourmetDeliveryForm;
