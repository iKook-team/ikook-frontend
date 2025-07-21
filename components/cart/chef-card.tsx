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
    <article className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] bg-white pl-[15px] pr-[76px] py-[13px] rounded-lg border-solid max-md:max-w-full max-md:pr-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[142px] h-[129px] flex-shrink-0 relative max-md:w-full max-md:ml-0">
          <Image
            alt={dishName}
            className="object-cover w-full h-full rounded-lg"
            fill
            src={imageUrl}
          />
        </div>
        <div className="w-[72%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col items-stretch mt-[13px] max-md:mt-10">
            <h2 className="text-[#323335] text-lg font-semibold leading-loose">
              {dishName}
            </h2>
            <div className="text-[#6F6E6D] mt-[13px]">
              <div className="text-[#6F6E6D] text-base font-medium">
                {chefName}
              </div>
              <div className="flex gap-2 text-sm mt-1">
                <div className="flex items-center gap-1 font-normal whitespace-nowrap leading-none">
                  <Image
                    alt="Location"
                    className="object-contain self-stretch shrink-0 my-auto rounded-lg"
                    height={14}
                    src={locationIconUrl}
                    width={15}
                  />
                  <div className="text-[#6F6E6D] self-stretch w-[55px] my-auto">
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
                    <div className="text-[#6F6E6D] self-stretch w-7 my-auto">
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
