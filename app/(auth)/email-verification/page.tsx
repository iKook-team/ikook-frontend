"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { OTPVerification } from "@/components/auth/otp-verification";

const EmailVerificationPage: React.FC = () => {
  const router = useRouter();

  const handleVerificationSuccess = () => {
    // In a real app, you might want to update the user's verification status in your state management
    // Navigate to dashboard after successful verification
    router.push("/dashboard");
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <OTPVerification onVerificationSuccess={handleVerificationSuccess} />
      </main>
    </div>
  );
};

export default EmailVerificationPage;
