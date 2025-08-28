"use client";

import React from "react";

import { DiscountList } from "@/components/discount/discount-list";
import BackButton from "@/components/common/BackButton";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl px-5 pt-4">
            <BackButton fallback="/dashboard" />
          </div>
        </div>
        <DiscountList />
      </main>
    </div>
  );
};

export default Index;
