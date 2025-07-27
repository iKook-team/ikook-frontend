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
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <MyBookingsPage />
      </main>
    </div>
  );
};

export default ChefDashboard;
