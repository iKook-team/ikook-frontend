"use client";

import React, { useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { TagSelector } from "@/components/ui/tag-selector";

const MealPrepForm: React.FC = () => {
  const [availability, setAvailability] = useState(true);
  const [startingPrice, setStartingPrice] = useState("000");
  const [minGuests, setMinGuests] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState([
    "African",
    "Modern English",
    "Italian",
  ]);
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
  const [appearance, setAppearance] = useState({
    weekly: false,
    monthly: true,
  });
  const [delivery, setDelivery] = useState({ physical: false, gourmet: true });
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    "https://api.builder.io/api/v1/image/assets/TEMP/aabf432e495c3e13e0904f13fdcb6a489c241245?width=1226",
  );

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      availability,
      startingPrice,
      minGuests,
      selectedCuisines,
      appearance,
      delivery,
      uploadedImage,
    });
  };

  return (
    <main className="w-full max-w-[655px] mx-auto px-4 py-8 max-md:px-5">
      <h1 className="text-black text-2xl font-bold leading-8 mb-[53px] max-sm:text-xl max-sm:leading-7">
        Meal prep
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
          <Toggle checked={availability} onChange={setAvailability} />
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
                  type="text"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 border-l border-solid border-[#CFCFCE] rounded-r-lg text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
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
                id="minGuests"
                type="text"
                value={minGuests}
                onChange={(e) => setMinGuests(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                placeholder="Enter Number"
              />
            </div>

            {/* Cuisines */}
            <div className="space-y-1.5">
              <TagSelector
                label="Cuisines"
                tags={allCuisines}
                selectedTags={selectedCuisines}
                onTagsChange={setSelectedCuisines}
                className="w-full"
              />
            </div>

            {/* Appearance */}
            <fieldset className="space-y-4">
              <legend className="text-[#3F3E3D] text-[15px] font-normal">
                Appearance
              </legend>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="weekly"
                    checked={appearance.weekly}
                    onChange={(e) =>
                      setAppearance((prev) => ({
                        ...prev,
                        weekly: e.target.checked,
                      }))
                    }
                  />
                  <label
                    htmlFor="weekly"
                    className="text-[#3F3E3D] text-[15px] font-normal"
                  >
                    Weekly
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="monthly"
                    checked={appearance.monthly}
                    onChange={(e) =>
                      setAppearance((prev) => ({
                        ...prev,
                        monthly: e.target.checked,
                      }))
                    }
                  />
                  <label
                    htmlFor="monthly"
                    className="text-[#3F3E3D] text-[15px] font-normal"
                  >
                    Monthly
                  </label>
                </div>
              </div>
            </fieldset>

            {/* Delivery */}
            <fieldset className="space-y-4">
              <legend className="text-[#3F3E3D] text-[15px] font-normal">
                Delivery
              </legend>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="physical"
                    checked={delivery.physical}
                    onChange={(e) =>
                      setDelivery((prev) => ({
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
                    id="gourmet"
                    checked={delivery.gourmet}
                    onChange={(e) =>
                      setDelivery((prev) => ({
                        ...prev,
                        gourmet: e.target.checked,
                      }))
                    }
                  />
                  <label
                    htmlFor="gourmet"
                    className="text-[#3F3E3D] text-[15px] font-normal"
                  >
                    Gourmet
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          {/* Image Upload Section */}
          <div className="mt-12 mb-8">
            {!uploadedImage ? (
              <div className="flex flex-col items-center justify-center gap-[9px] border-dashed border border-[#CFCFCE] rounded-xl p-2.5 h-[122px]">
                <p className="text-[#323335] text-center text-[10px] font-normal max-w-[272px]">
                  (Recommended 1000px width, 1000px height. Maximum of 1MB file
                  size)
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
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.16634 6.66667C7.16634 6.39052 6.94248 6.16667 6.66634 6.16667C6.3902 6.16667 6.16634 6.39052 6.16634 6.66667H7.16634ZM6.16634 12C6.16634 12.2761 6.3902 12.5 6.66634 12.5C6.94248 12.5 7.16634 12.2761 7.16634 12H6.16634ZM9.83301 6.66667C9.83301 6.39052 9.60915 6.16667 9.33301 6.16667C9.05687 6.16667 8.83301 6.39052 8.83301 6.66667H9.83301ZM8.83301 12C8.83301 12.2761 9.05687 12.5 9.33301 12.5C9.60915 12.5 9.83301 12.2761 9.83301 12H8.83301ZM4.72769 13.8547L4.95468 13.4092H4.95468L4.72769 13.8547ZM4.145 13.272L4.5905 13.045L4.5905 13.045L4.145 13.272ZM11.8544 13.272L11.4088 13.045V13.045L11.8544 13.272ZM11.2717 13.8547L11.0447 13.4092H11.0447L11.2717 13.8547ZM3.33301 4.16667C3.05687 4.16667 2.83301 4.39052 2.83301 4.66667C2.83301 4.94281 3.05687 5.16667 3.33301 5.16667V4.16667ZM12.6663 5.16667C12.9425 5.16667 13.1663 4.94281 13.1663 4.66667C13.1663 4.39052 12.9425 4.16667 12.6663 4.16667V5.16667ZM5.16634 4.66667C5.16634 4.94281 5.3902 5.16667 5.66634 5.16667C5.94248 5.16667 6.16634 4.94281 6.16634 4.66667H5.16634ZM9.83301 4.66667C9.83301 4.94281 10.0569 5.16667 10.333 5.16667C10.6092 5.16667 10.833 4.94281 10.833 4.66667H9.83301ZM6.16634 6.66667V12H7.16634V6.66667H6.16634ZM8.83301 6.66667V12H9.83301V6.66667H8.83301ZM11.4997 4.66667V11.8667H12.4997V4.66667H11.4997ZM9.86634 13.5H6.13301V14.5H9.86634V13.5ZM3.49967 4.66667V11.8667H4.49967V4.66667H3.49967ZM6.13301 13.5C5.75139 13.5 5.49525 13.4996 5.29799 13.4835C5.10658 13.4679 5.01506 13.4399 4.95468 13.4092L4.50069 14.3002C4.72553 14.4147 4.9633 14.4595 5.21656 14.4802C5.46398 14.5004 5.76789 14.5 6.13301 14.5V13.5ZM3.49967 11.8667C3.49967 12.2318 3.49929 12.5357 3.5195 12.7831C3.54019 13.0364 3.58493 13.2741 3.6995 13.499L4.5905 13.045C4.55974 12.9846 4.53182 12.8931 4.51618 12.7017C4.50006 12.5044 4.49967 12.2483 4.49967 11.8667H3.49967ZM4.95468 13.4092C4.79788 13.3293 4.6704 13.2018 4.5905 13.045L3.6995 13.499C3.87526 13.8439 4.15573 14.1244 4.50069 14.3002L4.95468 13.4092ZM11.4997 11.8667C11.4997 12.2483 11.4993 12.5044 11.4832 12.7017C11.4675 12.8931 11.4396 12.9846 11.4088 13.045L12.2999 13.499C12.4144 13.2741 12.4592 13.0364 12.4798 12.7831C12.5001 12.5357 12.4997 12.2318 12.4997 11.8667H11.4997ZM9.86634 14.5C10.2315 14.5 10.5354 14.5004 10.7828 14.4802C11.036 14.4595 11.2738 14.4147 11.4987 14.3002L11.0447 13.4092C10.9843 13.4399 10.8928 13.4679 10.7014 13.4835C10.5041 13.4996 10.248 13.5 9.86634 13.5V14.5ZM11.4088 13.045C11.329 13.2018 11.2015 13.3293 11.0447 13.4092L11.4987 14.3002C11.8436 14.1244 12.1241 13.8439 12.2999 13.499L11.4088 13.045ZM3.33301 5.16667H3.99967V4.16667H3.33301V5.16667ZM3.99967 5.16667H11.9997V4.16667H3.99967V5.16667ZM11.9997 5.16667H12.6663V4.16667H11.9997V5.16667ZM6.16634 4.13333C6.16634 3.2725 6.94404 2.5 7.99967 2.5V1.5C6.47798 1.5 5.16634 2.63775 5.16634 4.13333H6.16634ZM7.99967 2.5C9.05531 2.5 9.83301 3.2725 9.83301 4.13333H10.833C10.833 2.63775 9.52136 1.5 7.99967 1.5V2.5ZM5.16634 4.13333V4.66667H6.16634V4.13333H5.16634ZM9.83301 4.13333V4.66667H10.833V4.13333H9.83301Z"
                      fill="#B8251B"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="border-t border-solid border-[#CFCFCE] pt-[33px] pb-[23px] -mx-5 px-5">
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-[#FCC01C] border border-solid border-[#FCC01C] px-7 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#E6AC19] transition-colors"
            >
              <span className="text-white text-base font-bold leading-6">
                Save changes
              </span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default MealPrepForm;
