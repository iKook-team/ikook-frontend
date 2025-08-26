"use client";

import { FaStar } from "react-icons/fa";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { getCurrencySymbol } from "@/lib/utils/currency";
import { useAuthStore } from "@/lib/store/auth-store";

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
  id: _id,
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
  const { user } = useAuthStore();
  const currencySymbol = getCurrencySymbol(user as any);
  const avatarSrc =
    avatar ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  const cuisineLabel = (Array.isArray(cuisineTypes) && cuisineTypes[0]) || menuType || title;
  return (
    <Card
      className="w-full max-w-lg h-80 hover:shadow-lg transition-shadow duration-200"
      shadow="sm"
    >
      <CardBody
        className="overflow-visible p-0 relative"
        style={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <span className="absolute top-2 left-2 bg-white rounded-full px-4 py-1 text-xs">
          {cuisineLabel}
        </span>
        <span className="absolute bottom-2 left-2 text-white text-sm font-semibold">
          {title}
        </span>
        <span className="absolute bottom-2 right-2 text-yellow-400 text-sm font-bold">
          {currencySymbol}
          {price}
          pp
        </span>
      </CardBody>
      <CardFooter className="justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={avatarSrc}
            alt={`${chefName || "Chef"} avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-800">{chefName || "Chef"}</span>
            <div className="flex gap-1 items-center">
              <FaStar className="text-yellow-400" />
              <span className="text-xs">{averageRating ?? 0}</span>
              <span className="text-gray-400 text-xs">• {location}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-1 items-center justify-end">
            <FaStar className="text-yellow-400" />
            <span className="text-gray-700">{averageRating ?? 0}</span>
          </div>
          <div className="text-xs text-gray-700">({numReviews ?? 0} Reviews)</div>
        </div>
      </CardFooter>
    </Card>
  );
};
