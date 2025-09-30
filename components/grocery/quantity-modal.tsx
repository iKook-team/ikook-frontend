"use client";

import type { GroceryItem } from "@/lib/api/groceries";

import React from "react";

import { useMarket } from "@/lib/market-context";
import { getMarketConfig } from "@/lib/market-config";

interface QuantityModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl?: string;
    items?: GroceryItem[];
  } | null;
  onConfirm: (qty: number) => void;
}

export const QuantityModal: React.FC<QuantityModalProps> = ({
  open,
  onClose,
  product,
  onConfirm,
}) => {
  const [qty, setQty] = React.useState<number>(1);
  const { market } = useMarket();
  const cfg = React.useMemo(() => getMarketConfig(market), [market]);

  React.useEffect(() => {
    if (open) setQty(1);
  }, [open]);

  if (!open || !product) return null;

  const decrease = () => setQty((q) => Math.max(1, q - 1));
  const increase = () => setQty((q) => q + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl overflow-hidden">
        <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Add to cart</h3>
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
        </header>
        {product.imageUrl && (
          <div className="relative w-full aspect-[1.56]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-5 space-y-4">
          <div className="min-w-0">
            <p className="text-base font-medium text-gray-900 truncate">
              {product.name}
            </p>
            <p className="text-sm text-gray-600">
              {cfg.currencySymbol}
              {product.price}
            </p>
          </div>

          {Array.isArray(product.items) && product.items.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-900">
                Items included
              </p>
              <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
                {product.items.map((it, idx) => (
                  <div
                    key={`${it.name}-${idx}`}
                    className="flex items-center justify-between py-2 px-3 rounded-md border border-gray-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {it.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {it.measurement_unit}
                      </p>
                    </div>
                    <div className="text-sm text-gray-800">{it.weight}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={decrease}
                className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                className="w-14 h-9 text-center border border-gray-300 rounded-md"
                value={qty}
                min={1}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value) || 1))
                }
              />
              <button
                type="button"
                onClick={increase}
                className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <footer className="flex justify-end gap-3 px-5 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(qty)}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#FCC01C] rounded-md hover:bg-[#e6ac19]"
          >
            Add to cart
          </button>
        </footer>
      </div>
    </div>
  );
};
