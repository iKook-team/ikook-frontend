import { useState, useEffect, useRef } from "react";

import { useMarket } from "@/lib/market-context";
import {
  listingService,
  type ServiceTag,
  type MenuTag,
} from "@/lib/api/listing";

type ListingType = "menu" | "service" | "chef";

// Map service IDs to their corresponding tags
const serviceIdToTag: Record<string, ServiceTag> = {
  "box-groceries": "Box Grocery",
  "cooking-class": "Cooking Class",
  "eating-coach": "Eating Coach",
};

// Map menu service IDs to their corresponding tags
const menuIdToTag: Record<string, MenuTag> = {
  "chef-at-home": "Chef at Home",
  "corporate-dining": "Corporate Dining",
  "fine-dining": "Fine Dining",
  "large-event": "Large Event",
  "meal-delivery": "Meal Delivery",
  "meal-prep": "Meal Prep",
};

interface UseListingsProps {
  selectedService: string;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
}

const useListings = ({
  selectedService,
  searchQuery = "",
  page = 1,
  pageSize = 12,
  orderBy,
}: UseListingsProps) => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [listingType, setListingType] = useState<ListingType>("menu");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const isInitialMount = useRef(true);
  const { market: marketCtx } = useMarket();

  const fetchListings = async (
    pageToFetch: number,
    append: boolean = false,
  ) => {
    // Don't fetch if we've already loaded all items
    if (append && listings.length >= totalCount && totalCount > 0) return;

    setLoading(true);
    setError(null);

    try {
      let response;

      // Pull persisted filters from sessionStorage (fallbacks)
      let city: string | undefined;
      let marketFromStorage: string | undefined;

      try {
        const raw =
          typeof window !== "undefined"
            ? sessionStorage.getItem("ikook_explore_pref")
            : null;

        if (raw) {
          const pref = JSON.parse(raw || "{}");

          if (pref && typeof pref === "object") {
            city = pref.city;
            marketFromStorage = pref.market;
          }
        }
      } catch {
        // ignore parse/storage errors
      }

      // Prefer market from context, fallback to persisted value
      const market = (marketCtx as string | undefined) || marketFromStorage;

      // Determine the type of listing based on the selected service
      if (selectedService === "chefs") {
        setListingType("chef");
        response = await listingService.getChefs({
          page: pageToFetch,
          page_size: pageSize,
          search: searchQuery,
          city,
          market,
          order_by: orderBy,
        });
      } else if (selectedService in serviceIdToTag) {
        setListingType("service");
        const serviceTag = serviceIdToTag[selectedService];

        console.log("Fetching services with params:", {
          page: pageToFetch,
          page_size: pageSize,
          search: searchQuery,
          chef_service: serviceTag,
          city,
          market,
        });
        response = await listingService.getServices({
          page: pageToFetch,
          page_size: pageSize,
          search: searchQuery,
          chef_service: serviceTag,
          city,
          market,
          order_by: orderBy,
        });
        console.log("Services API response:", response);
      } else if (selectedService in menuIdToTag) {
        setListingType("menu");
        // For menus, only send order_by if it's "Recently Added"
        // "Most Popular" is not supported by the menu endpoint
        const menuParams: any = {
          page: pageToFetch,
          page_size: pageSize,
          search: searchQuery,
          menu_type: menuIdToTag[selectedService as keyof typeof menuIdToTag],
          status: "Active",
          city,
          market,
        };
        
        if (orderBy === "Recently Added") {
          menuParams.order_by = orderBy;
        }
        
        response = await listingService.getMenus(menuParams);
      } else {
        // Default to empty results if service type is not recognized
        setListings([]);
        setTotalCount(0);
        setLoading(false);

        return;
      }

      // For first page, replace the listings, otherwise append
      if (pageToFetch === 1) {
        setListings(response?.results || []);
      } else {
        setListings((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const newItems = (response?.results || []).filter(
            (item) => !existingIds.has(item.id),
          );

          return [...prev, ...newItems];
        });
      }

      setTotalCount(response?.count || 0);
    } catch (err) {
      setError("Failed to fetch listings. Please try again later.");
      setListings([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and service change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchListings(1, false);
    } else {
      fetchListings(1, false);
    }
  }, [selectedService, searchQuery, orderBy]);

  // Load more when page changes
  useEffect(() => {
    if (currentPage > 1) {
      fetchListings(currentPage, true);
    }
  }, [currentPage]);

  const refetch = () => fetchListings(1, false);

  return {
    listings,
    loading,
    error,
    listingType,
    totalCount,
    currentPage,
    setCurrentPage,
    refetch,
  };
};

export default useListings;
