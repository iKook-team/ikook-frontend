"use client";

import React from "react";

import { MyMenusPage } from "@/components/menus/chef-menus";
import BackButton from "@/components/common/BackButton";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <div className="flex justify-center">
          <div className="w-full max-w-[1114px]">
            <div className="mt-4 ml-28 max-md:ml-2.5">
              <BackButton fallback="/dashboard" />
            </div>
          </div>
        </div>
        <MyMenusPage />
      </main>
    </div>
  );
};

export default Index;
