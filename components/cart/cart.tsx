"use client";

import React from "react";

import { CartHeader } from "./cart-header";
import { ChefCard } from "./chef-card";
import { MenuSection } from "./menu-section";
import { IncludedServices } from "./included-services";
import { ContinueButton } from "./continue-button";

interface CartProps {
  onNext: (data?: Record<string, any>) => void;
  menu: any;
  menuLoading: boolean;
  menuError: string | null;
  selectedMenuItems: string[];
  setSelectedMenuItems: (items: string[]) => void;
  setMenuId: (id: number) => void;
}

export const Cart: React.FC<CartProps> = ({
  onNext,
  menu,
  menuLoading,
  menuError,
  selectedMenuItems,
  setSelectedMenuItems,
  setMenuId,
}) => {
  // Transform menu data to courses format expected by MenuSection
  const courses = (menu?.courses || []).map((course: any) => ({
    title: course.title || course.name || course,
    quantity: course.quantity || 1,
    items: (menu.items || [])
      .filter((item: any) => item.course === (course.title || course.name || course))
      .map((item: any) => ({ id: String(item.id), name: item.name })),
  }));

  const includedServices = [
    {
      iconUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c7b235941aa26390307f7342f9ecda8294773b6d?placeholderIfAbsent=true",
      name: "All ingredients",
    },
    {
      iconUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dae1bd21c1a57e9b64d38548d5ff9c957ef59bd8?placeholderIfAbsent=true",
      name: "Chef's travel and insurance costs",
    },
    {
      iconUrl:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/1436c906e7ee732e95f89eb76724f857a78866e1?placeholderIfAbsent=true",
      name: "Serving and Cleanup",
    },
  ];

  const handleContinue = () => {
    onNext();
  };

  return (
    <main className="flex max-w-[655px] flex-col items-stretch">
      <CartHeader title="Cart" />

      <div className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-stretch bg-white mt-2 py-[33px] rounded-[15px] border-solid max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch px-[19px] max-md:max-w-full max-md:pr-5">
          <ChefCard
            chefName={menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
            dishName={menu?.name || "Menu"}
            imageUrl={menu?.images && menu.images.length > 0 && menu.images[0].image ? menu.images[0].image : "/menus/menu1.png"}
            location={menu?.chef?.city || "Unknown"}
            locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
            rating={menu?.chef?.average_rating ? menu.chef.average_rating.toFixed(1) : "-"}
            ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
            reviewCount={menu?.chef?.num_reviews ? `(${menu.chef.num_reviews} Reviews)` : "(0 Reviews)"}
          />

          <MenuSection
            checkboxUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/cf65a6606e6871f81a6c7b4d7ef1f12024024702?placeholderIfAbsent=true"
            courses={courses}
            selectedMenuItems={selectedMenuItems}
            setSelectedMenuItems={setSelectedMenuItems}
            menuName={menu?.name || "Menu"}
            chefName={menu?.chef?.first_name && menu?.chef?.last_name ? `${menu.chef.first_name} ${menu.chef.last_name}` : "Chef"}
          />

          <IncludedServices services={includedServices} />

          <hr className="w-full mt-[15px] border-t border-gray-200" />
        </div>

        <ContinueButton onClick={handleContinue} />
      </div>
    </main>
  );
};
