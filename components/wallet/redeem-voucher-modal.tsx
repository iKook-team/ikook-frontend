"use client";

import React, { useState, useEffect } from "react";
import { FormField } from "@/components/ui/form-field";

interface RedeemVoucherModalProps {
  open: boolean;
  onClose: () => void;
  // Optional callback to handle redeem action
  onRedeem?: (voucherCode: string) => Promise<void> | void;
}

export const RedeemVoucherModal = ({ open, onClose, onRedeem }: RedeemVoucherModalProps) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) setVoucherCode("");
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return; // simple guard

    try {
      setIsSubmitting(true);
      await onRedeem?.(voucherCode.trim());
      onClose();
    } catch (err) {
      // Keep modal open; page-level handler shows toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Redeem Voucher</h3>
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
            label="Voucher Number"
            placeholder="Enter voucher number"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            maxLength={16}
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
              disabled={isSubmitting || !voucherCode.trim()}
            >
              {isSubmitting ? "Redeeming..." : "Redeem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
