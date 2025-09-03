"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

export const UserMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  // Debug logging removed

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    // Debug logging removed
    if (!isAuthenticated) return;

    setIsLoggingOut(true);
    try {
      // Call the logout API
      await authService.logout();

      // Clear local state
      logout();

      // Close menu
      setIsMenuOpen(false);

      // Show success toast
      showToast.success("Logged out successfully");

      // Redirect to home page
      router.push("/login");
    } catch (error) {
      handleApiError(error, "Logout failed. Please try again.");
      // Even if API call fails, clear local state
      logout();
      setIsMenuOpen(false);
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // --- IMPORTANT: Button is only disabled when isLoggingOut ---

  // Don't render if not authenticated
  if (!isAuthenticated) {
    // Debug logging removed
    return null;
  }

  // Debug logging removed

  const isChef = user?.user_type === "Chef";
  const isHost = user?.user_type === "Host";

  return (
    <div className="w-[84px] h-12 relative max-sm:w-11 max-sm:h-11">
      <button
        onClick={toggleMenu}
        className="w-[84px] h-12 border rounded-[30px] border-solid border-[#CFCFCE] hover:border-[#FCC01C] transition-colors max-sm:w-11 max-sm:h-11"
        aria-label="User menu"
        aria-expanded={isMenuOpen}
      >
        <div className="inline-flex items-center gap-1 w-[60px] h-8 ml-3 mt-2 max-sm:w-8 max-sm:h-8 max-sm:ml-1.5 max-sm:mt-1.5">
          <div className="flex w-8 h-8 justify-center items-center bg-[#F9F5FF] p-1.5 rounded-[200px]">
            <div className="w-5 h-5">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="user-icon" style="width: 13px; height: 15px; stroke-width: 1.667px; stroke: #FCC01C"> <path d="M14.9221 16.5V14.8333C14.9221 13.9493 14.5709 13.1014 13.9458 12.4763C13.3206 11.8512 12.4728 11.5 11.5887 11.5H4.92208C4.03802 11.5 3.19018 11.8512 2.56506 12.4763C1.93993 13.1014 1.58875 13.9493 1.58875 14.8333V16.5M11.5887 4.83333C11.5887 6.67428 10.0964 8.16667 8.25541 8.16667C6.41446 8.16667 4.92208 6.67428 4.92208 4.83333C4.92208 2.99238 6.41446 1.5 8.25541 1.5C10.0964 1.5 11.5887 2.99238 11.5887 4.83333Z" stroke="#FCC01C" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
                }}
              />
            </div>
          </div>
          <div className="w-6 h-6 max-sm:hidden">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="burger-icon" style="width: 12px; height: 8px; stroke-width: 2px; stroke: #000"> <path d="M1.25537 1H13.2554M1.25537 5H13.2554M1.25537 9H13.2554" stroke="black" stroke-width="2" stroke-linecap="round"></path> </svg>',
              }}
            />
          </div>
        </div>
      </button>

      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#EBEBEB] rounded-lg shadow-lg z-50">
          <div className="py-2">
            {/* Shared items for both hosts and chefs */}
            <button
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() =>
                router.push(
                  user?.user_type === "Chef"
                    ? "/dashboard/chef"
                    : "/dashboard/host",
                )
              }
            >
              Bookings
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => router.push("/settings")}
            >
              Settings
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => router.push("/support")}
            >
              Support
            </button>

            {/* Chef-specific items */}
            {isChef && (
              <>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/menus")}
                >
                  Menus
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/groceries")}
                >
                  Groceries
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/calendar")}
                >
                  Calendar
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/revenue")}
                >
                  Revenue
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/quotes")}
                >
                  Quotes
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/discount")}
                >
                  Discount
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/services")}
                >
                  Services
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/verification")}
                >
                  Verification
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/reviews")}
                >
                  Review
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/references")}
                >
                  References
                </button>
              </>
            )}

            {/* Host-specific items */}
            {isHost && (
              <>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/wallet")}
                >
                  Wallet
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/favourites")}
                >
                  Favourites
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/addresses")}
                >
                  Addresses
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/referrals")}
                >
                  Referral
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/payment-cards")}
                >
                  Payment
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/verification")}
                >
                  Verification
                </button>
              </>
            )}

            <hr className="my-1" />
            <button
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
