"use client";

import React from "react";

import { CartHeader } from "./cart-header";
import { ChefCard } from "./chef-card";
import { MenuSection } from "./menu-section";
import { IncludedServices } from "./included-services";
import { ContinueButton } from "./continue-button";

export const Cart: React.FC = () => {
  const menuCourses = [
    {
      title: "Starter",
      quantity: 2,
      items: [
        {
          id: "starter-1",
          name: "Mediterranean Chicken Kebab with Garlic Sauce",
        },
        { id: "starter-2", name: "Roasted Red Pepper Greek Yoghurt Hummus" },
      ],
    },
    {
      title: "Main",
      quantity: 1,
      items: [
        { id: "main-1", name: "Mackerel with Lemon Olive Oil and Tomatoes" },
        { id: "main-2", name: "Mackerel with Lemon Olive Oil and Tomatoes" },
      ],
    },
    {
      title: "Desert",
      quantity: 1,
      items: [
        { id: "desert-1", name: "Mackerel with Lemon Olive Oil and Tomatoes" },
      ],
    },
  ];

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
    console.log("Continue button clicked");
  };

  return (
    <main className="flex max-w-[655px] flex-col items-stretch">
      <CartHeader title="Cart" />

      <div className="border border-[color:var(--Black-100,#E7E7E7)] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full flex-col items-stretch bg-white mt-2 py-[33px] rounded-[15px] border-solid max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch px-[19px] max-md:max-w-full max-md:pr-5">
          <ChefCard
            imageUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/231d86006c0dab5ed39c08a8a310d23841a29a6f?placeholderIfAbsent=true"
            dishName="Braised Chicken With Lemon and Olives"
            chefName="Chef Titilayo John"
            location="London"
            locationIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6a979250a7b2e8fadafb588f6b48331c3ddaeb05?placeholderIfAbsent=true"
            rating="4.6"
            ratingIconUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/95ff912f680fb9cb0b65a4e92d4e4a21883cc4f2?placeholderIfAbsent=true"
            reviewCount="(23 Reviews)"
          />

          <MenuSection
            courses={menuCourses}
            separatorUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5112919cd18c4d749069bc40490d71c0104a44e?placeholderIfAbsent=true"
            checkboxUrl="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/cf65a6606e6871f81a6c7b4d7ef1f12024024702?placeholderIfAbsent=true"
          />

          <IncludedServices services={includedServices} />

          <img
            src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4e5e0e8d7af4287197a7d5d0575a23c15b68d216?placeholderIfAbsent=true"
            alt=""
            className="aspect-[500] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-[15px] max-md:max-w-full"
          />
        </div>

        <ContinueButton onClick={handleContinue} />
      </div>
    </main>
  );
};
