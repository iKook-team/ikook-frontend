"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Toggle } from "@/components/ui/toggle";
import { TagSelector } from "@/components/ui/tag-selector";
import { servicesService } from "@/lib/api/services";
import { useAuthStore } from "@/lib/store/auth-store";
import { getCurrencySymbol } from "@/lib/utils/currency";

interface FormData {
  startingPrice: string;
  minGuests: string;
  cuisines: string[];
  pricePerHour: string;
  services: string[];
}

const EatingCoachForm: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    startingPrice: "",
    minGuests: "",
    cuisines: [],
    pricePerHour: "",
    services: [],
  });

  const [availability, setAvailability] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  const allServices = ["Meal Planning", "Nutrition", "Weight Loss"];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();

      reader.onload = (e) => setUploadedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isFormValid = React.useMemo(() => {
    return (
      formData.startingPrice.trim() !== "" &&
      formData.minGuests.trim() !== "" &&
      formData.cuisines.length > 0 &&
      formData.pricePerHour.trim() !== "" &&
      formData.services.length > 0 &&
      imageFile !== null
    );
  }, [formData, imageFile]);

  const handleInputChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceData = {
        availability: true,
        chef_service: "Eating Coach" as const,
        starting_price_per_person: formData.startingPrice || "0.00",
        min_num_of_guests: Number(formData.minGuests) || 0,
        cuisines: formData.cuisines,
        price_per_hour: formData.pricePerHour || "0.00",
        services: formData.services,
        ...(imageFile && { cover_image: imageFile }),
      };

      await servicesService.createService(serviceData);
      toast.success("Healthy Eating Coach service created successfully!");
      router.push("/services");
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full max-w-[655px] mx-auto px-4 py-8 max-md:px-5">
      <h1 className="text-black text-2xl font-bold leading-8 mb-[53px] max-sm:text-xl max-sm:leading-7">
        Healthy Eating Coach
      </h1>

      <section className="bg-white rounded-[15px] border border-solid border-[#E7E7E7] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="flex items-center justify-between px-[17px] py-11 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
          <label
            htmlFor="availability"
            className="text-[#020101] text-[15px] font-normal"
          >
            Availability
          </label>
          <Toggle
            checked={availability}
            onChange={setAvailability}
            className={`${availability ? "bg-[#FCC01C] border-[#FCC01C]" : "bg-gray-200"}`}
          />
        </div>

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
                    {getCurrencySymbol({
                      currency: user?.currency,
                      country: user?.country,
                    })}
                  </span>
                </div>
                <div className="flex-1 flex">
                  <input
                    id="startingPrice"
                    type="number"
                    value={formData.startingPrice}
                    onChange={(e) =>
                      handleInputChange("startingPrice", e.target.value)
                    }
                    className="w-full px-3.5 py-2.5 text-[#3F3E3D] text-[15px] font-normal bg-transparent border-0 focus:ring-0 focus:outline-none"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
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
                value={formData.minGuests}
                onChange={(e) => handleInputChange("minGuests", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                placeholder="Enter Number"
              />
            </div>

            {/* Cuisines */}
            <div className="space-y-1.5">
              <TagSelector
                label="Cuisines"
                tags={allCuisines}
                selectedTags={formData.cuisines}
                onTagsChange={(items) => handleInputChange("cuisines", items)}
                className="w-full"
              />
            </div>

            {/* Price Per Hour */}
            <div className="space-y-1.5">
              <label
                htmlFor="pricePerHour"
                className="block text-[#3F3E3D] text-[15px] font-normal"
              >
                Price per hour
              </label>
              <div className="flex border border-solid border-[#CFCFCE] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white">
                <div className="flex items-center px-3.5 py-2.5 bg-white rounded-l-lg">
                  <span className="text-[#3F3E3D] text-[15px] font-normal">
                    {getCurrencySymbol({
                      currency: user?.currency,
                      country: user?.country,
                    })}
                  </span>
                </div>
                <div className="flex-1 flex">
                  <input
                    id="pricePerHour"
                    type="number"
                    value={formData.pricePerHour}
                    onChange={(e) =>
                      handleInputChange("pricePerHour", e.target.value)
                    }
                    className="w-full px-3.5 py-2.5 text-[#3F3E3D] text-[15px] font-normal bg-transparent border-0 focus:ring-0 focus:outline-none"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-1.5">
              <TagSelector
                label="Services"
                tags={allServices}
                selectedTags={formData.services}
                onTagsChange={(items) => handleInputChange("services", items)}
                className="w-full"
              />
            </div>
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
                    ref={fileInputRef}
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
                      d="M12 4L4 12M4 4L12 12"
                      stroke="#B8251B"
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
          <div className="border-t border-solid border-[#CFCFCE] pt-[33px] pb-[23px] -mx-5 px-5">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full flex justify-center items-center gap-2 border border-solid px-7 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors ${
                isFormValid && !isSubmitting
                  ? "bg-[#FCC01C] border-[#FCC01C] hover:bg-[#E6AC19] cursor-pointer"
                  : "bg-gray-200 border-gray-300 cursor-not-allowed"
              }`}
            >
              <span className="text-white text-base font-bold leading-6">
                {isSubmitting ? "Creating..." : "Save changes"}
              </span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EatingCoachForm;
