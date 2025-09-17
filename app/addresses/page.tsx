"use client";

import React from "react";

import { AddressList } from "@/components/address/address-list";
import BackButton from "@/components/common/BackButton";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        <div className="mb-6">
          <BackButton fallback="/settings" />
        </div>
        <AddressList />
      </main>
    </div>
  );
};

export default Index;
