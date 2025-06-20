import React from "react";

interface ChefProfileCardProps {
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  cuisines: number;
  capacity: string;
}

export const ChefProfileCard: React.FC<ChefProfileCardProps> = ({
  name,
  image,
  location,
  rating,
  reviewCount,
  cuisines,
  capacity,
}) => {
  return (
    <article className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] bg-white mt-[34px] pl-[15px] pr-20 py-3 rounded-lg border-solid max-md:max-w-full max-md:pr-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[37%] max-md:w-full max-md:ml-0">
          <img
            src={image}
            alt={`Chef ${name}`}
            className="aspect-[1.22] object-contain w-[142px] shrink-0 max-w-full grow max-md:mt-[29px]"
          />
        </div>
        <div className="w-[63%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col self-stretch items-stretch my-auto max-md:mt-10">
            <h3 className="text-[#323335] text-base font-semibold">
              Large Event with {name}
            </h3>
            <div className="flex flex-col items-stretch mt-3">
              <div className="flex items-center gap-2 text-sm text-[#6F6E6D]">
                <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6d44170e821be06bd777d5933624d043811ccd9d?placeholderIfAbsent=true"
                    alt="Location icon"
                    className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto rounded-lg"
                  />
                  <span className="text-[#6F6E6D] self-stretch my-auto">
                    {location}
                  </span>
                </div>
                <div className="self-stretch flex gap-1 my-auto">
                  <div className="flex items-center gap-1 font-normal whitespace-nowrap leading-none">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/78ada4168e8a95c10d1f74cc8d0324d1daa89ff6?placeholderIfAbsent=true"
                      alt="Rating star"
                      className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto rounded-lg"
                    />
                    <span className="text-[#6F6E6D] self-stretch my-auto">
                      {rating}
                    </span>
                  </div>
                  <span className="text-[#6F6E6D] font-light">
                    ({reviewCount} Reviews)
                  </span>
                </div>
              </div>
              <div className="flex gap-3 text-xs text-[#323335] font-normal mt-2">
                <div className="flex items-center gap-1">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/0ef41ea22017b29130a5a643357f525778ad329a?placeholderIfAbsent=true"
                    alt="Cuisines icon"
                    className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                  />
                  <span className="self-stretch my-auto">
                    {cuisines} Cuisines
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/5c4cacdfe6acd0b6e0c79d9d71353217acd21ab8?placeholderIfAbsent=true"
                    alt="Capacity icon"
                    className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                  />
                  <span className="self-stretch my-auto">{capacity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
