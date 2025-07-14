import React from "react";

interface ImageGalleryProps {
  images: Array<{ id: number; image: string }>;
}

const renderImageOrPlaceholder = (src?: string, alt?: string, className = "") => {
  if (src) {
    return (
      <img
        src={src}
        className={`w-full h-full object-cover rounded-[15px] ${className}`}
        alt={alt || "Menu image"}
      />
    );
  }
  return <div className={`w-full h-full rounded-[15px] bg-gray-200 flex items-center justify-center ${className}`} />;
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  // Always render 5 slots
  const galleryImages = images && images.length > 0 ? images.map(img => img.image) : [];
  // Pad to 5 slots
  while (galleryImages.length < 5) galleryImages.push("");

  const handleViewAllImages = () => {};

  return (
    <section className="flex gap-4 mt-[26px] w-full max-w-full">
      {/* Main image on the left */}
      <div className="w-[610px] min-w-[610px]">
        {renderImageOrPlaceholder(galleryImages[0], "Main dish")}
      </div>

      {/* Two columns of images on the right */}
      <div className="flex gap-2">
        {/* Left column */}
        <div className="flex flex-col gap-2 w-[245px]">
          {renderImageOrPlaceholder(galleryImages[1], "Dish view 1")}
          {renderImageOrPlaceholder(galleryImages[2], "Dish view 2")}
        </div>

        {/* Right column */}
        <div className="relative w-[245px]">
          {renderImageOrPlaceholder(galleryImages[3], "Dish view 3", "h-[191px] mb-2")}
          <div className="relative">
            {renderImageOrPlaceholder(galleryImages[4], "Dish view 4", "h-[191px]")}
            <button
              onClick={handleViewAllImages}
              className="absolute right-3 bottom-3 flex items-center gap-1 bg-white bg-opacity-90 px-3 py-1.5 rounded-lg"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f9f1f517600e038bbd31d487d993b6593ae0ef2?placeholderIfAbsent=true"
                className="w-3.5 h-3.5"
                alt="View all"
              />
              <span className="text-xs font-medium">View all</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
