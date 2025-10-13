"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Addon } from "@/lib/api/addons";

interface AddonCartItemProps {
  addon: Addon;
  onRemove: (addonId: number) => void;
}

export const AddonCartItem: React.FC<AddonCartItemProps> = ({
  addon,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        <Image
          alt={addon.name}
          className="w-16 h-16 object-cover rounded-lg"
          height={64}
          src={addon.image}
          width={64}
        />

        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">
            {addon.name}
          </h3>
          <p className="text-sm text-gray-600">
            by {addon.client.business_name}
          </p>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-500">
              Category: {addon.category}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-lg font-semibold text-[#FCC01C]">
            ${addon.price}
          </p>
          <p className="text-sm text-gray-500">
            per service
          </p>
        </div>

        <Button
          className="p-2 bg-red-50 hover:bg-red-100 border border-red-200"
          isIconOnly
          size="sm"
          variant="flat"
          onPress={() => onRemove(addon.id)}
        >
          <FaTimes className="text-red-500" />
        </Button>
      </div>
    </div>
  );
};

interface AddonCartSectionProps {
  selectedAddons: Addon[];
  onRemoveAddon: (addonId: number) => void;
}

export const AddonCartSection: React.FC<AddonCartSectionProps> = ({
  selectedAddons,
  onRemoveAddon,
}) => {
  if (selectedAddons.length === 0) {
    return null;
  }

  const totalAddonCost = selectedAddons.reduce((total, addon) => total + addon.price, 0);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Addon Services
        </h2>
        <p className="text-sm text-yellow-600 mt-1">
          {selectedAddons.length} service{selectedAddons.length > 1 ? "s" : ""} selected
        </p>
      </div>

      <div className="space-y-3">
        {selectedAddons.map((addon) => (
          <AddonCartItem
            key={addon.id}
            addon={addon}
            onRemove={onRemoveAddon}
          />
        ))}
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-yellow-700">
            Addons Subtotal:
          </span>
          <span className="text-lg font-bold text-yellow-700">
            ${totalAddonCost}
          </span>
        </div>
        <p className="text-sm text-yellow-600 mt-1">
          {selectedAddons.length} service{selectedAddons.length > 1 ? "s" : ""} selected
        </p>
      </div>
    </div>
  );
};
