import React from "react";

export const EventDetails: React.FC = () => {
  return (
    <div className="flex flex-col items-start self-start mt-7 text-sm leading-none text-black">
      <div className="flex gap-2 items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3f07306ff168cdfbbc1ec048a31ae9cad545073c?placeholderIfAbsent=true"
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          alt="Calendar"
        />
        <span className="self-stretch my-auto">August 16, 2023</span>
      </div>
      <div className="flex gap-2 items-center self-stretch mt-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/1420f97bee27b190a8f78da5d687cc5ea7c2de9a?placeholderIfAbsent=true"
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          alt="Location"
        />
        <span className="self-stretch my-auto">
          67 Queens Road, London, EC03 4AR
        </span>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/70435404a95f8790c51695afdaf73c024aa768ca?placeholderIfAbsent=true"
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          alt="Guests"
        />
        <span className="self-stretch my-auto">10 Adults, 3 Teens, 6 Kids</span>
      </div>
    </div>
  );
};
