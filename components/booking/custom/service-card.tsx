import * as React from "react";

interface ServiceCardProps {
  imageSrc: string;
  title: string;
}

export const ServiceCard = ({
  imageSrc,
  title,
}: ServiceCardProps) => {
  return (
    <div className="w-full max-w-[188px] md:max-w-[282px] h-[159px] md:h-[239px] relative">
      <div className="flex relative flex-col rounded-md w-full h-full">
        <img
          src={imageSrc}
          className="object-cover absolute inset-0 w-full h-full rounded-md"
          alt={title}
          loading="lazy"
        />
      </div>
    </div>
  );
};
