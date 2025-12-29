"use client";

import { FaStar } from "react-icons/fa";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { useRouter } from "next/navigation";

import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { formatNumber } from "@/lib/format";

interface MenuItemProps {
  id: number;
  title: string;
  price: string;
  img: string;
  location: string;
  avatar?: string | null;
  chefName?: string;
  averageRating?: number | null;
  numReviews?: number | null;
  cuisineTypes?: string[];
  menuType?: string;
}

export const MenuItem = ({
  id,
  title,
  price,
  img,
  location,
  avatar,
  chefName,
  averageRating,
  numReviews,
  cuisineTypes = [],
  menuType,
}: MenuItemProps) => {
  const router = useRouter();
  const { market } = useMarket();
  const currencySymbol = getMarketConfig(market).currencySymbol;
  const avatarSrc =
    avatar ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  const cuisineLabel =
    (Array.isArray(cuisineTypes) && cuisineTypes[0]) || menuType || title;

  return (
    <Card
      className="w-full h-full min-h-[320px] sm:min-h-[360px] hover:shadow-lg transition-shadow duration-200 flex flex-col"
      shadow="sm"
    >
      <CardBody
        className="overflow-visible p-0 relative flex-grow"
        style={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="bg-white/90 backdrop-blur-sm text-zinc-900 rounded-full px-3 py-1 text-xs font-medium">
              {cuisineLabel}
            </span>
            <span className="bg-black/70 text-white rounded-full px-3 py-1 text-sm font-bold">
              {currencySymbol}
              {formatNumber(parseFloat(price), market)}{" "}
              <span className="text-[10px] font-normal"> / person</span>
            </span>
          </div>
          <h3 className="text-white text-lg font-semibold line-clamp-2">
            {title}
          </h3>
        </div>
      </CardBody>
      <CardFooter className="p-3 sm:p-4 bg-white">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={avatarSrc}
              alt={`${chefName || "Chef"} avatar`}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-800 truncate">
                {chefName || "Chef"}
              </p>
              <div className="flex items-center gap-1 text-xs">
                <FaStar className="text-yellow-400 flex-shrink-0" />
                <span className="font-medium">
                  {averageRating?.toFixed(1) ?? "0.0"}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 truncate">
                  {location || "Unknown"}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/menus/edit/${id}`);
            }}
            className="text-xs sm:text-sm bg-amber-400 hover:bg-amber-500 text-white px-3 sm:px-4 py-1.5 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
          >
            Edit Menu
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};
