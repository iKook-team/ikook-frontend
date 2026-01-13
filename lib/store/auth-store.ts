import { create } from "zustand";

import { clearToken, isAuthenticated } from "@/src/lib/auth";

type UserType = "host" | "chef" | null;

interface User {
  id: number;
  email: string;
  user_type: "Host" | "Chef";
  username: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  access_token: string;
  refresh_token: string;
  avatar?: string;
  bio?: string;
  date_of_birth?: string;
  document_verified?: boolean;
  identity_verified?: boolean;
  culinary_certificate?: string | null;
  currency?: string;
  country?: string;
  email_notify?: boolean;
  sms_notify?: boolean;
  bank_details?: number;
  // Serviceable distance fields (chef specific)
  serviceable_location?: string;
  serviceable_radius?: number;
  extra_km?: number;
  extra_km_charge?: string;
}

interface HostFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  referralCode?: string;
  countryCode?: string;
  city: string;
}

interface ChefFormData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  serviceType?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  workAuthorization?: string;
  criminalRecord?: string;
  instagramAccount?: string;
  website?: string;
  briefProfile?: string;
  eventTypes?: string[];
  cuisineTypes?: string[];
  // Serviceable distance fields
  serviceable_location?: string;
  serviceable_radius?: number;
  extra_km?: number;
  extra_km_charge?: string;
}

interface AuthState {
  userType: UserType;
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  hostFormData: HostFormData | null;
  chefFormData: ChefFormData | null;
  bookingMenu: any | null;
  bookingMenuSelection: any | null;
  bookingSelectedAddons: number[] | null;
  booking: any | null;
  bookingService: any | null;
  setBooking: (booking: any) => void;
  setUserType: (type: UserType) => void;
  setUser: (user: User) => void;
  logout: () => void;
  initializeAuth: () => void;
  setHostFormData: (data: HostFormData) => void;
  setChefFormData: (data: ChefFormData) => void;
  clearUserType: () => void;
  clearHostFormData: () => void;
  clearChefFormData: () => void;
  setBookingMenu: (menu: any) => void;
  setBookingMenuSelection: (selection: any) => void;
  setBookingSelectedAddons: (addons: number[]) => void;
  setBookingService: (service: any) => void;
}

// Helper function to save user data to localStorage
const saveUserToStorage = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("ikook_user_data", JSON.stringify(user));
  }
};

// Helper function to get user data from localStorage
const getUserFromStorage = (): User | null => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("ikook_user_data");

    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        // Error handling without console.error in production
        return null;
      }
    }
  }

  return null;
};

// Helper function to clear user data from localStorage
const clearUserFromStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ikook_user_data");
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  userType: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  hostFormData: null,
  chefFormData: null,
  bookingMenu: null,
  bookingMenuSelection: null,
  bookingSelectedAddons: (() => {
    // Initialize from localStorage
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ikook_booking_selected_addons");
        const parsed = saved ? JSON.parse(saved) : null;

        console.log(
          "🏪 Store initialized bookingSelectedAddons from localStorage:",
          parsed,
        );

        return parsed;
      } catch (error) {
        console.warn(
          "Failed to load selected addons from localStorage:",
          error,
        );

        return null;
      }
    }

    return null;
  })(),
  booking: null,
  bookingService: null,
  setBooking: (booking) => {
    set({ booking });
  },
  setUserType: (type) => {
    set({ userType: type });
  },
  setUser: (user) => {
    // Debug logging removed
    // Save user data to localStorage for persistence
    saveUserToStorage(user);
    set({
      user,
      isAuthenticated: true,
      userType: user.user_type === "Host" ? "host" : "chef",
    });
    // Debug logging removed
  },
  logout: () => {
    clearToken();
    clearUserFromStorage();
    // Clear booking data from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("ikook_booking_selected_addons");
    }
    set({ user: null, isAuthenticated: false, userType: null });
  },
  initializeAuth: () => {
    // Debug logging removed
    // Check if user has existing tokens
    const hasToken = isAuthenticated();
    // Debug logging removed

    if (hasToken) {
      // Try to get user data from localStorage first
      const userData = getUserFromStorage();
      // Debug logging removed

      if (userData) {
        // We have both token and user data, restore the session
        set({
          user: userData,
          isAuthenticated: true,
          userType: userData.user_type === "Host" ? "host" : "chef",
          isInitialized: true,
        });
        // Debug logging removed

        // Skip token validation for now to avoid 500 errors
        // The token will be validated on the next API call that requires it
        // Debug logging removed
      } else {
        // We have token but no user data, set basic authenticated state
        set({
          isAuthenticated: true,
          isInitialized: true,
        });
        // Debug logging removed
      }
    } else {
      // No token, clear everything
      clearUserFromStorage();
      set({
        user: null,
        isAuthenticated: false,
        userType: null,
        isInitialized: true,
      });
      // Debug logging removed
    }
    // Debug logging removed
  },
  setHostFormData: (data) => {
    set({ hostFormData: data });
  },
  setChefFormData: (data) => {
    set({ chefFormData: data });
  },
  clearUserType: () => {
    set({ userType: null });
  },
  clearHostFormData: () => {
    set({ hostFormData: null });
  },
  clearChefFormData: () => {
    set({ chefFormData: null });
  },
  setBookingMenu: (menu) => {
    set({ bookingMenu: menu });
  },
  setBookingMenuSelection: (selection) => {
    set({ bookingMenuSelection: selection });
  },
  setBookingSelectedAddons: (addons) => {
    console.log("🏪 Store setBookingSelectedAddons called with:", addons);
    console.log(
      "🏪 Store setBookingSelectedAddons types:",
      addons.map((id) => ({ id, type: typeof id })),
    );
    set({ bookingSelectedAddons: addons });
    // Persist to localStorage for cross-session persistence
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "ikook_booking_selected_addons",
          JSON.stringify(addons),
        );
        console.log("💾 Saved to localStorage:", addons);
        // Verify what was actually saved
        const saved = localStorage.getItem("ikook_booking_selected_addons");

        console.log("💾 Verified localStorage content:", saved);
      } catch (error) {
        console.warn("Failed to save selected addons to localStorage:", error);
      }
    }
  },
  setBookingService: (service) => {
    set({ bookingService: service });
  },
}));
