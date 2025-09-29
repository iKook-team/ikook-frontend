"use client";

import React, { useState, useEffect } from "react";

import { showToast } from "@/lib/utils/toast";
import { FormField } from "@/components/ui/form-field";
import { addressService } from "@/lib/api/address";
import { useAuthStore } from "@/lib/store/auth-store";

interface AddAddressModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  addressId?: number;
}

export const AddAddressModal = ({
  open,
  onClose,
  onSuccess,
  addressId,
}: AddAddressModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userCountry = useAuthStore((state) => state.user?.country || "Nigeria");
  const [formData, setFormData] = useState({
    placeName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: userCountry,
  });

  // Load address info when in edit mode
  useEffect(() => {
    const loadAddress = async () => {
      if (!addressId) return;

      setIsLoading(true);
      try {
        const address = await addressService.getAddress(addressId);

        setFormData({
          placeName: address.place_name,
          addressLine1: address.address_line_one,
          addressLine2: address.address_line_two || "",
          city: address.city,
          postalCode: address.postal_code,
          country: address.country,
        });
      } catch (error) {
        console.error("Error loading address:", error);
        showToast.error("Failed to load address data");
        onClose();
      } finally {
        setIsLoading(false);
      }
    };

    if (open && addressId) {
      loadAddress();
    } else if (!addressId) {
      // Reset form when opening in create mode
      setFormData({
        placeName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: userCountry,
      });
    }
  }, [open, addressId, onClose, userCountry]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (
      !formData.placeName ||
      !formData.addressLine1 ||
      !formData.city ||
      !formData.postalCode
    ) {
      showToast.error("Please fill in all required fields");

      return;
    }

    setIsSubmitting(true);

    try {
      const addressData = {
        place_name: formData.placeName,
        address_line_one: formData.addressLine1,
        address_line_two: formData.addressLine2,
        city: formData.city,
        postal_code: formData.postalCode,
        country: formData.country,
      };

      if (addressId) {
        // Update existing address
        await addressService.updateAddress(addressId, addressData);
        showToast.success("Address updated successfully!");
      } else {
        // Create new address
        await addressService.addAddress(addressData);
        showToast.success("Address added successfully!");
      }

      onClose();
      onSuccess?.();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail ||
        (addressId ? "Failed to update address." : "Failed to add address.") +
          " Please try again.";

      showToast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open && !isLoading) return null;

  const modalTitle = addressId ? "Edit Address" : "Add New Address";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{modalTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            required
            label="Place Name"
            placeholder="e.g. Home, Office"
            value={formData.placeName}
            onChange={(e) => handleInputChange("placeName", e.target.value)}
          />

          <FormField
            required
            label="Address Line 1"
            placeholder="Street address"
            value={formData.addressLine1}
            onChange={(e) => handleInputChange("addressLine1", e.target.value)}
          />

          <FormField
            label="Address Line 2 (Optional)"
            placeholder="Apt, suite, unit, etc."
            value={formData.addressLine2}
            onChange={(e) => handleInputChange("addressLine2", e.target.value)}
          />

          <FormField
            required
            label="City"
            placeholder="Enter city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />

          <FormField
            required
            label="Postal Code"
            placeholder="Postal code"
            value={formData.postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
          />

          {/* Modal Footer */}
          <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? "Saving..." : addressId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
