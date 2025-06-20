"use client";

import React from "react";

interface Service {
  iconUrl: string;
  name: string;
}

interface IncludedServicesProps {
  services: Service[];
}

export const IncludedServices: React.FC<IncludedServicesProps> = ({
  services,
}) => {
  return (
    <section className="flex w-full flex-col items-stretch text-xs text-[#3F3E3D] font-normal justify-center bg-[#FFFCF5] mt-7 px-5 py-4 rounded-lg max-md:max-w-full">
      <div className="flex gap-[27px] flex-wrap max-md:max-w-full">
        {services.map((service, index) => (
          <div key={index} className="flex items-center gap-3">
            <img
              src={service.iconUrl}
              alt=""
              className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
            />
            <span className="text-[#3F3E3D] self-stretch my-auto">
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
