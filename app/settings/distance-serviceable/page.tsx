"use client";

import React from "react";

import { DistanceServiceableForm } from "@/components/distance-serviceable/distance-serviceable-form";
import BackButton from "@/components/common/BackButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFB] relative">
      <main className="w-full relative">
        <div className="w-full max-w-[655px] mx-auto my-8 px-4 sm:px-5">
          <div className="mb-4">
            <BackButton fallback="/settings" />
          </div>
          <DistanceServiceableForm />
        </div>
      </main>
    </div>
  );
};

export default Index;
