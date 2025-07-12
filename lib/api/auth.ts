import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

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

export const authService = {
  // Send or verify OTP
  verifyEmail: async (data: VerifyEmailPayload) => {
    const response = await axios.post(`${API_URL}/users/auth/verify/`, data);
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
      console.error("Failed to send OTP:", error);
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
      console.error("OTP verification failed:", error);
      throw error;
    }
  },

  // Sign up a new user
  signup: async (data: any) => {
    const response = await axios.post(`${API_URL}/users/auth/signup/`, data);
    return response.data;
  },
};

export default authService;
