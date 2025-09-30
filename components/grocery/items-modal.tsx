"use client";

import type { GroceryItem } from "@/lib/api/groceries";

import React from "react";

interface ItemsModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  items: GroceryItem[];
}

export const ItemsModal: React.FC<ItemsModalProps> = ({
  open,
  onClose,
  title = "Items",
  items,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
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

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">No items found.</p>
          ) : (
            items.map((it, idx) => (
              <div
                key={`${it.name}-${idx}`}
                className="flex items-center justify-between py-2 px-3 rounded-md border border-gray-200"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{it.name}</p>
                  <p className="text-xs text-gray-500">{it.measurement_unit}</p>
                </div>
                <div className="text-sm text-gray-800">{it.weight}</div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
