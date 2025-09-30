"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

import favouritesService from "@/lib/api/favourites";

// Sub-components
const StarRating = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) => (
  <div className="w-[113px] h-[21px] relative">
    <div className="absolute left-0 top-0 inline-flex h-[21px] w-[113px] items-center gap-2">
      <div>
        <svg
          className="star-icon"
          fill="none"
          height="15"
          style={{
            height: "15px",
            position: "relative",
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
      <div className="w-[23px] text-white text-sm font-medium relative">
        {rating}
      </div>
    </div>
    <div className="text-white text-[10px] font-normal relative">
      ({reviewCount} Reviews)
    </div>
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
}

const VerificationBadge = ({
  isVerified = true,
  profileImageUrl,
}: VerificationBadgeProps) => (
  <div className="w-[60px] h-[60px] shrink-0 relative">
    <div className="flex w-full h-full justify-center items-center rounded-full overflow-hidden">
      <Image
        alt="Chef profile"
        className="object-cover w-[60px] h-[60px] rounded-full border-[2.25px] border-solid border-white"
        height={60}
        src={profileImageUrl}
        width={60}
      />
    </div>
    {isVerified && (
      <div>
        <svg
          className="verified-tick"
          fill="none"
          height="16"
          style={{
            flexShrink: 0,
            height: "15px",
            right: "-5px",
            bottom: "-5px",
            position: "absolute",
            width: "15px",
          }}
          viewBox="0 0 15 16"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_6964_1616)">
            <path
              d="M11.5842 2.70185C11.7266 3.0464 12.0001 3.32027 12.3444 3.46325L13.5518 3.96337C13.8964 4.10609 14.1701 4.37985 14.3129 4.72442C14.4556 5.06899 14.4556 5.45615 14.3129 5.80072L13.8131 7.00725C13.6703 7.35197 13.6701 7.73952 13.8135 8.08408L14.3124 9.29025C14.3832 9.46091 14.4196 9.64384 14.4197 9.82859C14.4197 10.0133 14.3833 10.1963 14.3126 10.367C14.2419 10.5376 14.1383 10.6927 14.0076 10.8233C13.877 10.954 13.7219 11.0575 13.5511 11.1282L12.3446 11.628C12.0001 11.7704 11.7262 12.0439 11.5832 12.3882L11.0831 13.5956C10.9404 13.9402 10.6666 14.2139 10.322 14.3567C9.97748 14.4994 9.59032 14.4994 9.24575 14.3567L8.03922 13.8569C7.69464 13.7145 7.30762 13.7148 6.96326 13.8577L5.75586 14.3571C5.41148 14.4995 5.02467 14.4994 4.68037 14.3568C4.33608 14.2142 4.06248 13.9407 3.91965 13.5965L3.41939 12.3888C3.27692 12.0442 3.00347 11.7704 2.65914 11.6274L1.45174 11.1273C1.10732 10.9846 0.833642 10.711 0.690864 10.3666C0.548085 10.0223 0.547891 9.63528 0.690326 9.29077L1.19009 8.08424C1.33246 7.73966 1.33217 7.35264 1.18928 7.00827L0.690234 5.80001C0.61948 5.62935 0.583047 5.44642 0.583018 5.26167C0.582988 5.07693 0.619362 4.89398 0.690062 4.7233C0.760761 4.55261 0.864401 4.39753 0.995058 4.26692C1.12571 4.1363 1.28083 4.03271 1.45153 3.96207L2.65806 3.46231C3.00231 3.31997 3.27601 3.04686 3.4191 2.70293L3.91922 1.49553C4.06194 1.15096 4.3357 0.877201 4.68027 0.734475C5.02484 0.591749 5.412 0.591749 5.75657 0.734475L6.9631 1.23424C7.30768 1.37661 7.6947 1.37632 8.03906 1.23343L9.24696 0.73525C9.59149 0.592604 9.97856 0.592633 10.3231 0.735331C10.6676 0.878029 10.9413 1.15171 11.084 1.49619L11.5843 2.70395L11.5842 2.70185Z"
              fill="#1671D9"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4374 5.57936C10.5376 5.42197 10.5712 5.23122 10.5308 5.04908C10.4903 4.86693 10.3792 4.70831 10.2218 4.60811C10.0644 4.50791 9.87367 4.47433 9.69152 4.51477C9.50938 4.55521 9.35076 4.66635 9.25056 4.82374L6.49712 9.1503L5.23712 7.5753C5.12063 7.42959 4.95103 7.33613 4.76564 7.31548C4.58024 7.29482 4.39423 7.34865 4.24853 7.46514C4.10282 7.58163 4.00936 7.75123 3.9887 7.93662C3.96805 8.12202 4.02188 8.30803 4.13837 8.45374L6.01337 10.7975C6.08325 10.8849 6.173 10.9545 6.27515 11.0002C6.37731 11.046 6.48892 11.0667 6.6007 11.0607C6.71248 11.0546 6.8212 11.022 6.91782 10.9654C7.01444 10.9089 7.09616 10.8301 7.15618 10.7356L10.4374 5.57936Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_6964_1616">
              <rect
                width="15"
                height="15"
                fill="white"
                transform="translate(0 0.0449219)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    )}
  </div>
);

// Main component interface
interface ChefCardProps {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  services: string[];
  mainImageUrl: string;
  profileImageUrl: string;
  isVerified?: boolean;
  is_favourite?: boolean;
}

export const ChefCard: React.FC<ChefCardProps> = ({
  id,
  description,
  isVerified = true,
  location,
  mainImageUrl,
  name,
  profileImageUrl,
  rating,
  reviewCount,
  services,
  is_favourite = false,
}) => {
  const router = useRouter();
  const [liked, setLiked] = React.useState<boolean>(!!is_favourite);
  const [favouriteId, setFavouriteId] = React.useState<number | null>(null);

  return (
    <Link
      href={`/chefs/${id}`}
      className="w-full h-80 block shadow-[0px_4.942px_4.942px_0px_rgba(0,0,0,0.04)] relative bg-white rounded-[15px] border border-[#E7E7E7] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCC01C]"
    >
      {/* Background image */}
      <div
        className="absolute top-0 left-0 right-0 h-[220px] bg-cover bg-center bg-no-repeat rounded-t-[15px]"
        style={{ backgroundImage: "url(/menus/menu6.png)" }}
      />
      {/* Like (heart) icon */}
      <button
        type="button"
        aria-label={liked ? "Unlike" : "Like"}
        aria-pressed={liked}
        disabled={liked}
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          if (liked) {
            // Unliking is disabled for now
            return;
          }
          // Perform like once
          setLiked(true);
          console.debug("[ChefCard] like -> addFavourite", { chefId: id });
          try {
            const newId = await favouritesService.addFavourite({
              chefId: id as unknown as number,
            });

            setFavouriteId(newId ?? null);
          } catch (err) {
            console.debug("[ChefCard] addFavourite failed", err);
            setLiked(false);
          }
        }}
        className="absolute top-2 right-2 z-20 inline-flex items-center justify-center"
      >
        {liked ? (
          <FaHeart className="text-red-500 text-xl drop-shadow" />
        ) : (
          <FaRegHeart className="text-white text-xl drop-shadow" />
        )}
      </button>

      <div className="absolute left-0 top-[225px] w-full px-4 pt-2 z-20">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[#323335] text-base font-bold leading-6">
              {name}
            </h2>
          </div>
          <div className="relative -mt-8 -mr-1">
            <VerificationBadge
              isVerified={isVerified}
              profileImageUrl={profileImageUrl}
            />
          </div>
        </div>
      </div>

      <div className="z-20 relative">
        <LocationBadge location={location} />
      </div>

      <section className="inline-flex flex-col items-start gap-3 absolute w-[287px] h-14 left-[11px] top-[258px] max-md:w-[260px] max-md:left-2.5 max-md:top-[235px] max-sm:w-[235px] max-sm:left-2 max-sm:top-[215px]">
        <p className="w-[287px] text-[#6F6E6D] text-[10px] font-normal relative line-clamp-3">
          {description}
        </p>

        <div
          aria-label="Chef services"
          className="flex items-center gap-[9px] relative max-sm:flex-wrap max-sm:gap-1.5"
          role="list"
        >
          {services.map((service, index) => (
            <div key={index} role="listitem">
              <ServiceBadge serviceName={service} />
            </div>
          ))}
        </div>
      </section>
    </Link>
  );
};
