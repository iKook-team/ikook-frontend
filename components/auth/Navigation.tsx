"use client";

import React from "react";
import Link from "next/link";
import { Gift } from "lucide-react";

import { LocationSelector } from "../common/LocationSelector";

import { UserMenu } from "./user-menu";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

export const Navigation: React.FC = () => {
  const { isAuthenticated, userType } = useAuthStore();
  const showExplore = !isAuthenticated || userType === "host";
  const showJoinAsChef = !isAuthenticated;

  return (
    <header className="w-full bg-white py-4 px-6 lg:px-12 shadow-[0px_4px_30px_0px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="block">
            <div className="w-[116px] h-[39px]">
              <svg
                width="116"
                height="41"
                viewBox="0 0 116 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo"
              >
                <circle
                  cx="48.6185"
                  cy="29.3702"
                  r="9.91426"
                  stroke="#FCC01C"
                  strokeWidth="3.05054"
                />
                <path
                  d="M29.8066 27.8447L37.5177 28.4379V31.4037L29.8066 31.9121V27.8447Z"
                  fill="#FCC01C"
                />
                <path
                  d="M43.4492 5.89795C42.5735 6.94304 41.3477 9.60944 43.4492 11.9143C43.7034 12.338 45.5676 14.2022 43.0255 16.9985"
                  stroke="#FCC01C"
                  strokeWidth="2.03369"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M48.8463 2C47.9706 3.04509 46.7448 5.71149 48.8463 8.01634C49.1005 8.44003 50.9647 10.3042 48.4226 13.1006"
                  stroke="#FCC01C"
                  strokeWidth="2.03369"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M54.7784 5.89795C53.9028 6.94304 52.6769 9.60944 54.7784 11.9143C55.0326 12.338 56.8968 14.2022 54.3547 16.9985"
                  stroke="#FCC01C"
                  strokeWidth="2.03369"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="76.6448"
                  cy="29.3702"
                  r="9.91426"
                  stroke="#FCC01C"
                  strokeWidth="3.05054"
                />
                <path
                  d="M0.667542 21.0182C1.37933 19.1497 2.89189 18.7568 3.5592 18.7938V39.9252H0.667542V21.0182Z"
                  fill="#FCC01C"
                />
                <path
                  d="M12.1229 39.9253V11.8984H15.237V25.1333L28.5831 11.8984H32.587L15.237 28.8035V39.9253H12.1229Z"
                  fill="#FCC01C"
                />
                <path
                  d="M28.8056 40.1477L17.2389 28.8035C18.4846 28.2697 20.6496 28.5811 21.5764 28.8035L32.9206 40.1477H28.8056Z"
                  fill="#FCC01C"
                />
                <path
                  d="M95.2024 39.814V11.7871H98.3165V25.022L111.663 11.7871H115.666L98.3165 28.6922V39.814H95.2024Z"
                  fill="#FCC01C"
                />
                <path
                  d="M111.885 40.0364L100.318 28.6922C101.564 28.1583 103.729 28.4698 104.656 28.6922L116 40.0364H111.885Z"
                  fill="#FCC01C"
                />
                <circle cx="2.22435" cy="13.1218" r="2.22435" fill="#FCC01C" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Right-aligned navigation and actions */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center space-x-8">
            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {showExplore && (
                <Link
                  href="/explore"
                  className="text-ikook-secondary hover:text-ikook-primary transition-colors font-medium"
                >
                  Explore Services
                </Link>
              )}
              <Link
                href="/how-it-works"
                className="text-ikook-secondary hover:text-ikook-primary transition-colors font-medium"
              >
                How it Works
              </Link>
              <div className="flex items-center space-x-1">
                <Link href="/gifts" className="text-gray-700 hover:text-ikook-primary font-medium">
                  Gift
                </Link>
                <Gift className="w-5 h-5 text-[#FCC01C]" />
              </div>
              {showJoinAsChef && (
                <Link
                  href="/join?role=chef"
                  className="text-ikook-secondary hover:text-ikook-primary transition-colors font-medium"
                >
                  Join as Chef
                </Link>
              )}
            </nav>

            {/* Auth and Language */}
            <div className="flex items-center space-x-4">
              {/* Auth Buttons */}
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Link href="/login">
                  <Button className="bg-ikook-primary hover:bg-ikook-primary/90 text-white font-semibold px-6 py-3 rounded-md">
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Location Selector */}
              <div className="hidden md:block">
                <LocationSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
