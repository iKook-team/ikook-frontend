import React from "react";

interface HeroSectionProps {
  menu: any;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ menu }) => {
  const handleShare = () => {};
  const handleSave = () => {};

  return (
    <section className="flex flex-wrap mt-[47px] max-md:max-w-full max-md:mt-10 items-start justify-between w-full">
      <div className="flex min-w-60 flex-col items-stretch max-md:max-w-full">
        <h1 className="text-[#323335] text-[26px] font-semibold leading-none max-md:max-w-full">
          {menu.name}
        </h1>
        <div className="flex items-center gap-1.5 text-sm text-[#3F3E3D] font-normal leading-none mt-2">
          {menu.courses && (
            <span className="text-[#3F3E3D] self-stretch my-auto">
              {menu.courses.length} courses included
            </span>
          )}
          {menu.cuisine_types && menu.cuisine_types.length > 0 && (
            <span className="text-[#3F3E3D] self-stretch my-auto">
              {menu.cuisine_types.join(", ")}
            </span>
          )}
          {menu.menu_type && (
            <span className="text-[#FCC01C] self-stretch my-auto">
              {menu.menu_type}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-[18px] text-sm text-black font-normal whitespace-nowrap leading-none ml-auto">
        <div className="w-[88px]">
          <button
            onClick={handleShare}
            className="flex w-full flex-col items-stretch justify-center bg-[#FDEEC5] px-[9px] py-2.5 rounded-[15px]"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/5140aa6a1af49fe83e1e26c2b0d0abeee47f4d89?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Share"
              />
              <span className="self-stretch my-auto">Share</span>
            </div>
          </button>
        </div>
        <div className="w-[85px]">
          <button
            onClick={handleSave}
            className="flex w-full flex-col items-stretch justify-center bg-[#FDEEC5] px-[9px] py-2.5 rounded-[15px]"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/12775fdcf008014931bc552d3a5fc0f1ad0f64ae?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Save"
              />
              <span className="self-stretch my-auto">Save</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
