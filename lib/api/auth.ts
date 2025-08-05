import apiClient from "@/src/lib/axios";
import { getRefreshToken } from "@/src/lib/auth";

type VerifyAction = "send_token" | "verify_token";

interface BaseVerifyPayload {
  action: VerifyAction;
  email: string;
}

interface SendOtpPayload extends BaseVerifyPayload {
  action: "send_token";
}

interface VerifyOtpPayload extends BaseVerifyPayload {
  action: "verify_token";
  otp: string;
}

type VerifyEmailPayload = SendOtpPayload | VerifyOtpPayload;

interface LoginPayload {
  email: string;
  password: string;
  user_type: "Host" | "Chef";
}

export const authService = {
  // Send or verify OTP
  verifyEmail: async (data: VerifyEmailPayload) => {
    const response = await apiClient.post(`/users/auth/verify/`, data);

    return response.data;
  },

  // Send OTP to email
  sendOtp: async (email: string): Promise<boolean> => {
    try {
      await authService.verifyEmail({
        action: "send_token",
        email,
      });

      return true;
    } catch (error) {
      throw error;
    }
  },

  // Verify OTP
  verifyOtp: async (email: string, otp: string): Promise<boolean> => {
    try {
      await authService.verifyEmail({
        action: "verify_token",
        email,
        otp,
      });

      return true;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (data: LoginPayload) => {
    const response = await apiClient.post(`/users/auth/login/`, data);

    return response.data;
  },

  // Validate token and get user data
  validateToken: async () => {
    const token = localStorage.getItem("ikook_auth_token");

    if (!token) {
      throw new Error("No token found");
    }

    try {
      const response = await apiClient.get(`/users/profiles/`, {
        params: {
          user_type: "Host", // This will be filtered by the backend
        },
      });

      return {
        success: true,
        message: "Token is valid",
        data: null,
      };
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    const refreshToken = getRefreshToken();
    const accessToken = localStorage.getItem("ikook_auth_token");
    // Debug logging removed

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    try {
      // Debug logging removed
      const response = await apiClient.post(
        `/users/auth/logout/`,
        {},
        {
          headers: {
            refresh_token: refreshToken,
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        },
      );

      // Debug logging removed
      return response.data;
    } catch (error: any) {
      // Debug logging removed
      throw error;
    }
  },

  // Sign up a new user
  signup: async (data: any) => {
    const response = await apiClient.post(`/users/auth/signup/`, data);
    return response.data;
  },

  // Update user profile
  updateProfile: (userId: number, formData: FormData, isChef: boolean) => {
    // Use the same endpoint for both chefs and hosts
    return apiClient.patch(`/users/profiles/${userId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Change user password
  changePassword: async (data: ChangePasswordPayload) => {
    return apiClient.post('/users/auth/change-password/', data);
  },
};

// Change password interface
interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

// Profile update interfaces
export interface BaseProfileUpdatePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string; // Format: "YYYY-MM-DD"
  bio: string; // Maps to briefProfile in the form
  email_notify: boolean;
  sms_notify: boolean;
}

export interface ChefProfileUpdatePayload extends BaseProfileUpdatePayload {
  city: string;
  address: string;
  postal_code: string;
  cuisines: string[]; // Maps to cuisineTypes in the form
  events_available_for: string[]; // Maps to eventTypes in the form
}

export default authService;
