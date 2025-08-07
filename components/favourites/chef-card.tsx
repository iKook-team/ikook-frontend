"use client";

import React from "react";
import Image from "next/image";

// Sub-components
const StarRating = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) => (
  <div className="flex items-center gap-1">
    <div className="flex items-center">
      <div>
        <svg
          className="star-icon"
          fill="none"
          height="15"
          style={{
            height: "15px",
            width: "15px",
          }}
          viewBox="0 0 15 14"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2896 5.41185L8.8536 4.92694L7.3176 1.90317C7.27565 1.82038 7.20663 1.75336 7.12137 1.71262C6.90755 1.61012 6.64771 1.69554 6.5408 1.90317L5.0048 4.92694L1.56876 5.41185C1.47402 5.42499 1.38741 5.46835 1.3211 5.53406C1.24093 5.61407 1.19676 5.72172 1.19828 5.83334C1.1998 5.94496 1.2469 6.05143 1.32922 6.12935L3.81524 8.48293L3.22791 11.8063C3.21414 11.8836 3.22295 11.9631 3.25334 12.0358C3.28373 12.1085 3.3345 12.1715 3.39987 12.2176C3.46525 12.2637 3.54262 12.2911 3.62321 12.2967C3.7038 12.3023 3.78439 12.2858 3.85584 12.2492L6.9292 10.6801L10.0026 12.2492C10.0865 12.2925 10.1839 12.307 10.2773 12.2912C10.5128 12.2518 10.6711 12.035 10.6305 11.8063L10.0432 8.48293L12.5292 6.12935C12.5968 6.06496 12.6415 5.98086 12.655 5.88887C12.6916 5.6589 12.5265 5.44601 12.2896 5.41185Z"
            fill="#FCC01C"
          />
        </svg>
      </div>
      <span className="text-white text-sm font-medium ml-1">
        {rating}
      </span>
    </div>
    <span className="text-white text-[10px] font-normal">
      ({reviewCount} Reviews)
    </span>
  </div>
);

interface ServiceBadgeProps {
  serviceName: string;
}

const ServiceBadge = ({ serviceName }: ServiceBadgeProps) => (
  <div className="flex items-center gap-[5px] relative max-sm:mb-0.5">
    <div>
      <svg
        className="service-icon"
        fill="none"
        height="8"
        style={{
          height: "8px",
          position: "relative",
          width: "8px",
        }}
        viewBox="0 0 8 8"
        width="8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.99967 2.66666L3.71306 3.9631C3.66425 4.01229 3.5851 4.01229 3.53629 3.9631L2.99967 3.42239M1.99967 0.666656H5.99967C6.36786 0.666656 6.66634 0.965133 6.66634 1.33332V6.25463C6.66634 6.75022 6.1448 7.07255 5.70153 6.85092L5.63115 6.81573C5.44346 6.72189 5.22255 6.72189 5.03487 6.81573L4.29782 7.18425C4.11013 7.27809 3.88922 7.27809 3.70153 7.18425L2.96448 6.81573C2.7768 6.72189 2.55588 6.72189 2.3682 6.81573L2.29782 6.85092C1.85455 7.07255 1.33301 6.75022 1.33301 6.25463V1.33332C1.33301 0.965134 1.63148 0.666656 1.99967 0.666656Z"
          stroke="#FCC01C"
          strokeLinecap="round"
        />
      </svg>
    </div>
    <div className="text-[#060605] text-[8px] font-medium relative">
      {serviceName}
    </div>
  </div>
);

interface LocationBadgeProps {
  location: string;
}

const LocationBadge = ({ location }: LocationBadgeProps) => (
  <div className="flex w-[76px] justify-center items-center gap-2.5 absolute h-[23px] bg-white px-[13px] py-1 rounded-[30px] left-[13px] top-4 max-md:left-3 max-md:top-3.5 max-sm:left-2.5 max-sm:top-3">
    <div className="w-[53px] h-[15px] shrink-0 text-[#323335] text-center text-[10px] font-normal relative">
      {location}
    </div>
  </div>
);

interface VerificationBadgeProps {
  isVerified?: boolean;
  profileImageUrl: string;
  className?: string;
}

const VerificationBadge = ({
  isVerified = true,
  profileImageUrl,
  className = ""
}: VerificationBadgeProps) => (
  <div className={`w-[60px] h-[60px] shrink-0 ${className}`}>
    <div className="flex w-[60px] h-[60px] justify-center items-center shrink-0 absolute left-0 top-0">
      <Image
        alt="Chef profile"
        src={profileImageUrl}
        width={60}
        height={60}
        className="rounded-full object-cover w-full h-full"
      />
      {isVerified && (
        <div className="w-[18px] h-[18px] absolute -right-1 -bottom-1">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="9" r="9" fill="#FCC01C" />
            <path
              d="M5 9.5L8 12.5L13 6.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  </div>
);

export interface ChefCardProps {
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  services: string[];
  mainImageUrl: string;
  profileImageUrl: string;
  isVerified?: boolean;
}

export const ChefCard: React.FC<ChefCardProps> = ({
  description,
  isVerified = true,
  location,
  mainImageUrl,
  name,
  profileImageUrl,
  rating,
  reviewCount,
  services,
}) => {
  return (
    <article className="flex flex-col w-[340px] h-[331px] rounded-[15px] overflow-hidden shadow-[0px_4.942px_4.942px_0px_rgba(0,0,0,0.04)] bg-white border border-solid border-[#E7E7E7] max-md:w-[310px] max-md:h-[300px] max-sm:w-[280px] max-sm:h-[280px] min-w-60 grow shrink">
      {/* Header with background image */}
      <div className="relative h-[220px] w-full flex-shrink-0">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mainImageUrl})` }}
        />
        
        {/* Location badge */}
        <div className="absolute top-0 left-0 z-10">
          <LocationBadge location={location} />
        </div>
        
        {/* Chef info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-white text-base font-semibold leading-6">
                {name}
              </h2>
              <StarRating rating={rating} reviewCount={reviewCount} />
            </div>
            <div className="relative -mb-8">
              <VerificationBadge 
                isVerified={isVerified} 
                profileImageUrl={profileImageUrl} 
                className="relative"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex-1 p-4 flex flex-col gap-3 w-full mt-2">
        <p className="text-[#6F6E6D] text-[10px] font-normal line-clamp-3">
          {description}
        </p>
        
        <div 
          aria-label="Chef services"
          className="flex flex-wrap gap-2 mt-auto"
          role="list"
        >
          {services.map((service, index) => (
            <div key={index} role="listitem">
              <ServiceBadge serviceName={service} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
