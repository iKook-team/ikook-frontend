"use client";
import * as React from "react";

import { ProgressStepper } from "./progress-indicator";
import { ImageUploadArea } from "./image-upload-area";
import { UploadedImage } from "./uploaded-image";
import { FormNavigationFooter } from "./form-navigation-footer";

import { showToast } from "@/lib/utils/toast";

interface MenuImagesStepProps {
  onBack: () => void;
  onContinue: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export const CreateMenuStep3: React.FC<MenuImagesStepProps> = ({
  onBack,
  onContinue,
  formData,
  updateFormData,
}) => {
  const [uploadedImages, setUploadedImages] = React.useState<File[]>(
    formData.uploadedImages || [],
  );
  const [existingImages, setExistingImages] = React.useState<any[]>(
    formData.existingImages || [],
  );

  // Sync local state with parent form data
  React.useEffect(() => {
    updateFormData({ uploadedImages, existingImages });
  }, [uploadedImages, existingImages, updateFormData]);

  const handleBack = () => {
    onBack();
  };

  const handleContinue = () => {
    if (canContinue) {
      onContinue();
    }
  };

  const progressSteps = [
    { id: "details", label: "Details", isCompleted: true },
    { id: "menu-prices", label: "Menu & prices", isCompleted: true },
    { id: "menu-images", label: "Menu images", isCompleted: true },
    { id: "finish-upload", label: "Finish upload", isCompleted: false },
  ];

  const handleImageSelect = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files);

    setUploadedImages((prev) => {
      const totalExisting = existingImages.length + prev.length;
      const remainingSlots = Math.max(0, 10 - totalExisting);

      if (remainingSlots === 0) {
        showToast.error("You can upload a maximum of 10 images per menu.");

        return prev;
      }

      const accepted = incoming.slice(0, remainingSlots);
      const rejectedCount = incoming.length - accepted.length;

      if (rejectedCount > 0) {
        showToast.warning(
          `Only ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"} allowed (max 10).`,
        );
      }

      return [...prev, ...accepted];
    });
  };

  const handleDeleteImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const totalImages = uploadedImages.length + existingImages.length;
  const meetsMin = totalImages >= 5;
  const withinMax = totalImages <= 10;
  const canContinue = meetsMin && withinMax;

  return (
    <div className="flex flex-col w-full max-w-[655px] mx-auto">
      <header className="text-xl font-semibold text-black mb-6">
        Create menu
      </header>

      <div className="bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 p-6 w-full">
        <div className="mb-8">
          <ProgressStepper steps={progressSteps} />
        </div>

        <div className="mt-6 flex flex-col items-center w-full">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Upload menu images
          </h2>
          <p className="text-sm text-gray-600 mb-2 text-center">
            Upload 5–10 high-quality images of your menu items.
          </p>
          <p
            className={`text-xs mb-4 text-center ${canContinue ? "text-gray-500" : "text-red-600"}`}
          >
            {totalImages < 5 &&
              `You have ${totalImages}. Please upload at least ${5 - totalImages} more image${5 - totalImages === 1 ? "" : "s"}.`}
            {totalImages > 10 &&
              `You have ${totalImages}. Please remove ${totalImages - 10} image${totalImages - 10 === 1 ? "" : "s"} to continue.`}
            {totalImages >= 5 &&
              totalImages <= 10 &&
              `${totalImages} / 10 images selected`}
          </p>
          <div className="w-full flex justify-center">
            <ImageUploadArea onImageSelect={handleImageSelect} />
          </div>

          {/* Display existing images */}
          {existingImages.length > 0 && (
            <div className="mt-6 w-full flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                Current images ({existingImages.length})
              </h3>
              <div className="grid grid-cols-1 gap-4 justify-items-center">
                {existingImages.map((image, index) => (
                  <UploadedImage
                    key={`existing-${index}`}
                    imageUrl={image.image || image.url}
                    onDelete={() => handleDeleteExistingImage(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Display newly uploaded images */}
          {uploadedImages.length > 0 && (
            <div className="mt-6 w-full flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                New images ({uploadedImages.length})
              </h3>
              <div className="grid grid-cols-1 gap-4 justify-items-center">
                {uploadedImages.map((file, index) => (
                  <UploadedImage
                    key={`new-${index}`}
                    imageUrl={URL.createObjectURL(file)}
                    onDelete={() => handleDeleteImage(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4e5e0e8d7af4287197a7d5d0575a23c15b68d216?placeholderIfAbsent=true"
          alt=""
          className="object-contain mt-28 w-full aspect-[500] stroke-[1px] stroke-neutral-200 max-md:mt-10 max-md:max-w-full"
        />

        <div className="flex justify-end w-full mt-8">
          <FormNavigationFooter
            onBack={handleBack}
            onContinue={handleContinue}
            disabled={!canContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateMenuStep3;
