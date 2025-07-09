"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { OTPVerification } from "@/components/auth/otp-verification";

const EmailVerificationPage: React.FC = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: { otp: string }) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would verify the OTP with your API here
      console.log('Verifying OTP:', data.otp);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard after successful verification
      router.push("/dashboard");
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <OTPVerification isSubmitting={isSubmitting} onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default EmailVerificationPage;
