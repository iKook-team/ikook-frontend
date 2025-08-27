"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "@/lib/store/auth-store";
import { MarketProvider } from "@/lib/market-context";
import { useBookingResume } from "@/lib/booking-resume";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

// Auth initialization component
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { initializeAuth, isInitialized } = useAuthStore();

  // Debug logging removed

  React.useEffect(() => {
    // Debug logging removed
    // Initialize authentication state from localStorage
    initializeAuth();
  }, []); // Remove dependency to ensure it only runs once

  if (!isInitialized) {
    // Debug logging removed
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Debug logging removed
  return <>{children}</>;
}

function BookingResumeHandler({ children }: { children?: React.ReactNode }) {
  useBookingResume();
  return <>{children}</>;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <MarketProvider>
          <AuthInitializer>
            <BookingResumeHandler>
              {children}
            </BookingResumeHandler>
          </AuthInitializer>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </MarketProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
