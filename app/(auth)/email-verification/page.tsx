"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { OTPVerification } from "@/components/auth/otp-verification";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

const EmailVerificationPage: React.FC = () => {
  const router = useRouter();
  const { userType: rawUserType, hostFormData, chefFormData } = useAuthStore();
  const userType =
    rawUserType === "host" || rawUserType === "chef" ? rawUserType : undefined;
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: { otp: string }) => {
    setIsSubmitting(true);
    try {
      // Verify OTP using the real API
      const email = hostFormData?.email || chefFormData?.email;
      if (!email) {
        throw new Error("Email not found in form data");
      }

      await authService.verifyOtp(email, data.otp);

      // Show success toast
      showToast.success("Email verified successfully!");

      // Redirect back to the appropriate signup page with verified=true
      if (userType === "host") {
        router.push(`/host-signup?verified=true`);
      } else if (userType === "chef") {
        router.push(`/chef-signup?verified=true`);
      }
    } catch (error) {
      handleApiError(error, "Invalid verification code. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <OTPVerification
          userType={userType}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default EmailVerificationPage;
