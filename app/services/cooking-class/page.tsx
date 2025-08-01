"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { servicesService } from "@/lib/api/services";
import { toast } from "sonner";
import { getCurrencySymbol } from "@/lib/utils/currency";
import { TagSelector } from "@/components/ui/tag-selector";

interface FormData {
  startingPrice: string;
  minGuests: string;
  availability: boolean;
  cookingClassAppearance: string;
  cuisines: string[];
}

const CookingClassPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isMounted, setIsMounted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const currencySymbol = getCurrencySymbol({ 
    currency: user?.currency, 
    country: user?.country 
  });

  const [formData, setFormData] = React.useState<FormData>({
    startingPrice: "",
    minGuests: "",
    availability: true,
    cookingClassAppearance: "",
    cuisines: [],
  });

  // Store the current uploadedImage in a ref to use in cleanup
  const uploadedImageRef = React.useRef<string | null>(null);
  
  // Update the ref whenever uploadedImage changes
  React.useEffect(() => {
    uploadedImageRef.current = uploadedImage;
  }, [uploadedImage]);

  React.useEffect(() => {
    console.log('Component mounted');
    setIsMounted(true);
    
    // Cleanup function to revoke object URLs when component unmounts
    return () => {
      console.log('Component unmounting');
      if (uploadedImageRef.current) {
        URL.revokeObjectURL(uploadedImageRef.current);
      }
    };
  }, []); // Empty dependency array since we're using refs

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

  const handleInputChange = (field: keyof FormData, value: string | string[] | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleImageChange called');
    const file = e.target.files?.[0];
    console.log('Selected file:', file);
    
    if (!file) {
      console.log('No file selected');
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      console.log('Not an image file:', file.type);
      toast.error('Please select an image file');
      return;
    }

    // Check file size (1MB max)
    if (file.size > 1024 * 1024) {
      console.log('File too large:', file.size);
      toast.error('File size should not exceed 1MB');
      return;
    }

    try {
      // Create a URL for the file
      const imageUrl = URL.createObjectURL(file);
      console.log('Created image URL:', imageUrl);
      
      // Update state
      setUploadedImage(imageUrl);
      setImageFile(file);
      
      // Log state after update
      console.log('State updated with new image');
    } catch (error) {
      console.error('Error creating object URL:', error);
      toast.error('Error processing the image');
    }
  };

  const handleRemoveImage = () => {
    console.log('Removing image');
    // Revoke the object URL to free up memory
    if (uploadedImageRef.current) {
      URL.revokeObjectURL(uploadedImageRef.current);
      uploadedImageRef.current = null;
    }
    setUploadedImage(null);
    setImageFile(null);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      console.log('File input reset');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid || !imageFile) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await servicesService.createService({
        availability: formData.availability,
        chef_service: 'Cooking Class',
        cover_image: imageFile,
        starting_price_per_person: formData.startingPrice,
        min_num_of_guests: Number(formData.minGuests),
        cuisines: formData.cuisines,
        cooking_class_appearance: formData.cookingClassAppearance
      });
      
      toast.success('Cooking Class service created successfully!');
      router.push('/services');
      
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error('Failed to create service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if all required fields are filled
  const isFormValid = React.useMemo(() => {
    return (
      formData.startingPrice.trim() !== "" &&
      formData.minGuests.trim() !== "" &&
      formData.cuisines.length > 0 &&
      formData.cookingClassAppearance !== ""
    );
  }, [formData]);

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
        Cooking Class
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
          <button
            type="button"
            onClick={() => handleInputChange('availability', !formData.availability)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 ${
              formData.availability ? 'bg-[#FCC01C]' : 'bg-gray-200'
            }`}
            aria-label="Toggle availability"
          >
            <span className={`${formData.availability ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </button>
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
                    {currencySymbol}
                  </span>
                </div>
                <input
                  id="startingPrice"
                  type="number"
                  value={formData.startingPrice}
                  onChange={(e) => handleInputChange("startingPrice", e.target.value)}
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
                value={formData.minGuests}
                onChange={(e) => handleInputChange("minGuests", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-solid border-[#9F9F9E] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white text-[#6F6E6D] text-base font-normal leading-6 focus:outline-none focus:ring-2 focus:ring-[#FCC01C]"
                placeholder="Enter Number"
                required
              />
            </div>

            {/* Cuisines */}
            <div className="space-y-1.5">
              <TagSelector
                label="Cuisines"
                tags={allCuisines}
                selectedTags={formData.cuisines}
                onTagsChange={(cuisines) => handleInputChange("cuisines", cuisines)}
                className="w-full"
              />
            </div>

            {/* Class Type */}
            <div className="space-y-1.5">
              <label className="block text-[#3F3E3D] text-[15px] font-normal mb-2">
                Class Type
              </label>
              <div className="space-y-3">
                {['Physical', 'Virtual'].map((type) => (
                  <div key={type} className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={`appearance-${type.toLowerCase()}`}
                      name="appearance"
                      checked={formData.cookingClassAppearance === type}
                      onChange={() => handleInputChange('cookingClassAppearance', type)}
                      className="h-4 w-4 border-gray-300 text-[#FCC01C] focus:ring-[#FCC01C]"
                    />
                    <label
                      htmlFor={`appearance-${type.toLowerCase()}`}
                      className="text-[#3F3E3D] text-[15px] font-normal"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-8 mb-6">
              {!uploadedImage ? (
                <div className="flex flex-col items-center justify-center gap-2 border-dashed border-2 border-gray-300 rounded-xl p-6">
                  <p className="text-gray-500 text-sm mb-3 text-center">
                    (Recommended 1000px width, 1000px height. Maximum of 1MB file size)
                  </p>
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 bg-white hover:bg-gray-50">
                      <span className="text-gray-700 text-sm">Select cover image</span>
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
            <div className="mt-8">
              <button
                type="submit"
                disabled={!isFormValid || !imageFile || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg text-base font-medium leading-6 text-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-offset-2 ${
                  isFormValid && imageFile && !isSubmitting
                    ? 'bg-[#FCC01C] hover:bg-[#E5AC00] text-[#3F3E3D]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CookingClassPage;
