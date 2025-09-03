"use client";

import React, { useEffect, useMemo, useState } from "react";

import { FormField } from "@/components/ui/form-field";
import { listingService } from "@/lib/api/listing";
import { groceriesService } from "@/lib/api/groceries";
import { useAuthStore } from "@/lib/store/auth-store";

export type DiscountScope = "all" | "menu";

export interface CreateDiscountPayload {
  scope: DiscountScope; // 'all' -> applies to all menus, 'menu' -> single menu
  menu_id?: string | number;
  start_date: string; // yyyy-mm-dd
  end_date: string; // yyyy-mm-dd
  discount_percentage: number; // 0-100
}

interface CreateDiscountModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: CreateDiscountPayload) => Promise<void> | void;
}

export const CreateDiscountModal: React.FC<CreateDiscountModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { user } = useAuthStore();
  const isChef = user?.user_type === "Chef";
  const serviceType = (user as any)?.service_type as string | undefined;
  const isBoxGroceriesService = isChef && serviceType === "Box Groceries";

  const [scope, setScope] = useState<DiscountScope>("all");
  const [menuId, setMenuId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Menus
  const [menus, setMenus] = useState<Array<{ id: number | string; name: string }>>([]);
  const [loadingMenus, setLoadingMenus] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Reset form each open
    setScope("all");
    setMenuId("");
    setStartDate("");
    setEndDate("");
    setPercentage("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const fetchItems = async () => {
      try {
        setLoadingMenus(true);
        if (isBoxGroceriesService) {
          const data = await groceriesService.getGroceries({});
          const items = (data?.results ?? []).map((g: any) => ({ id: g.id, name: g.name }));
          setMenus(items);
        } else {
          // Fetch without status filter to include all of the chef's menus
          const data = await listingService.getMenus();
          const items = (data?.results ?? []).map((m: any) => ({ id: m.id, name: m.name }));
          setMenus(items);
        }
      } catch (e) {
        setMenus([]);
      } finally {
        setLoadingMenus(false);
      }
    };
    fetchItems();
  }, [open, isBoxGroceriesService]);

  const itemSingular = isBoxGroceriesService ? "grocery" : "menu";
  const itemPlural = isBoxGroceriesService ? "groceries" : "menus";

  const menuOptions = useMemo(() => {
    const base = [{ value: "", label: loadingMenus ? `Loading ${itemPlural}...` : `Select a ${itemSingular}` }];
    const rest = menus.map((m) => ({ value: String(m.id), label: m.name }));
    return [...base, ...rest];
  }, [menus, loadingMenus, itemPlural, itemSingular]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    const pct = Number(percentage);
    if (Number.isNaN(pct) || pct <= 0 || pct > 100) return;
    if (!startDate || !endDate) return;
    if (scope === "menu" && !menuId) return;

    const payload: CreateDiscountPayload = {
      scope,
      menu_id: scope === "menu" ? menuId : undefined,
      start_date: startDate,
      end_date: endDate,
      discount_percentage: pct,
    };

    try {
      setIsSubmitting(true);
      await onSubmit?.(payload);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 mx-4 bg-white rounded-lg shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Create Discount</h3>
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
          {/* Scope selection */
          }
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Apply discount to</label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="scope"
                  value="all"
                  checked={scope === "all"}
                  onChange={() => setScope("all")}
                />
                <span>All {itemPlural}</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="scope"
                  value="menu"
                  checked={scope === "menu"}
                  onChange={() => setScope("menu")}
                />
                <span>Single {itemSingular}</span>
              </label>
            </div>
          </div>

          {scope === "menu" && (
            <FormField
              type="select"
              name="menu_id"
              label={itemSingular === "menu" ? "Menu" : "Grocery"}
              placeholder={itemSingular === "menu" ? "Select a menu" : "Select a grocery"}
              options={menuOptions}
              value={menuId}
              onChange={(e) => setMenuId(e.target.value)}
              required
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              type="date"
              name="start_date"
              label="Start date"
              placeholder="Start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <FormField
              type="date"
              name="end_date"
              label="End date"
              placeholder="End date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <FormField
            type="number"
            name="discount_percentage"
            label="Discount percentage"
            placeholder="e.g. 10"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            required
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create discount"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscountModal;
