"use client";

import * as React from "react";
import { Button } from "@heroui/react";
import { X } from "lucide-react";
import { GooglePlacesAutocomplete } from "@/components/ui/google-places-autocomplete";

export interface FilterPanelFilters {
  menu_name?: string;
  chef_name?: string;
  price_min?: number | string;
  price_max?: number | string;
  city?: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  filters: FilterPanelFilters;
  onFiltersChange: (filters: FilterPanelFilters) => void;
  onApply: (filters: FilterPanelFilters) => void;
  onClose?: () => void;
}

export function FilterPanel({
  isOpen,
  filters,
  onFiltersChange,
  onApply,
  onClose,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = React.useState<FilterPanelFilters>(
    filters || {},
  );

  React.useEffect(() => {
    setLocalFilters(filters || {});
  }, [filters]);

  const handleInputChange = (key: keyof FilterPanelFilters, value: string | number) => {
    const updated = { ...localFilters, [key]: value };
    setLocalFilters(updated);
    // Debounce text inputs for real-time filtering
    if (key === "menu_name" || key === "chef_name") {
      onFiltersChange(updated);
    }
  };

  const handleCityChange = (city: string, _placeId?: string) => {
    const updated = { ...localFilters, city };
    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const handleApply = () => {
    // Validate price range and clean up empty values
    const minPrice = localFilters.price_min ? Number(localFilters.price_min) : undefined;
    const maxPrice = localFilters.price_max ? Number(localFilters.price_max) : undefined;

    if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
      alert("Minimum price cannot be greater than maximum price");
      return;
    }

    // Create cleaned filters object - remove empty strings
    const cleanedFilters: FilterPanelFilters = {
      menu_name: localFilters.menu_name || undefined,
      chef_name: localFilters.chef_name || undefined,
      price_min: minPrice,
      price_max: maxPrice,
      city: localFilters.city || undefined,
    };

    // Remove undefined values
    Object.keys(cleanedFilters).forEach(
      (key) =>
        cleanedFilters[key as keyof FilterPanelFilters] === undefined &&
        delete cleanedFilters[key as keyof FilterPanelFilters]
    );

    onApply(cleanedFilters);
    if (onClose) {
      onClose();
    }
  };

  const handleReset = () => {
    const emptyFilters: FilterPanelFilters = {};
    setLocalFilters(emptyFilters);
    onApply(emptyFilters);
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 bg-gray-50 py-6">
      <div className="px-12 max-md:px-6 max-sm:px-4 w-full">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-black">Filter Results</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label="Close filter panel"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* City Filter */}
            <div className="flex flex-col">
              <GooglePlacesAutocomplete
                value={localFilters.city || ""}
                onChange={handleCityChange}
                placeholder="Search city..."
                label="City"
                inputClassName="text-sm"
              />
            </div>

            {/* Menu Name Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="menu_name_input"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Menu Name
              </label>
              <input
                id="menu_name_input"
                type="text"
                placeholder="Search menu..."
                value={localFilters.menu_name || ""}
                onChange={(e) => handleInputChange("menu_name", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                aria-label="Filter by menu name"
              />
            </div>

            {/* Chef Name Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="chef_name_input"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Chef Name
              </label>
              <input
                id="chef_name_input"
                type="text"
                placeholder="Search chef..."
                value={localFilters.chef_name || ""}
                onChange={(e) => handleInputChange("chef_name", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                aria-label="Filter by chef name"
              />
            </div>

            {/* Min Price Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="price_min_input"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Min Price
              </label>
              <input
                id="price_min_input"
                type="number"
                placeholder="Min price"
                value={localFilters.price_min || ""}
                onChange={(e) =>
                  handleInputChange("price_min", e.target.value ? Number(e.target.value) : "")
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                aria-label="Filter by minimum price"
                min="0"
              />
            </div>

            {/* Max Price Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="price_max_input"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Max Price
              </label>
              <input
                id="price_max_input"
                type="number"
                placeholder="Max price"
                value={localFilters.price_max || ""}
                onChange={(e) =>
                  handleInputChange("price_max", e.target.value ? Number(e.target.value) : "")
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                aria-label="Filter by maximum price"
                min="0"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              onClick={handleReset}
              className="bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors"
              size="md"
              radius="md"
            >
              Reset Filters
            </Button>
            <Button
              onClick={handleApply}
              className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-colors font-medium"
              size="md"
              radius="md"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
