import * as React from "react";

interface ServiceCardProps {
  imageSrc: string;
  title: string;
  description: string;
  titleAlignment?: "left" | "center";
}

export const ServiceCard = ({
  imageSrc,
  title,
  description,
  titleAlignment = "left",
}: ServiceCardProps) => {
  const titleClass =
    titleAlignment === "center"
      ? "relative self-center text-sm sm:text-base font-semibold text-white drop-shadow-lg line-clamp-1"
      : "relative self-start text-sm sm:text-base font-semibold text-white drop-shadow-lg line-clamp-1";

  return (
    <div className="w-full max-w-[188px] h-[159px] relative">
      <div className="flex relative flex-col px-3 sm:px-4 pt-20 pb-3 rounded-md w-full h-full">
        <img
          src={imageSrc}
          className="object-cover absolute inset-0 w-full h-full rounded-md"
          alt={title}
          loading="lazy"
        />
        <div className="relative z-10 flex flex-col gap-1">
          <h3 className={titleClass}>{title}</h3>
          <p className="text-[10px] sm:text-xs text-center text-white drop-shadow-md line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
