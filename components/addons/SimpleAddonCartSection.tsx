"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "@heroui/react";
import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";
import { Addon } from "@/lib/api/addons";

interface SimpleAddonCartItemProps {
  addon: Addon;
  onRemove: (addonId: number) => void;
  currencySymbol: string;
}

export const SimpleAddonCartItem: React.FC<SimpleAddonCartItemProps> = ({
  addon,
  onRemove,
  currencySymbol,
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200 last:border-b-0">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">
          {addon.name}
        </h4>
        <p className="text-xs text-gray-600">
          by {addon.client_name}
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-sm font-semibold text-[#FCC01C]">
          {currencySymbol}{parseFloat(addon.price || '0').toLocaleString()}
        </span>
        <Button
          className="p-1 bg-red-50 hover:bg-red-100 border border-red-200"
          isIconOnly
          size="sm"
          variant="flat"
          onPress={() => onRemove(addon.id)}
        >
          <FaTimes className="text-red-500 text-xs" />
        </Button>
      </div>
    </div>
  );
};

interface SimpleAddonCartSectionProps {
  selectedAddons: Addon[];
  onRemoveAddon: (addonId: number) => void;
}

export const SimpleAddonCartSection: React.FC<SimpleAddonCartSectionProps> = ({
  selectedAddons,
  onRemoveAddon,
}) => {
  const { market } = useMarket();
  const currencySymbol = getMarketConfig(market).currencySymbol;

  console.log("SimpleAddonCartSection Debug:", {
    selectedAddons,
    selectedAddonsLength: selectedAddons.length,
    selectedAddonsType: Array.isArray(selectedAddons) ? 'array' : typeof selectedAddons,
    firstAddon: selectedAddons[0]
  });

  if (selectedAddons.length === 0) {
    return null;
  }

  const totalAddonCost = selectedAddons.reduce((total, addon) => {
    const price = parseFloat(addon.price) || 0;
    return total + price;
  }, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          🎉 Addon Services
        </h3>
        <p className="text-sm text-gray-600">
          Additional services for your event
        </p>
      </div>

      <div>
        {selectedAddons.map((addon) => (
          <SimpleAddonCartItem
            key={addon.id}
            addon={addon}
            onRemove={onRemoveAddon}
            currencySymbol={currencySymbol}
          />
        ))}
      </div>

      <div className="px-4 py-3 bg-yellow-50 border-t border-yellow-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-yellow-700">
            Addons Subtotal:
          </span>
          <span className="text-sm font-bold text-yellow-700">
            {currencySymbol}{totalAddonCost}
          </span>
        </div>
      </div>
    </div>
  );
};
