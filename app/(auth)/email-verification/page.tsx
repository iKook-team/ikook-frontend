"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { OTPVerification } from "@/components/auth/otp-verification";
import { useAuthStore } from "@/lib/store/auth-store";

const EmailVerificationPage: React.FC = () => {
  const router = useRouter();
  const { userType: rawUserType } = useAuthStore();
  const userType =
    rawUserType === "host" || rawUserType === "chef" ? rawUserType : undefined;
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (_data: { otp: string }) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would verify the OTP with your API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Always redirect back to the signup page with verified=true
      // The signup page will handle showing the appropriate form
      router.push(`/host-signup?verified=true`);
    } catch {
      // Error handling would go here in a real app
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
