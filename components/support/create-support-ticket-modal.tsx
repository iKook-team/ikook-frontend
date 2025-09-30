"use client";

import React, { useEffect, useState } from "react";

import { FormField } from "@/components/ui/form-field";

export interface CreateSupportTicketPayload {
  category: string;
  title: string;
  message: string;
}

interface CreateSupportTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSupportTicketPayload) => Promise<void> | void;
  isSubmitting?: boolean;
}

const CATEGORY_OPTIONS = ["Booking", "Payment", "Service", "Others"] as const;

export const CreateSupportTicketModal: React.FC<
  CreateSupportTicketModalProps
> = ({ open, onClose, onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState<CreateSupportTicketPayload>({
    category: CATEGORY_OPTIONS[0],
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!open) {
      setFormData({ category: CATEGORY_OPTIONS[0], title: "", message: "" });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (
    field: keyof CreateSupportTicketPayload,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.category ||
      !formData.title.trim() ||
      !formData.message.trim()
    ) {
      return;
    }
    await onSubmit({
      category: formData.category,
      title: formData.title.trim(),
      message: formData.message.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Create Support Ticket
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
            type="select"
            label="Category"
            name="category"
            placeholder="Select category"
            options={Array.from(CATEGORY_OPTIONS)}
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />

          <FormField
            required
            label="Title"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-900">
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full min-h-[120px] border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] text-base font-normal leading-6 placeholder:text-[#6F6E6D] focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:border-[#FCC01C]"
              placeholder="Describe your issue"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>

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
              className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
              disabled={
                isSubmitting ||
                !formData.category ||
                !formData.title.trim() ||
                !formData.message.trim()
              }
            >
              {isSubmitting ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
