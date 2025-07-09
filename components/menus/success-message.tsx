"use client";
import * as React from "react";

interface SuccessMessageProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  iconSrc?: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title = "Menu submitted",
  description = "Your menu has been submitted for review",
  buttonText = "Back to menus",
  onButtonClick,
  iconSrc = "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/fd06ba309f10b258409bf2b93dc1d5b9f30ed5e8?placeholderIfAbsent=true",
}) => {
  return (
    <div className="flex flex-col items-center self-center mt-36 mb-0 max-w-full w-[391px] max-md:mt-10 max-md:mb-2.5">
      <div className="flex flex-col items-center w-full max-w-[391px]">
        <img
          src={iconSrc}
          alt="Success icon"
          className="object-contain max-w-full aspect-square w-[100px]"
        />
        <div className="flex flex-col items-center mt-8 w-full">
          <h2 className="text-2xl font-medium leading-none text-black">
            {title}
          </h2>
          <p className="mt-2 text-base text-center text-neutral-500">
            {description}
          </p>
        </div>
        <div className="flex items-start mt-8 text-base font-semibold text-white rounded-lg">
          <button
            className="flex overflow-hidden gap-2 justify-center items-center px-7 py-3 bg-amber-400 rounded-lg border border-amber-400 border-solid shadow-sm max-md:px-5"
            onClick={onButtonClick}
          >
            <span className="self-stretch my-auto text-white">
              {buttonText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
