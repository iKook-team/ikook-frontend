"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { MyMenusPage } from "@/components/menus/chef-menus";
import BackButton from "@/components/common/BackButton";
import { useAuthStore } from "@/lib/store/auth-store";

const Index: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");

      return;
    }
    const isChef = user?.user_type === "Chef";
    const isChefService = (user as any)?.service_type === "Chef";

    if (!isChef || !isChefService) {
      router.replace("/dashboard/chef");
    }
  }, [isAuthenticated, user, router]);

  if (
    !isAuthenticated ||
    user?.user_type !== "Chef" ||
    (user as any)?.service_type !== "Chef"
  ) {
    return null;
  }

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
