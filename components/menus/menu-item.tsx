"use client";

import { FaStar, FaRegHeart } from "react-icons/fa";
import { Card, CardBody, CardFooter, User } from "@heroui/react";

interface MenuItemProps {
  id: number;
  title: string;
  price: string;
  img: string;
  location: string;
}

export const MenuItem = ({
  id: _id,
  title,
  price,
  img,
  location,
}: MenuItemProps) => {
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
          Grilled Barbeque Dishes
        </span>
        <span className="absolute bottom-2 right-2 text-yellow-400 text-sm font-bold">
          &#163;{price}pp
        </span>
      </CardBody>
      <CardFooter className="justify-between items-center">
        <User
          avatarProps={{
            src: "/chef.png",
          }}
          description={
            <div className="flex gap-1 items-center">
              <FaStar className="text-yellow-400" />
              <span className="text-xs">4.9</span>
              <span className="text-gray-400 text-xs">• {location}</span>
            </div>
          }
          name="Chef John"
        />
        <div className="flex flex-col">
          <div className="flex gap-1 items-center justify-end">
            <FaStar className="text-yellow-400" />
            <span className="text-gray-700">4.6</span>
          </div>
          <div className="text-xs text-gray-700">(23 Reviews)</div>
        </div>
      </CardFooter>
    </Card>
  );
};
