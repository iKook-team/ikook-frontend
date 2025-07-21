"use client";
import React, { useState } from 'react';

import { TabNavigation } from './tab-navigation';
import { MenuCard } from './menu-card';

export const FavouritesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'menus' | 'chefs'>('menus');

  const menuData = [
    {
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      cuisine: "Italian",
      chefName: "Jim Howard",
      location: "London",
      rating: "4.6",
      reviewCount: "23",
      imageUrl: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/f202b32392ccce040e57d63243aade5f95f0d6e0?placeholderIfAbsent=true",
      chefImageUrl: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1fe03e5ad38163bbd83447c7ee0d177ba3791b5d?placeholderIfAbsent=true",
    },
    {
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      cuisine: "Italian",
      chefName: "Jim Howard",
      location: "London",
      rating: "4.6",
      reviewCount: "23",
      imageUrl: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/f202b32392ccce040e57d63243aade5f95f0d6e0?placeholderIfAbsent=true",
      chefImageUrl: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1fe03e5ad38163bbd83447c7ee0d177ba3791b5d?placeholderIfAbsent=true",
    },
    {
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      cuisine: "Italian",
      chefName: "Jim Howard",
      location: "London",
      rating: "4.6",
      reviewCount: "23",
      imageUrl: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/f202b32392ccce040e57d63243aade5f95f0d6e0?placeholderIfAbsent=true",
      chefImageUrl: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1fe03e5ad38163bbd83447c7ee0d177ba3791b5d?placeholderIfAbsent=true",
    },
    {
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      cuisine: "Italian",
      chefName: "Jim Howard",
      location: "London",
      rating: "4.6",
      reviewCount: "23",
      imageUrl: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/f202b32392ccce040e57d63243aade5f95f0d6e0?placeholderIfAbsent=true",
      chefImageUrl: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1fe03e5ad38163bbd83447c7ee0d177ba3791b5d?placeholderIfAbsent=true",
    },
  ];

  return (
    <section className="self-center flex w-[885px] max-w-full flex-col mt-[35px]">
      <h2 className="text-black text-2xl font-semibold leading-none">Favourites</h2>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'menus' && (
        <div className="self-stretch flex gap-[35px] flex-wrap mt-6">
          {menuData.map((menu, index) => (
            <MenuCard key={index} {...menu} />
          ))}
        </div>
      )}
      {activeTab === 'chefs' && (
        <div className="self-stretch flex gap-[35px] flex-wrap mt-6">
          <div className="text-center text-gray-500 w-full py-20">
            Chef profiles will be displayed here
          </div>
        </div>
      )}
    </section>
  );
};
