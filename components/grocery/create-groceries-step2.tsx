"use client";
import * as React from "react";

import { ProgressStepper } from "../menus/progress-indicator";
import { ImageUploadArea } from "../menus/image-upload-area";
import { UploadedImage } from "../menus/uploaded-image";
import { FormNavigationFooter } from "../menus/form-navigation-footer";
import { showToast } from "@/lib/utils/toast";

interface GroceriesImagesStepProps {
  onBack: () => void;
  onContinue: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

const CreateGroceriesStep2: React.FC<GroceriesImagesStepProps> = ({
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

  React.useEffect(() => {
    updateFormData({ uploadedImages, existingImages });
  }, [uploadedImages, existingImages, updateFormData]);

  const handleBack = () => onBack();
  const handleContinue = () => {
    if (canContinue) onContinue();
  };

  const progressSteps = [
    { id: "details", label: "Details", isCompleted: true },
    { id: "menu-images", label: "Images", isCompleted: true },
    { id: "finish-upload", label: "Finish upload", isCompleted: false },
  ];

  const handleImageSelect = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files);

    setUploadedImages((prev) => {
      const totalExisting = existingImages.length + prev.length;
      const remainingSlots = Math.max(0, 4 - totalExisting);

      if (remainingSlots === 0) {
        showToast.error("You can upload a maximum of 4 images per product.");
        return prev;
      }

      const accepted = incoming.slice(0, remainingSlots);
      const rejectedCount = incoming.length - accepted.length;
      if (rejectedCount > 0) {
        showToast.warning(
          `Only ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"} allowed (max 4).`,
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
  const canContinue = totalImages === 4; // Require exactly 4 images

  return (
    <div className="flex flex-col w-full max-w-[655px] mx-auto">
      <header className="text-xl font-semibold text-black mb-6">Create product</header>

      <div className="bg-white rounded-2xl border border-solid shadow-lg border-neutral-200 p-6 w-full">
        <div className="mb-8">
          <ProgressStepper steps={progressSteps} />
        </div>

        <div className="mt-6 flex flex-col items-center w-full">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Upload product images
          </h2>
          <p className="text-sm text-gray-600 mb-2 text-center">
            Upload exactly 4 high-quality images of this product.
          </p>
          <p className={`text-xs mb-4 text-center ${canContinue ? "text-gray-500" : "text-red-600"}`}>
            {totalImages <= 4 && `${totalImages} / 4 images selected`}
            {totalImages > 4 && `Please remove ${totalImages - 4} image${totalImages - 4 === 1 ? "" : "s"} to continue.`}
          </p>
          <div className="w-full flex justify-center">
            <ImageUploadArea onImageSelect={handleImageSelect} />
          </div>

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

export default CreateGroceriesStep2;
