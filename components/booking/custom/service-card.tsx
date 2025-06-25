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
      ? "relative self-center text-base font-semibold"
      : "relative self-start text-base font-semibold";

  return (
    <div className="w-[188px] h-[159px] relative">
      <div className="flex relative flex-col px-4 pt-24 pb-3 rounded-md w-full h-full max-md:px-5">
        <img
          src={imageSrc}
          className="object-cover absolute inset-0 w-full h-full rounded-md"
          alt={title}
          loading="lazy"
        />
        <div className="relative z-10">
          <h3 className={titleClass}>{title}</h3>
          <p className="text-xs text-center text-white">{description}</p>
        </div>
      </div>
    </div>
  );
};
