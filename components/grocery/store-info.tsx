"use client";
import * as React from "react";

interface StoreInfoProps {
  storeName: string;
  location: string;
  deliveryType: string;
  rating: number;
  reviewCount: number;
  onSearch?: (query: string) => void;
}

export const StoreInfo: React.FC<StoreInfoProps> = ({
  storeName,
  location,
  deliveryType,
  rating,
  reviewCount,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <section className="self-center flex w-full max-w-[1115px] flex-col mt-11 max-md:max-w-full max-md:mt-10">
      <div className="self-stretch flex w-full items-stretch gap-5 flex-wrap justify-between max-md:max-w-full">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/784c770d5befe733173ac931245013c6e455c570?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[70px] shadow-[0px_4px_9px_rgba(0,0,0,0.1)] self-stretch shrink-0 my-auto rounded-[88px]"
            alt={`${storeName} logo`}
          />
          <div className="self-stretch min-w-60 my-auto">
            <h1 className="text-[#030302] text-lg font-semibold leading-loose">
              {storeName}
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-[#030302] text-sm font-normal leading-6 self-stretch my-auto">
                {location}
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/46f57abdd309041120e0e99c319fd9d3358c2c60?placeholderIfAbsent=true"
                className="aspect-[0.06] object-contain w-px stroke-[1px] stroke-[#B7B7B6] self-stretch shrink-0 my-auto"
                alt=""
              />
              <div className="text-black text-sm font-normal self-stretch my-auto">
                {deliveryType}
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/46f57abdd309041120e0e99c319fd9d3358c2c60?placeholderIfAbsent=true"
                className="aspect-[0.06] object-contain w-px stroke-[1px] stroke-[#B7B7B6] self-stretch shrink-0 my-auto"
                alt=""
              />
              <div className="self-stretch text-[#323335] w-[113px] my-auto">
                <div className="flex items-center gap-2">
                  <div className="self-stretch flex items-center gap-1 text-sm font-medium whitespace-nowrap my-auto">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c337edc70e543b8815897d06fb4e87b8fdf2906b?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                      alt="Star rating"
                    />
                    <span className="text-[#323335] self-stretch w-[23px] my-auto">
                      {rating}
                    </span>
                  </div>
                  <div className="text-[#323335] text-[10px] font-normal self-stretch my-auto">
                    ({reviewCount} Reviews)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[15px] text-[#3F3E3D] font-normal whitespace-nowrap my-auto">
          <form onSubmit={handleSearch} className="w-full">
            <div className="w-full">
              <div className="w-full">
                <div className="items-center border border-[color:var(--Gray-100,#CFCFCE)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden bg-white px-3.5 py-2.5 rounded-lg border-solid">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="text-[#3F3E3D] self-stretch flex-1 shrink basis-[0%] min-w-60 gap-2 my-auto bg-transparent border-none outline-none"
                  />
                  <button type="submit">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/14e166372f295292f57972e6258fba14c7e81b6d?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                      alt="Search"
                    />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
