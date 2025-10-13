"use client";

import React from "react";
import Image from "next/image";
import { FaStar, FaCheck } from "react-icons/fa";
import { Card, CardBody } from "@heroui/react";
import { AddonCardProps } from "@/lib/dummy-addons";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";

export const AddonCard: React.FC<AddonCardProps> = ({
  addon,
  isSelected,
  onToggle,
}) => {
  const { market } = useMarket();
  const currencySymbol = getMarketConfig(market).currencySymbol;

  return (
    <Card
      className={`w-full max-w-sm cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? "ring-2 ring-[#FCC01C] bg-yellow-50" : "hover:shadow-md"
      }`}
      isPressable
      onPress={() => onToggle(addon.id)}
    >
      <CardBody className="p-0">
        <div className="relative">
          <Image
            alt={addon.name}
            className="w-full h-48 object-cover rounded-t-lg"
            height={192}
            src={addon.image}
            width={384}
          />

          {/* Selection indicator */}
          {isSelected && (
            <div className="absolute top-3 right-3 bg-[#FCC01C] rounded-full p-2">
              <FaCheck className="text-white text-sm" />
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs font-medium text-gray-700">
              {addon.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {addon.name}
            </h3>
            <span className="text-lg font-bold text-[#FCC01C] ml-2">
              {currencySymbol}{addon.price}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {addon.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(addon.client.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                {addon.client.rating} ({addon.client.review_count})
              </span>
            </div>

            <span className="text-xs text-gray-500">
              by {addon.client.business_name}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
