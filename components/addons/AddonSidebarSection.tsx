"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Addon } from "@/lib/api/addons";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { formatNumber } from "@/lib/format";

interface AddonSidebarSectionProps {
  selectedAddons: Addon[];
  onRemoveAddon: (addonId: number) => void;
}

export const AddonSidebarSection: React.FC<AddonSidebarSectionProps> = ({
  selectedAddons,
  onRemoveAddon,
}) => {
  const { market } = useMarket();
  const currencySymbol = getMarketConfig(market).currencySymbol;

  if (selectedAddons.length === 0) {
    return null;
  }

  const totalAddonCost = selectedAddons.reduce((total, addon) => {
    const price = parseFloat(addon.price) || 0;
    return total + price;
  }, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        🎉 Addon Services
      </h3>

      <div className="space-y-3">
        {selectedAddons.map((addon) => (
          <div key={addon.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <Image
              alt={addon.name}
              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
              height={48}
              src={addon.image}
              width={48}
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {addon.name}
              </h4>
              <p className="text-xs text-gray-600">
                by {addon.client_name}
              </p>
              <p className="text-sm font-semibold text-green-600 mt-1">
                {currencySymbol}{formatNumber(parseFloat(addon.price || '0'), market)}
              </p>
            </div>
            <Button
              className="flex-shrink-0 p-1 h-auto bg-transparent hover:bg-red-50"
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => onRemoveAddon(addon.id)}
            >
              <FaTimes className="text-red-500 text-sm" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Addons Total:
          </span>
          <span className="text-sm font-semibold text-[#FCC01C]">
            {currencySymbol}{formatNumber(totalAddonCost, market)}
          </span>
        </div>
      </div>
    </div>
  );
};
