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
  filters?: {
    menu_name?: string;
    chef_name?: string;
    price_min?: number | string;
    price_max?: number | string;
    city?: string;
  };
}

const useListings = ({
  selectedService,
  searchQuery = "",
  page = 1,
  pageSize = 12,
  orderBy,
  filters = {},
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
          city: filters.city || city,
          market,
          order_by: orderBy,
          chef_name: filters.chef_name,
        });
      } else if (selectedService in serviceIdToTag) {
        setListingType("service");
        const serviceTag = serviceIdToTag[selectedService];

        const serviceParams = {
          page: pageToFetch,
          page_size: pageSize,
          search: searchQuery,
          chef_service: serviceTag,
          city: filters.city || city,
          market,
          order_by: orderBy,
          service_name: filters.menu_name || undefined,
          chef_name: filters.chef_name || undefined,
          price_min: filters.price_min ? Number(filters.price_min) : undefined,
          price_max: filters.price_max ? Number(filters.price_max) : undefined,
        };

        // Remove undefined values
        Object.keys(serviceParams).forEach(
          (key) =>
            serviceParams[key as keyof typeof serviceParams] === undefined &&
            delete serviceParams[key as keyof typeof serviceParams],
        );

        console.log("Fetching services with cleaned params:", serviceParams);
        response = await listingService.getServices(serviceParams);
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
          city: filters.city || city,
          market,
          menu_name: filters.menu_name || undefined,
          chef_name: filters.chef_name || undefined,
          price_min: filters.price_min ? Number(filters.price_min) : undefined,
          price_max: filters.price_max ? Number(filters.price_max) : undefined,
        };

        if (orderBy === "Recently Added") {
          menuParams.order_by = orderBy;
        }

        // Remove undefined values
        Object.keys(menuParams).forEach(
          (key) => menuParams[key] === undefined && delete menuParams[key],
        );

        console.log("Fetching menus with cleaned params:", menuParams);
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
  }, [selectedService, searchQuery, orderBy, filters]);

  // Load more when page changes
  const prevPageRef = useRef<number>(currentPage);

  useEffect(() => {
    if (currentPage > prevPageRef.current) {
      // Forward navigation (Load More)
      fetchListings(currentPage, true);
    } else if (currentPage < prevPageRef.current) {
      // Back navigation
      // Truncate listings to the current page's size
      setListings((prev) => prev.slice(0, currentPage * pageSize));
    }
    prevPageRef.current = currentPage;
  }, [currentPage, pageSize]);

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
