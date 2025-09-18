"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import { MenuListing } from "./listings/menu";
import { ChefCard } from "./listings/chef";
import { ServiceListing } from "./listings/service";

import Skeleton from "@/components/ui/skeleton";
import useListings from "@/hooks/useListings";

// Helper to ensure absolute image URLs (backend may return relative paths)
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
const toAbsoluteUrl = (url?: string | null): string => {
  if (!url) return "";
  if (/^(?:https?:)?\/\//i.test(url) || url.startsWith("data:")) return url;
  if (!API_BASE) return url.startsWith("/") ? url : `/${url}`;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE}${path}`;
};

// Map API response to component props
const mapMenuToItem = (menu: any) => ({
  id: menu.id,
  title: menu.name,
  price: menu.price_per_person,
  img:
    menu.images && menu.images.length > 0
      ? toAbsoluteUrl(menu.images[0].image)
      : "/menus/menu1.png",
  is_favourite: menu.is_favourite,
  location: menu.chef_details?.city || menu.chef?.city || "Unknown location",
  rating: menu.chef_details?.average_rating
    ? Math.round(menu.chef_details.average_rating * 10) / 10
    : menu.chef?.average_rating
      ? Math.round(menu.chef.average_rating * 10) / 10
      : 0,
  reviewCount: menu.chef_details?.num_reviews || menu.chef?.num_reviews || 0,
  chefName:
    `${menu.chef_details?.first_name || menu.chef?.first_name || ""} ${menu.chef_details?.last_name || menu.chef?.last_name || ""}`.trim(),
  chefAvatar:
    toAbsoluteUrl(menu.chef_details?.avatar) || toAbsoluteUrl(menu.chef?.avatar) || "",
  cuisine_types: menu.cuisine_types || [],
  country: menu.chef_details?.country || menu.chef?.country,
  currency: menu.chef_details?.currency || menu.chef?.currency,
});

const mapChefToItem = (chef: any) => ({
  id: chef.id,
  name: `${chef.first_name} ${chef.last_name}`.trim(),
  location: chef.city || "Unknown location",
  rating: chef.average_rating || 0,
  reviewCount: chef.num_reviews || 0,
  description: chef.bio || "Professional chef",
  // Backend may return `cuisines` or `cuisine_types`
  services: chef.cuisines || chef.cuisine_types || [],
  is_favourite: chef.is_favourite,
  // Provide safe fallbacks to avoid Next/Image errors on empty src
  mainImageUrl:
    toAbsoluteUrl(chef.cover_photo) ||
    "https://images.unsplash.com/photo-1504674900247-0877039348bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  profileImageUrl:
    toAbsoluteUrl(chef.avatar) ||
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
  // Consider other verification flags if present
  isVerified:
    chef.is_verified ?? chef.document_verified ?? chef.identity_verified ?? false,
});

const mapServiceToItem = (service: any) => {
  const chefFirst = service.chef_details?.first_name || service.chef?.first_name || "";
  const chefLast = service.chef_details?.last_name || service.chef?.last_name || "";
  const derivedName = `${chefFirst} ${chefLast}`.trim() || service.chef_service || "Service";
  const price = service.price_per_person || service.starting_price_per_person || service.starting_price;
  const mainImageUrl =
    toAbsoluteUrl(service.cover_image) ||
    toAbsoluteUrl(service.images && service.images[0]?.image) ||
    "/menus/menu1.png";
  return {
    id: service.id,
    chefId: service.chef_details?.id || service.chef?.id,
    title: service.name || derivedName,
    description: service.description,
    price,
    mainImageUrl,
    rating: service.chef_details?.average_rating
      ? Math.round(service.chef_details.average_rating * 10) / 10
      : service.chef?.average_rating
        ? Math.round(service.chef.average_rating * 10) / 10
        : 0,
    reviewCount:
      service.chef_details?.num_reviews || service.chef?.num_reviews || 0,
    location:
      service.chef_details?.city || service.chef?.city || "Unknown location",
    services: [service.chef_service],
    profileImageUrl:
      toAbsoluteUrl(service.chef_details?.avatar) ||
      toAbsoluteUrl(service.chef?.avatar) ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isVerified: service.chef_details?.is_verified || service.chef?.is_verified,
    chefName: derivedName,
  };
};

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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageSize = 12; // Show 12 items per page
  const { 
    listings, 
    loading, 
    error, 
    listingType, 
    totalCount, 
    currentPage,
    setCurrentPage,
    refetch 
  } = useListings({
    selectedService,
    pageSize,
  });

  // Reset page when selectedService changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedService]);

  // Debug log the listings data
  useEffect(() => {
    console.log('Current listings:', {
      listings,
      listingType,
      totalCount,
      loading,
      isLoadingMore
    });
  }, [listings, listingType, totalCount, loading, isLoadingMore]);

  // Map API data to component props
  const displayListings = listings.map((item: any) => {
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

  // Handle loading more items
  const handleLoadMore = () => {
    if (loading || isLoadingMore) return;
    setIsLoadingMore(true);
    setCurrentPage(prev => prev + 1);
  };

  // Check if there are more items to load
  const hasMore = listings.length < totalCount && !isLoadingMore;

  // Render the appropriate component based on listing type
  const renderContent = () => {
    if (loading && listings.length === 0) {
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

    if (listings.length === 0) {
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
            {displayListings.map((item: any) => (
              <MenuListing key={item.id} {...item} />
            ))}
          </div>
        );
      case "chef":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayListings.map((item: any) => (
              <ChefCard key={item.id} {...item} />
            ))}
          </div>
        );
      case "service":
        console.log('Rendering service listings:', displayListings);
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayListings.length > 0 ? (
              displayListings.map((item: any) => (
                <ServiceListing 
                  key={`${item.id}-service`}
                  id={item.id}
                  name={item.title || item.chefName}
                  description={item.description}
                  location={item.location}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  services={item.services}
                  mainImageUrl={item.mainImageUrl}
                  profileImageUrl={item.profileImageUrl}
                  isVerified={item.isVerified}
                  price={item.price}
                  chefId={item.chefId}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No services found</p>
              </div>
            )}
          </div>
        );
      default:
        return <div>No items found</div>;
    }
  };

  // Handle scroll position and loading state after data loads
  useEffect(() => {
    if (loading) return;
    
    // Reset loading more state when data is loaded
    if (isLoadingMore) {
      setIsLoadingMore(false);
      
      // Scroll to show new items if user was near bottom
      const scrollContainer = document.documentElement;
      const isNearBottom = scrollContainer.scrollHeight - window.innerHeight - window.scrollY < 100;
      
      if (isNearBottom) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth'
          });
        });
      }
    }
  }, [loading, isLoadingMore]);

  // Render load more button
  const renderLoadMore = () => {
    if (listings.length === 0) {
      return <div className="text-center py-4 text-gray-500">No items found</div>;
    }

    if (loading && !isLoadingMore) {
      return <div className="text-center py-4">Loading...</div>;
    }

    if (hasMore) {
      return (
        <div className="text-center py-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-3 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-400 transition-colors shadow-sm"
            style={{
              minWidth: '140px',
              opacity: isLoadingMore ? 0.7 : 1,
              cursor: isLoadingMore ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      );
    }

    return (
      <div className="text-center py-4 text-gray-500">
        No more items to load
      </div>
    );
  };

  return (
    <div className="w-full px-12 max-md:px-6 max-sm:px-4 py-8">
      <div className="w-full max-w-[1440px] mx-auto">
        {renderContent()}
        {renderLoadMore()}
      </div>
    </div>
  );
};
