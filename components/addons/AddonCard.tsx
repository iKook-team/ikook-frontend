"use client";

import React from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { Card, CardBody } from "@heroui/react";

import { AddonCardProps } from "@/lib/api/addons";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { formatNumber } from "@/lib/format";

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
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {addon.name}
            </h3>
            <span className="text-lg font-bold text-[#FCC01C] ml-2">
              {currencySymbol}
              {formatNumber(parseFloat(addon.price || "0"), market)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              by {addon.client_name}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
