import React from "react";

export const ImageGallery: React.FC = () => {
  const handleViewAllImages = () => {
    console.log("View all images clicked");
  };

  return (
    <section className="flex gap-4 mt-[26px] w-full max-w-full">
      {/* Main image on the left */}
      <div className="w-[610px] min-w-[610px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6562908c23c2311a45f292088c3c70820c18bbd3?placeholderIfAbsent=true"
          className="w-full h-full object-cover rounded-[15px] aspect-[1.56]"
          alt="Main dish"
        />
      </div>

      {/* Two columns of images on the right */}
      <div className="flex gap-2">
        {/* Left column */}
        <div className="flex flex-col gap-2 w-[245px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/e87f866a4178ebe9a90f2b338265d486848fb47c?placeholderIfAbsent=true"
            className="w-full h-[191px] object-cover rounded-[15px]"
            alt="Dish view 1"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/e364f206b1ef5b1c397ddc7dedde9055209ea160?placeholderIfAbsent=true"
            className="w-full h-[191px] object-cover rounded-[15px]"
            alt="Dish view 2"
          />
        </div>

        {/* Right column */}
        <div className="relative w-[245px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/de752858dd03efcf695aa68ab83eeb8e29b7f516?placeholderIfAbsent=true"
            className="w-full h-[191px] object-cover rounded-[15px] mb-2"
            alt="Dish view 3"
          />
          <div className="relative">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/d351f8aca22bb00b50e9a3f167246204ef866421?placeholderIfAbsent=true"
              className="w-full h-[191px] object-cover rounded-[15px]"
              alt="Dish view 4"
            />
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
