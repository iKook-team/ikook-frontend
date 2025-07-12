"use client";

import { FaStar, FaRegHeart } from "react-icons/fa";
import { Card, CardBody, CardFooter, User } from "@heroui/react";
import Image from "next/image";

interface BadgeData {
  id: string;
  icon: string;
  label: string;
}

interface BadgeProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({ icon, label, onClick }) => (
  <button
    aria-label={`Filter by ${label}`}
    className="flex flex-col items-center justify-center rounded-[10px] bg-[#FFF9E8] px-2 transition-colors hover:bg-[#FFF5D6] focus:outline-none focus:ring-2 focus:ring-[#BD9015] focus:ring-opacity-50"
    type="button"
    onClick={onClick}
  >
    <div className="flex items-center justify-center gap-0.5">
      <Image
        alt=""
        aria-hidden
        className="aspect-square object-contain"
        height={12}
        src={icon}
        width={12}
      />
      <span className="text-xs font-medium leading-none tracking-[-0.06px] text-[#BD9015]">
        {label}
      </span>
    </div>
  </button>
);

interface MenuListingProps {
  id: number;
  title: string;
  price: string;
  img: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  badges?: BadgeData[];
  onCardClick?: () => void;
  onBadgeClick?: (badgeId: string) => void;
}

export const MenuListing: React.FC<MenuListingProps> = ({
  badges = [
    {
      icon: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=20&h=20&fit=crop&crop=center",
      id: "cuisines",
      label: "5 Cuisines",
    },
    {
      icon: "https://images.unsplash.com/photo-1509048191080-d2e2678e3449?w=20&h=20&fit=crop&crop=center",
      id: "delivery-time",
      label: "40 min",
    },
    {
      icon: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=20&h=20&fit=crop&crop=center",
      id: "more",
      label: "4 more",
    },
  ],
  id: _id,
  img,
  location,
  onBadgeClick: _onBadgeClick,
  price,
  rating = 4.6,
  reviewCount = 23,
  title,
}) => {
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
        <FaRegHeart className="absolute top-2 right-2 text-white text-xl" />
        <span className="absolute top-2 left-2 bg-white rounded-full px-4 py-1 text-xs">
          {title}
        </span>
        <span className="absolute bottom-2 left-2 text-white text-sm font-semibold">
          Professional Catering Service
        </span>
        <span className="absolute bottom-2 right-2 text-yellow-400 text-sm font-bold">
          £{price}pp
        </span>
      </CardBody>
      <CardFooter className="justify-between items-center">
        <User
          avatarProps={{
            className: "shrink-0",
            classNames: {
              base: "border-2 border-solid border-white",
              img: "object-cover w-10 h-10"
            },
            src: "/chef.png"
          }}
          description={
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-gray-500">{location}</span>
            </div>
          }
          name="Menu Provider"
        />
        <div className="flex flex-col items-end">
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">({reviewCount} Reviews)</span>
        </div>
      </CardFooter>
      {/* Divider and badges section - unique to MenuListing */}
      <div className="px-4 pb-3">
        <div className="h-px w-full bg-gray-200 mb-2" />
        <div className="flex flex-wrap gap-1.5">
          {badges.map((badge) => (
            <Badge
              key={badge.id}
              icon={badge.icon}
              label={badge.label}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
