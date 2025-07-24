import { useState, useEffect } from "react";
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
}

const useListings = ({
  selectedService,
  searchQuery = "",
  page = 1,
  pageSize = 12,
}: UseListingsProps) => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [listingType, setListingType] = useState<ListingType>("menu");
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchListings = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      // Determine the type of listing based on the selected service
      if (selectedService === "chefs") {
        setListingType("chef");
        response = await listingService.getChefs({
          page,
          page_size: pageSize,
          search: searchQuery,
        });
      } else if (selectedService in serviceIdToTag) {
        setListingType("service");
        response = await listingService.getServices({
          page,
          page_size: pageSize,
          search: searchQuery,
          chef_service: serviceIdToTag[selectedService],
        });
      } else if (selectedService in menuIdToTag) {
        setListingType("menu");
        response = await listingService.getMenus({
          page,
          page_size: pageSize,
          search: searchQuery,
          menu_type: menuIdToTag[selectedService as keyof typeof menuIdToTag],
        });
      } else {
        // Default to empty results if service type is not recognized
        setListings([]);
        setTotalCount(0);
        setLoading(false);
        return;
      }

      setListings(response?.results || []);
      setTotalCount(response?.count || 0);
    } catch (err) {
      setError("Failed to fetch listings. Please try again later.");
      setListings([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [selectedService, searchQuery, page, pageSize]);

  const refetch = () => {
    fetchListings();
  };

  return {
    listings,
    loading,
    error,
    listingType,
    totalCount,
    refetch,
  };
};

export default useListings;
