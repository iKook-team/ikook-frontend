"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { MyBookingsPage } from "@/components/dashboard/chef-dashboard";

const ChefDashboard: React.FC = () => {
  const { user, isAuthenticated, userType } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");

      return;
    }

    if (userType !== "chef") {
      router.push("/login");

      return;
    }
  }, [isAuthenticated, userType, router]);

  if (!isAuthenticated || userType !== "chef") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFB]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full max-w-6xl">
        <MyBookingsPage />
      </main>
    </div>
  );
};

export default ChefDashboard;
