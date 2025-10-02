"use client";

import React, { useState, useRef, KeyboardEvent, useEffect } from "react";

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

  // Global paste handler to improve reliability across browsers
  useEffect(() => {
    const onDocPaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
      if (!pasted) return;

      // Determine start index based on focused element
      const active = document.activeElement as HTMLInputElement | null;
      const idx = inputRefs.current.findIndex((el) => el === active);
      const startIndex = idx >= 0 ? idx : 0;

      const chars = pasted.slice(0, 6).split("");
      const newValues = [...otpValues];
      let i = startIndex;
      for (const ch of chars) {
        if (i > 5) break;
        newValues[i] = ch;
        i += 1;
      }
      setOtpValues(newValues);

      const nextEmpty = newValues.findIndex((v) => v === "");
      if (nextEmpty === -1) {
        const code = newValues.join("");
        if (code.length === 6) onSubmit({ otp: code });
      } else {
        inputRefs.current[nextEmpty]?.focus();
      }

      // Prevent other handlers from interfering
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("paste", onDocPaste as any, true);
    return () => document.removeEventListener("paste", onDocPaste as any, true);
  }, [otpValues, onSubmit]);

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

  const handlePaste = (startIndex: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const chars = pasted.slice(0, 6).split("");
    const newValues = [...otpValues];
    let i = startIndex;
    for (const ch of chars) {
      if (i > 5) break;
      newValues[i] = ch;
      i += 1;
    }
    setOtpValues(newValues);

    // Focus next empty field or submit if complete
    const nextEmpty = newValues.findIndex((v) => v === "");
    if (nextEmpty === -1) {
      // All filled, attempt submit
      const code = newValues.join("");
      if (code.length === 6) {
        onSubmit({ otp: code });
      }
    } else {
      inputRefs.current[nextEmpty]?.focus();
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
    <div className="mx-auto my-0 flex w-[603px] h-[786px] flex-col items-start justify-center gap-1.5 p-5 max-lg:w-full max-lg:max-w-[603px] max-lg:px-4 max-md:px-3 max-sm:px-2">
      <header className="mb-1.5 h-[30px] w-full font-medium leading-[30px] text-black text-xl max-sm:text-base">
        {headerText ?? (
          <>Join iKook as a {userType === "host" ? "Host" : "Chef"}</>
        )}
      </header>

      <main className="w-[605px] rounded-[15px] border border-solid border-[#E7E7E7] bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] max-lg:w-full max-lg:max-w-[605px] max-sm:rounded-[10px]">
        <div className="pt-[27px] w-full">
          <ProgressBar progress={48} />
        </div>

        <div className="px-[49px] pt-6 pb-8 max-md:px-6 max-sm:px-4">
          <h1 className="text-[19px] font-medium text-black mb-6 max-sm:text-[17px]">
            OTP Verification
          </h1>

          <form onSubmit={handleSubmit} autoComplete="one-time-code">
            <p className="mb-4 text-sm text-gray-600">
              {subtitleText ??
                "Enter the 6-digit code sent to your email address."}
            </p>

            <div
              className="mb-6 flex justify-center gap-2"
              onPaste={(e) => {
                // Delegate container-level paste to the currently focused input index
                const active = document.activeElement as HTMLInputElement | null;
                const idx = inputRefs.current.findIndex((el) => el === active);
                const startIndex = idx >= 0 ? idx : 0;
                handlePaste(startIndex)(e as unknown as React.ClipboardEvent<HTMLInputElement>);
              }}
            >
              {otpValues.map((value, index) => (
                <OTPInput
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  value={value}
                  onChange={(value) => handleOTPChange(index, value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste(index)}
                  onBulkChange={(digits) => {
                    // Distribute a bulk value (e.g., OS autofill) starting at current index
                    const chars = digits.replace(/\D/g, "").slice(0, 6).split("");
                    const newValues = [...otpValues];
                    let i = index;
                    for (const ch of chars) {
                      if (i > 5) break;
                      newValues[i] = ch;
                      i += 1;
                    }
                    setOtpValues(newValues);

                    const nextEmpty = newValues.findIndex((v) => v === "");
                    if (nextEmpty === -1) {
                      const code = newValues.join("");
                      if (code.length === 6) onSubmit({ otp: code });
                    } else {
                      inputRefs.current[nextEmpty]?.focus();
                    }
                  }}
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

            <div className="mt-8">
              <Button
                className="w-full"
                disabled={!isOTPComplete || isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Verifying..." : "Verify & Continue"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
