"use client";

import React, { useState } from "react";
import { showToast } from "@/lib/utils/toast";
import { FormField } from "@/components/ui/form-field";

interface RequestReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => Promise<void>;
  isSubmitting?: boolean;
}

export const RequestReviewModal: React.FC<RequestReviewModalProps> = ({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  
  // Reset form when modal is opened/closed
  React.useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        email: "",
      });
    }
  }, [open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.name || !formData.email) {
      showToast.error("Please fill in all required fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast.error("Please enter a valid email address");
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      // Error is handled by the parent component
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Request a Review
          </h3>
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
            label="Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />

          <FormField
            required
            type="email"
            label="Email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

          {/* Modal Footer */}
          <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
