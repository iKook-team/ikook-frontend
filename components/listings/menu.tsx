"use client";

import { useRouter } from "next/navigation";
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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/booking/menus/details/${_id}`);
  };

  const handleBadgeClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    badgeId: string,
  ) => {
    e.stopPropagation(); // Prevent card click when clicking on badge
    _onBadgeClick?.(badgeId);
  };

  return (
    <div 
      className="relative w-full max-w-lg h-80"
      onClick={handleCardClick}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Card
        className="w-full h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        shadow="sm"
      >
        <CardBody
          className="overflow-visible p-0 relative h-48"
          style={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <FaRegHeart className="absolute top-2 right-2 text-white text-xl" />
          <span className="absolute top-2 left-2 bg-white rounded-full px-4 py-1 text-xs">
            {location}
          </span>
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-1.5 px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <span className="text-base font-semibold text-gray-900">{price}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <FaStar className="text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-900">
                {rating}
              </span>
            </div>
            <span className="text-xs text-gray-500">({reviewCount} Reviews)</span>
          </div>
        </CardFooter>
        {/* Divider and badges section */}
        <div className="px-4 pb-3">
          <div className="h-px w-full bg-gray-200 mb-2" />
          <div className="flex gap-1">
            {badges.map((badge) => (
              <Badge
                key={badge.id}
                icon={badge.icon}
                label={badge.label}
                onClick={(e) => handleBadgeClick(e, badge.id)}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
