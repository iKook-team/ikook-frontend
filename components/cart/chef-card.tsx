import Image from "next/image";
import React from "react";

interface ChefCardProps {
  imageUrl: string;
  dishName: string;
  chefName: string;
  location: string;
  locationIconUrl: string;
  rating: string;
  ratingIconUrl: string;
  reviewCount: string;
}

export const ChefCard: React.FC<ChefCardProps> = ({
  imageUrl,
  dishName,
  chefName,
  location,
  locationIconUrl,
  rating,
  ratingIconUrl,
  reviewCount,
}) => {
  return (
    <article className="border border-gray-200 shadow-sm bg-white p-3 sm:p-4 rounded-lg border-solid w-full">
      <div className="gap-3 sm:gap-5 flex flex-col sm:flex-row items-stretch">
        <div className="w-full sm:w-[142px] h-[200px] sm:h-[129px] flex-shrink-0 relative">
          <Image
            alt={dishName}
            className="object-cover w-full h-full rounded-lg"
            fill
            src={imageUrl}
          />
        </div>
        <div className="flex-1 sm:ml-5">
          <div className="flex flex-col items-stretch mt-3 sm:mt-[13px]">
            <h2 className="text-[#323335] text-lg font-semibold leading-loose">
              {dishName}
            </h2>
            <div className="text-[#6F6E6D] mt-[13px]">
              <div className="text-[#6F6E6D] text-base font-medium">
                {chefName}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 text-sm mt-1">
                <div className="flex items-center gap-1 font-normal whitespace-nowrap leading-none">
                  <Image
                    alt="Location"
                    className="object-contain self-stretch shrink-0 my-auto rounded-lg"
                    height={14}
                    src={locationIconUrl}
                    width={15}
                  />
                  <div className="text-[#6F6E6D] self-stretch my-auto">
                    {location}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                    <Image
                      alt="Rating"
                      className="object-contain self-stretch shrink-0 my-auto rounded-lg"
                      height={17}
                      src={ratingIconUrl}
                      width={17}
                    />
                    <div className="text-[#6F6E6D] self-stretch my-auto">
                      {rating}
                    </div>
                  </div>
                  <div className="text-[#6F6E6D] font-light self-stretch my-auto">
                    {reviewCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
