"use client";

import { useState } from "react";

import { MenuListing } from "./listings/menu";
import { ChefCard } from "./listings/chef";
import { ServiceListing } from "./listings/service";

import Skeleton from "@/components/ui/skeleton";
import useListings from "@/hooks/useListings";

// Map API response to component props
const mapMenuToItem = (menu: any) => ({
  id: menu.id,
  title: menu.name,
  price: menu.price_per_person,
  img: menu.images && menu.images.length > 0 ? menu.images[0].image : "/menus/menu1.png",
  location: menu.chef_details?.city || "Unknown location",
  rating: menu.chef_details?.average_rating ? Math.round(menu.chef_details.average_rating * 10) / 10 : 0,
  reviewCount: menu.chef_details?.num_reviews || 0,
  chefName:
    `${menu.chef_details?.first_name || ""} ${menu.chef_details?.last_name || ""}`.trim(),
  chefAvatar: menu.chef_details?.avatar || "",
});

const mapChefToItem = (chef: any) => ({
  id: chef.id,
  name: `${chef.first_name} ${chef.last_name}`.trim(),
  location: chef.city || "Unknown location",
  rating: chef.average_rating || 0,
  reviewCount: chef.num_reviews || 0,
  description: chef.bio || "Professional chef",
  services: chef.cuisine_types || [],
  mainImageUrl: chef.cover_photo || "",
  profileImageUrl: chef.avatar || "",
  isVerified: chef.is_verified,
});

const mapServiceToItem = (service: any) => ({
  id: service.id,
  title: service.name,
  description: service.description,
  price: service.price_per_person || service.starting_price_per_person,
  mainImageUrl: service.cover_image || "/menus/menu1.png",
  rating: service.chef_details?.average_rating
    ? Math.round(service.chef_details.average_rating * 10) / 10
    : service.chef?.average_rating
    ? Math.round(service.chef.average_rating * 10) / 10
    : 0,
  reviewCount: service.chef_details?.num_reviews || service.chef?.num_reviews || 0,
  location: service.chef_details?.city || service.chef?.city || "Unknown location",
  services: [service.chef_service],
  profileImageUrl: service.chef_details?.avatar || service.chef?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  isVerified: service.chef_details?.is_verified || service.chef?.is_verified,
  chefName:
    `${service.chef_details?.first_name || service.chef?.first_name || ""} ${service.chef_details?.last_name || service.chef?.last_name || ""}`.trim(),
});

// Skeleton Loader Component
interface ListingSkeletonProps {
  count?: number;
  type?: "menu" | "chef" | "service";
}

const ListingSkeleton = ({
  count = 4,
  type = "menu",
}: ListingSkeletonProps) => {
  const getSkeletonClass = () => {
    switch (type) {
      case "menu":
        return "h-64";
      case "chef":
        return "h-80";
      case "service":
        return "h-72";
      default:
        return "h-64";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden shadow-md">
          <Skeleton className={`w-full ${getSkeletonClass()}`} />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

interface ListingProps {
  selectedService?: string;
}

export const Listing = ({ selectedService = "chef-at-home" }: ListingProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 12; // Show 12 items per page

  const { listings, loading, error, listingType, totalCount, refetch } =
    useListings({
      selectedService,
      page,
      pageSize,
    });

  // Map API data to component props
  const mappedListings = listings.map((item) => {
    switch (listingType) {
      case "menu":
        return mapMenuToItem(item);
      case "chef":
        return mapChefToItem(item);
      case "service":
        return mapServiceToItem(item);
      default:
        return item;
    }
  });

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render the appropriate component based on listing type
  const renderContent = () => {
    if (loading) {
      return <ListingSkeleton type={listingType} count={4} />;
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            onClick={refetch}
            type="button"
          >
            Retry
          </button>
        </div>
      );
    }

    if (mappedListings.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No items found for the selected service.
          </p>
        </div>
      );
    }

    switch (listingType) {
      case "menu":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mappedListings.map((item: any) => (
              <MenuListing key={item.id} {...item} />
            ))}
          </div>
        );
      case "chef":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mappedListings.map((item: any) => (
              <ChefCard key={item.id} {...item} />
            ))}
          </div>
        );
      case "service":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mappedListings.map((item: any) => (
              <ServiceListing key={item.id} {...item} />
            ))}
          </div>
        );
      default:
        return <div>No items found</div>;
    }
  };

  // Render pagination controls
  const renderPagination = () => {
    if (totalCount <= pageSize || loading) return null;

    const totalPages = Math.ceil(totalCount / pageSize);
    const showPrev = page > 1;
    const showNext = page < totalPages;

    return (
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className={`px-4 py-2 rounded-md ${
            showPrev
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!showPrev}
          onClick={() => handlePageChange(page - 1)}
          type="button"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded-md ${
            showNext
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!showNext}
          onClick={() => handlePageChange(page + 1)}
          type="button"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="w-full px-12 max-md:px-6 max-sm:px-4 py-8">
      <div className="w-full max-w-[1440px] mx-auto">
        {renderContent()}
        {renderPagination()}
      </div>
    </div>
  );
};
