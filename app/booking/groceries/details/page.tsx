"use client";

import React from "react";

import Groceries from "@/components/grocery/groceries";

const GroceriesPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 py-10">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <Groceries />
      </div>
    </div>
  );
};

export default GroceriesPage;
