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
};

export default authService;
