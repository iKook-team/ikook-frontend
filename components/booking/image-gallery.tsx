import React, { useState } from "react";
import Image from "next/image";
import { LayoutGrid } from "lucide-react";

import { ImageSliderModal } from "./image-slider-modal";

interface ImageGalleryProps {
  images: Array<{ id: number; image: string }>;
}

const renderImageOrPlaceholder = (
  src?: string,
  alt?: string,
  className = "",
) => {
  if (src) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={src}
          className="object-cover rounded-[15px]"
          alt={alt || "Menu image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full rounded-[15px] bg-gray-200 flex items-center justify-center ${className}`}
    />
  );
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Always render 5 slots
  const galleryImages =
    images && images.length > 0 ? images.map((img) => img.image) : [];

  // Pad to 5 slots
  while (galleryImages.length < 5) galleryImages.push("");

  const handleViewAllImages = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="flex gap-4 mt-[26px] w-full max-w-full">
        {/* Main image on the left */}
        <div className="w-[610px] min-w-[610px] h-[384px]">
          {renderImageOrPlaceholder(galleryImages[0], "Main dish")}
        </div>

        {/* Two columns of images on the right */}
        <div className="flex gap-2">
          {/* Left column */}
          <div className="flex flex-col gap-2 w-[245px] h-[384px]">
            <div className="h-[191px]">
              {renderImageOrPlaceholder(galleryImages[1], "Dish view 1")}
            </div>
            <div className="h-[191px]">
              {renderImageOrPlaceholder(galleryImages[2], "Dish view 2")}
            </div>
          </div>

          {/* Right column */}
          <div className="relative w-[245px] h-[384px]">
            <div className="h-[191px] mb-2">
              {renderImageOrPlaceholder(galleryImages[3], "Dish view 3")}
            </div>
            <div className="relative">
              <div className="h-[191px]">
                {renderImageOrPlaceholder(galleryImages[4], "Dish view 4")}
              </div>
              <button
                onClick={handleViewAllImages}
                className="absolute right-3 bottom-3 flex items-center gap-1.5 bg-white bg-opacity-90 px-3 py-1.5 rounded-lg hover:bg-opacity-100 transition-all shadow-sm"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-gray-700" />
                <span className="text-xs font-semibold text-gray-700">
                  View all
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <ImageSliderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={galleryImages}
      />
    </>
  );
};
