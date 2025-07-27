"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "../ui/button";

import { UserMenu } from "./user-menu";

import { useAuthStore } from "@/lib/store/auth-store";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="bg-white px-4 lg:px-24 py-6 relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <svg
              width="116"
              height="41"
              viewBox="0 0 116 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-auto"
            >
              <circle
                cx="48.6192"
                cy="29.3701"
                r="9.91426"
                stroke="#FCC01C"
                strokeWidth="3.05054"
              />
              <path
                d="M29.8086 27.8448L37.5197 28.438V31.4038L29.8086 31.9122V27.8448Z"
                fill="#FCC01C"
              />
              <path
                d="M43.4494 5.89789C42.5738 6.94298 41.3479 9.60938 43.4494 11.9142C43.7036 12.3379 45.5678 14.2021 43.0257 16.9985"
                stroke="#FCC01C"
                strokeWidth="2.03369"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M48.8478 2C47.9722 3.04509 46.7464 5.71149 48.8478 8.01634C49.102 8.44003 50.9663 10.3042 48.4242 13.1006"
                stroke="#FCC01C"
                strokeWidth="2.03369"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M54.7814 5.89789C53.9058 6.94298 52.6799 9.60938 54.7814 11.9142C55.0356 12.3379 56.8999 14.2021 54.3577 16.9985"
                stroke="#FCC01C"
                strokeWidth="2.03369"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="76.6466"
                cy="29.3701"
                r="9.91426"
                stroke="#FCC01C"
                strokeWidth="3.05054"
              />
              <path
                d="M0.667969 21.0182C1.37976 19.1498 2.89232 18.7568 3.55963 18.7939V39.9252H0.667969V21.0182Z"
                fill="#FCC01C"
              />
              <path
                d="M12.1211 39.9252V11.8984H15.2352V25.1333L28.5813 11.8984H32.5851L15.2352 28.8035V39.9252H12.1211Z"
                fill="#FCC01C"
              />
              <path
                d="M28.8037 40.1477L17.2371 28.8035C18.4827 28.2696 20.6478 28.581 21.5746 28.8035L32.9188 40.1477H28.8037Z"
                fill="#FCC01C"
              />
              <path
                d="M95.2031 39.814V11.7871H98.3172V25.022L111.663 11.7871H115.667L98.3172 28.6922V39.814H95.2031Z"
                fill="#FCC01C"
              />
              <path
                d="M111.886 40.0364L100.319 28.6922C101.565 28.1583 103.73 28.4698 104.657 28.6922L116.001 40.0364H111.886Z"
                fill="#FCC01C"
              />
              <circle cx="2.22435" cy="13.1218" r="2.22435" fill="#FCC01C" />
            </svg>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link
            href="/menu"
            className="text-[#323335] hover:text-[#FCC01C] transition-colors font-medium"
          >
            Explore Set Menu
          </Link>
          <Link
            href="/how-it-works"
            className="text-[#323335] hover:text-[#FCC01C] transition-colors font-medium"
          >
            How it Works
          </Link>
          <div className="flex items-center space-x-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 3.75C2.5 3.05965 3.05965 2.5 3.75 2.5H10H16.25C16.9404 2.5 17.5 3.05965 17.5 3.75V10V16.25C17.5 16.9404 16.9404 17.5 16.25 17.5H10H3.75C3.05965 17.5 2.5 16.9404 2.5 16.25V10V3.75Z"
                fill="#FCC01C"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M1.66797 10H18.3346H1.66797Z" fill="#FCC01C" />
              <path
                d="M1.66797 10H18.3346"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10 18.3334V1.66669V18.3334Z" fill="#FCC01C" />
              <path
                d="M10 18.3334V1.66669"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Link
              href="/gift"
              className="text-[#323335] hover:text-[#FCC01C] transition-colors font-medium"
            >
              Gift
            </Link>
          </div>
          <Link
            href="/join-chef"
            className="text-[#323335] hover:text-[#FCC01C] transition-colors font-medium"
          >
            Join as Chef
          </Link>
        </div>

        {/* Language and Sign In */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <div className="w-6 h-6 rounded-full border border-[#323335] overflow-hidden">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_7416_37097)">
                  <path
                    d="M16.5 2.26875C14.8844 1.27187 13.0281 0.6875 11 0.6875V2.26875H16.5Z"
                    fill="#ED4C5C"
                  />
                  <path
                    d="M11 3.84999H18.425C17.8406 3.26561 17.1875 2.71561 16.5 2.26874H11V3.84999Z"
                    fill="white"
                  />
                  <path
                    d="M11 5.43129H19.6969C19.3187 4.84691 18.9063 4.33129 18.4594 3.85004H11V5.43129Z"
                    fill="#ED4C5C"
                  />
                </g>
              </svg>
            </div>
            <span className="text-[#323335] font-medium">English</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.84861 3.51562H2.15173C1.92087 3.51562 1.79196 3.75938 1.93493 3.92578L5.78337 8.38828C5.89353 8.51602 6.10564 8.51602 6.21696 8.38828L10.0654 3.92578C10.2084 3.75938 10.0795 3.51562 9.84861 3.51562Z"
                fill="#323335"
              />
            </svg>
          </div>

          {/* User Menu or Sign In Button */}
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Link href="/login">
              <Button className="bg-[#FCC01C] hover:bg-[#FCC01C]/90 text-white font-semibold px-8 py-3 rounded-sm">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21"
                stroke="#323335"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="#323335"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 18H21"
                stroke="#323335"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link
                href="/menu"
                className="text-[#323335] hover:text-[#FCC01C] transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore Set Menu
              </Link>
              <Link
                href="/how-it-works"
                className="text-[#323335] hover:text-[#FCC01C] transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link
                href="/gift"
                className="text-[#323335] hover:text-[#FCC01C] transition-colors font-medium py-2 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 3.75C2.5 3.05965 3.05965 2.5 3.75 2.5H10H16.25C16.9404 2.5 17.5 3.05965 17.5 3.75V10V16.25C17.5 16.9404 16.9404 17.5 16.25 17.5H10H3.75C3.05965 17.5 2.5 16.9404 2.5 16.25V10V3.75Z"
                    fill="#FCC01C"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Gift</span>
              </Link>
              <Link
                href="/join-chef"
                className="text-[#323335] hover:text-[#FCC01C] transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join as Chef
              </Link>

              {/* Show login/signup in mobile menu for non-authenticated users */}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-200 mt-2">
                  <Link href="/login">
                    <Button className="w-full bg-[#FCC01C] hover:bg-[#FCC01C]/90 text-white font-semibold py-3 rounded-sm">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
