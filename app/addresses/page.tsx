"use client";

import React from "react";

import { AddressList } from "@/components/address/address-list";
import BackButton from "@/components/common/BackButton";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative flex justify-center">
        <div className="absolute left-4 top-4">
          <BackButton fallback="/settings" />
        </div>
        <AddressList />
      </main>
    </div>
  );
};

export default Index;
