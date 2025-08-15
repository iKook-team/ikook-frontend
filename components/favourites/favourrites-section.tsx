"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import { TabNavigation } from "./tab-navigation";
import { MenuCard } from "./menu-card";
import { ChefCard } from "./chef-card";

import favouritesService, { FavouriteType } from "@/lib/api/favourites";
import { useAuthStore } from "@/lib/store/auth-store";

interface MenuData {
  id: number;
  title: string;
  price: string;
  cuisine: string;
  chefName: string;
  location: string;
  rating: string;
  reviewCount: string;
  imageUrl: string;
  chefImageUrl: string;
}

interface ChefData {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  services: string[];
  mainImageUrl: string;
  profileImageUrl: string;
  isVerified: boolean;
}

export const FavouritesSection: React.FC = () => {
  // Use a function to initialize state to ensure consistency between server and client
  const [activeTab, setActiveTab] = useState<"menus" | "chefs">(() => {
    // This will only run on the client side
    if (typeof window === "undefined") return "menus";

    // You could also read from localStorage here if you want to persist the tab
    return "menus";
  });
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [chefData, setChefData] = useState<ChefData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get user's currency and country for price formatting
  const { user } = useAuthStore();

  useEffect(() => {
    // Only run on client side after component mounts
    fetchFavourites();
  }, [activeTab]);

  const fetchFavourites = async () => {
    try {
      setIsLoading(true);
      const type: FavouriteType = activeTab === "menus" ? "menu" : "chef";
      const response = await favouritesService.getFavourites(type);

      console.log("API Response:", response); // Debug log

      if (activeTab === "menus") {
        const menus = response.results
          .filter((item) => item.menu !== null)
          .map((item) => {
            const menu = item.menu!;
            const chef = menu.chef || {
              first_name: "",
              last_name: "",
              city: "",
              average_rating: 0,
              num_reviews: 0,
            };

            return {
              id: menu.id,
              title: menu.name,
              price: `£${parseFloat(menu.price_per_person).toFixed(2)}pp`,
              cuisine: menu.cuisine_types?.[0] || "Cuisine",
              chefName: `${chef.first_name} ${chef.last_name}`.trim() || "Chef",
              location: chef.city || "Location",
              rating: chef.average_rating?.toString() || "0.0",
              reviewCount: chef.num_reviews?.toString() || "0",
              imageUrl: menu.images?.[0]?.image || "/placeholder-menu.jpg",
              chefImageUrl:
                chef.avatar ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            };
          });

        console.log("Processed Menus:", menus); // Debug log
        setMenuData(menus);
      } else {
        const chefs = response.results
          .filter((item) => item.chef !== null)
          .map((item) => {
            const chef = item.chef!;

            return {
              id: chef.id,
              name: `${chef.first_name} ${chef.last_name}`.trim() || "Chef",
              location: chef.city || "Location",
              rating: chef.average_rating || 0,
              reviewCount: chef.num_reviews || 0,
              description:
                chef.bio || "Professional chef with years of experience.",
              services: chef.chef_services || [],
              mainImageUrl:
                chef.link_to_cooking_images || "/placeholder-chef-bg.jpg",
              profileImageUrl:
                chef.avatar ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
              isVerified: chef.identity_verified || false,
            };
          });

        console.log("Processed Chefs:", chefs); // Debug log
        setChefData(chefs);
      }
    } catch (error) {
      toast.error("Failed to load favorites. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      await favouritesService.removeFromFavourites(id);
      toast.success("Removed from favorites");
      // Refresh the list after a short delay to ensure the backend has processed the removal
      setTimeout(() => {
        fetchFavourites();
      }, 300);
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove from favorites");
    }
  };

  return (
    <section className="self-center flex w-[885px] max-w-full flex-col mt-[35px] px-5">
      <h2 className="text-black text-2xl font-semibold leading-none mb-6">
        Favourites
      </h2>
      <div className="w-1/2">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" />
        </div>
      ) : (
        <>
          {activeTab === "menus" && (
            <div className="self-stretch flex gap-[35px] flex-wrap mt-6">
              {menuData.length > 0 ? (
                menuData.map((menu) => (
                  <div key={menu.id} className="relative">
                    <MenuCard
                      {...menu}
                      userCurrency={user?.currency}
                      userCountry={user?.country}
                    />
                    <button
                      onClick={() => handleRemoveFavorite(menu.id)}
                      className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-10 text-gray-500">
                  No favorite menus yet. Add some to see them here!
                </div>
              )}
            </div>
          )}

          {activeTab === "chefs" && (
            <div className="self-stretch flex flex-wrap gap-[35px] mt-6 justify-start">
              {chefData.length > 0 ? (
                chefData.map((chef) => (
                  <div key={chef.id} className="relative flex-shrink-0">
                    <ChefCard {...chef} />
                    <button
                      onClick={() => handleRemoveFavorite(chef.id)}
                      className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-10 text-gray-500">
                  No favorite chefs yet. Add some to see them here!
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};
