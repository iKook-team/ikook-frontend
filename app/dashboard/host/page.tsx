"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { MyBookingsPage } from "@/components/dashboard/host-dashboard";
import { paymentsService } from "@/lib/api/payments";
import { showToast } from "@/lib/utils/toast";

const HostDashboard: React.FC = () => {
  const { user, isAuthenticated, userType } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");

      return;
    }

    if (userType !== "host") {
      router.push("/login");

      return;
    }

    // Payment verification logic
    const reference =
      searchParams.get("reference") ||
      localStorage.getItem("payment_reference");

    if (reference) {
      paymentsService
        .verify(reference)
        .then(() => {
          showToast.success("Payment successful!");
          localStorage.removeItem("payment_reference");
          // Remove reference from URL
          router.replace("/dashboard/host");
        })
        .catch(() => {
          showToast.error("Payment verification failed.");
        });
    }
  }, [isAuthenticated, userType, router, searchParams]);

  if (!isAuthenticated || userType !== "host") {
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

export default HostDashboard;
