"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { TagSelector } from "@/components/ui/tag-selector";
import { getCurrencySymbol } from "@/lib/utils/currency";
import { useAuthStore } from "@/lib/store/auth-store";
import { servicesService } from "@/lib/api/services";

interface FormData {
  startingPrice: string;
  minGuests: string;
  cuisines: string[];
  events: string[];
  deliveryHours: string;
}

const GourmetDeliveryForm: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isMounted, setIsMounted] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const currencySymbol = getCurrencySymbol({
    currency: user?.currency,
    country: user?.country,
  });
  const [formData, setFormData] = React.useState<FormData>({
    startingPrice: "",
    minGuests: "",
    cuisines: [],
    events: [],
    deliveryHours: "",
  });

  // Check if all required fields are filled
  const isFormValid = React.useMemo(() => {
    return (
      formData.startingPrice.trim() !== "" &&
      formData.minGuests.trim() !== "" &&
      formData.cuisines.length > 0 &&
      formData.events.length > 0 &&
      formData.deliveryHours.trim() !== ""
    );
  }, [formData]);

  React.useEffect(() => {
    setIsMounted(true);
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
  const allEvents = ["Wedding", "Naming", "Gathering"];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        field === "cuisines" || field === "events"
          ? Array.isArray(value)
            ? value
            : [value]
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => setUploadedImage(e.target?.result as string);
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid || !imageFile) return;

    try {
      setIsSubmitting(true);

      // Create FormData for file upload
      const formDataToSend = new FormData();

      formDataToSend.append("cover_image", imageFile);
      formDataToSend.append("chef_service", "Meal Delivery");
      formDataToSend.append("availability", String(isAvailable));
      formDataToSend.append(
        "starting_price_per_person",
        formData.startingPrice,
      );
      formDataToSend.append("min_num_of_guests", formData.minGuests);
      formDataToSend.append("delivery_hours", formData.deliveryHours);

      // Add cuisines and events as comma-separated strings
      formDataToSend.append("cuisines", formData.cuisines.join(","));
      formDataToSend.append("events", formData.events.join(","));

      // Call the API
      const response = await servicesService.createService({
        availability: isAvailable,
        chef_service: "Meal Delivery",
        cover_image: imageFile,
        starting_price_per_person: formData.startingPrice,
        min_num_of_guests: Number(formData.minGuests),
        delivery_hours: formData.deliveryHours,
        cuisines: formData.cuisines,
        events: formData.events,
      });

      // Show success message
      toast.success("Meal Delivery service created successfully!");

      // Redirect to services page
      router.push("/services");
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                isAvailable ? "bg-[#FCC01C]" : "bg-gray-200"
              }`}
              aria-label="Toggle availability"
            >
              <span
                className={`${isAvailable ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-5 pb-5">
          <div className="space-y-6">
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
                      {currencySymbol}
                    </span>
                  </div>
                  <input
                    type="number"
                    id="startingPrice"
                    value={formData.startingPrice}
                    onChange={(e) =>
                      handleInputChange("startingPrice", e.target.value)
                    }
                    className="flex-1 px-3.5 py-2.5 border-l border-solid border-[#CFCFCE] rounded-r-lg text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
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
                  onChange={(e) =>
                    handleInputChange("minGuests", e.target.value)
                  }
                  className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-sm bg-white text-[#6F6E6D] text-base focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                  placeholder="Enter Number"
                  min="0"
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
                <label
                  htmlFor="deliveryHours"
                  className="block text-[#3F3E3D] text-[15px] font-normal"
                >
                  Delivery hours
                </label>
                <input
                  type="number"
                  id="deliveryHours"
                  value={formData.deliveryHours}
                  onChange={(e) =>
                    handleInputChange("deliveryHours", e.target.value)
                  }
                  className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-sm bg-white text-[#6F6E6D] text-base focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-8 mb-6">
              {!uploadedImage ? (
                <div className="flex flex-col items-center justify-center gap-2 border-dashed border-2 border-gray-300 rounded-xl p-6">
                  <p className="text-gray-500 text-sm mb-3 text-center">
                    (Recommended 1000px width, 1000px height. Maximum of 1MB
                    file size)
                  </p>
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 bg-white hover:bg-gray-50">
                      <span className="text-gray-700 text-sm">
                        Select cover image
                      </span>
                    </div>
                    <input
                      id="imageUpload"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded cover"
                    className="w-full h-64 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors"
                    aria-label="Remove image"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={!isFormValid || !imageFile || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg text-base font-medium leading-6 text-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 ${
                  isFormValid && imageFile && !isSubmitting
                    ? "bg-[#FCC01C] hover:bg-[#E5AC00] text-[#3F3E3D]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default GourmetDeliveryForm;
