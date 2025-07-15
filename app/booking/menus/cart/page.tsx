"use client";

import React, { useState } from "react";

import { Cart } from "@/components/cart/cart";

const Index = () => {
  const [menu, setMenu] = useState<any>(null);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);
  const setMenuId = (id: number) => {};

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-[655px]">
        <Cart
          onNext={() => {}}
          menu={menu}
          menuLoading={menuLoading}
          menuError={menuError}
          selectedMenuItems={selectedMenuItems}
          setSelectedMenuItems={setSelectedMenuItems}
          setMenuId={setMenuId}
        />
      </div>
    </div>
  );
};

export default Index;
