import * as React from "react";

interface DishCardProps {
  imageSrc: string;
  title: string;
  chefName: string;
  chefImageSrc: string;
}

export const DishCard: React.FC<DishCardProps> = ({
  imageSrc,
  title,
  chefName,
  chefImageSrc,
}) => {
  return (
    <div className="flex flex-col justify-center px-2.5 py-3 w-full bg-white rounded-md border-solid shadow-2xl border-[0.639px] border-neutral-200 max-md:max-w-full">
      <div className="flex gap-4 items-start">
        <img
          src={imageSrc}
          className="object-contain shrink-0 aspect-[1.12] w-[113px]"
          alt={title}
        />
        <div className="flex flex-col min-w-60 w-[339px]">
          <h3 className="text-lg font-semibold leading-7 text-zinc-800">
            {title}
          </h3>
          <div className="flex gap-2 items-center self-start px-2 py-1 mt-1 text-xs text-black bg-amber-100 rounded-md">
            <img
              src={chefImageSrc}
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              alt={`Chef ${chefName}`}
            />
            <span className="self-stretch my-auto">{chefName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
