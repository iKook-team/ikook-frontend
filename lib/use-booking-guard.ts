import { useRouter } from "next/navigation";

import { saveBookingIntent, type BookingIntent } from "./booking-intent";

import { useAuthStore } from "@/lib/store/auth-store";

export interface UseBookingGuardOptions {
  redirectTo?: string;
  onUnauthenticated?: () => void;
}

export function useBookingGuard(options: UseBookingGuardOptions = {}) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { redirectTo = "/login", onUnauthenticated } = options;

  const guardBookingAction = (
    intent: Omit<BookingIntent, "timestamp">,
    action: () => void | Promise<void>,
  ) => {
    if (isAuthenticated) {
      // User is authenticated, proceed with booking action
      return action();
    }

    // User is not authenticated, save intent and redirect to login
    saveBookingIntent(intent);

    if (onUnauthenticated) {
      onUnauthenticated();
    } else {
      // Construct login URL with return path
      const returnUrl = encodeURIComponent(intent.returnUrl);
      const loginUrl = `${redirectTo}?next=${returnUrl}`;

      router.push(loginUrl);
    }
  };

  return {
    isAuthenticated,
    guardBookingAction,
  };
}
