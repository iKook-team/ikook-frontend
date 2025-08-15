"use client";

import React, { useState, useRef, KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/ui/otp-input";
import { ProgressBar } from "@/components/ui/progress-bar";

interface OTPVerificationProps {
  isSubmitting: boolean;
  onSubmit: (data: { otp: string }) => void;
  userType?: "host" | "chef";
  email?: string;
  _otp?: string; // Prefix with underscore since it's not used
  headerText?: string; // Optional override for top header text (keeps signup defaults)
  subtitleText?: string; // Optional override for subtext above inputs
  onResend?: (email: string) => Promise<void>; // Optional override for resend behavior
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  isSubmitting,
  onSubmit,
  userType,
  email,
  headerText,
  subtitleText,
  onResend,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOTPChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];

    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      if (!email) {
        // Show error if email is missing
        if (typeof window !== "undefined") {
          // Only show toast in browser
          const { showToast } = await import("@/lib/utils/toast");

          showToast.error(
            "Email not found. Please go back and re-enter your email.",
          );
        }
        setIsResending(false);

        return;
      }
      const { showToast } = await import("@/lib/utils/toast");

      if (onResend) {
        await onResend(email);
      } else {
        await (await import("@/lib/api/auth")).authService.sendOtp(email);
      }
      showToast.success("Verification code resent to your email.");
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      const { handleApiError } = await import("@/lib/utils/toast");

      handleApiError(
        error,
        "Failed to resend verification code. Please try again.",
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otpValues.join("");

    if (otpCode.length === 6) {
      onSubmit({ otp: otpCode });
    }
  };

  const isOTPComplete = otpValues.every((value) => value !== "");

  return (
    <div className="mx-auto my-0 flex w-[603px] h-[786px] flex-col items-start justify-center gap-1.5 p-5 max-md:w-full max-md:max-w-[603px] max-md:p-[15px] max-sm:w-full max-sm:p-2.5">
      <header className="mb-1.5 h-[30px] w-full font-medium leading-[30px] text-black text-xl max-sm:text-base">
        {headerText ?? (
          <>Join iKook as a {userType === "host" ? "Host" : "Chef"}</>
        )}
      </header>

      <main className="relative h-[750px] w-[605px] rounded-[15px] border border-solid border-[#E7E7E7] bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] max-md:w-full max-md:max-w-[605px] max-sm:h-auto max-sm:min-h-[650px] max-sm:w-full max-sm:pb-5">
        <div className="absolute top-[27px] left-0 w-full px-0">
          <ProgressBar progress={48} />
        </div>

        <h1 className="absolute top-[51px] left-[49px] h-[29px] w-[275px] font-medium text-black text-[19px] max-sm:text-sm">
          OTP Verification
        </h1>

        <form
          className="absolute top-[104px] left-[49px] w-[508px] max-md:left-8 max-md:w-[calc(100%_-_64px)] max-sm:left-6 max-sm:top-[90px] max-sm:w-[calc(100%_-_48px)]"
          onSubmit={handleSubmit}
        >
          <p className="mb-4 text-sm text-gray-600">
            {subtitleText ??
              "Enter the 6-digit code sent to your phone number."}
          </p>

          <div className="mb-6 flex justify-center gap-2">
            {otpValues.map((value, index) => (
              <OTPInput
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={value}
                onChange={(value) => handleOTPChange(index, value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the code?
            </p>
            <Button
              disabled={isResending}
              type="button"
              variant="ghost"
              onClick={handleResendCode}
            >
              {isResending ? "Resending..." : "Resend Code"}
            </Button>
          </div>

          <div className="mt-80">
            <Button
              className="w-full"
              disabled={!isOTPComplete || isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Verifying..." : "Verify & Continue"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
