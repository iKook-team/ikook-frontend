"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { OTPVerification } from "@/components/auth/otp-verification";
import { authService } from "@/lib/api/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

type Step = 1 | 2 | 3;

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>(1);
  const [email, setEmail] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const goToLogin = () => router.push("/login");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await authService.forgotPassword(email);
      showToast.success("Verification code sent to your email.");
      setStep(2);
    } catch (error) {
      handleApiError(
        error,
        "Failed to send verification code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async ({ otp }: { otp: string }) => {
    if (!otp || otp.length !== 6) return;
    setIsSubmitting(true);
    try {
      await authService.verifyOtp(email, otp);
      showToast.success("Code verified. Please set a new password.");
      setStep(3);
    } catch (error) {
      handleApiError(error, "Invalid code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) return;
    if (newPassword !== confirmPassword) return;
    setIsSubmitting(true);
    try {
      await authService.resetPassword({ email, password: newPassword });
      showToast.success("Password reset successfully. Please login.");
      goToLogin();
    } catch (error) {
      handleApiError(error, "Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB]">
      <main className="relative flex items-center justify-center py-10">
        {step === 1 && (
          <section className="w-[603px] max-w-full">
            <header className="mb-2 text-black text-xl font-medium leading-[30px]">
              Forgot Password
            </header>
            <div className="w-full border rounded-[15px] border-[#E7E7E7] bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] p-8">
              <p className="text-sm text-gray-600 mb-6">
                Enter your email to receive a verification code to reset your
                password.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-[#344054] text-sm leading-5"
                  >
                    Email
                  </label>
                  <div className="flex items-center gap-2 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] focus-within:border-[#FCC01C]">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 text-[#6F6E6D] text-base leading-6 bg-transparent border-none outline-none placeholder:text-[#6F6E6D] focus:text-black"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white text-base font-bold leading-6 gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-[#FCC01C] px-[113px] py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#e6ac19] transition-colors"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={goToLogin}
                  className="w-full text-center text-[#3F3E3D] text-[15px] font-normal hover:text-[#FCC01C] transition-colors"
                >
                  Back to login
                </button>
              </form>
            </div>
          </section>
        )}

        {step === 2 && (
          <OTPVerification
            isSubmitting={isSubmitting}
            onSubmit={handleOtpSubmit}
            email={email}
            headerText="Reset your password"
            subtitleText="Enter the 6-digit code sent to your email address."
            onResend={(em) => authService.forgotPassword(em)}
          />
        )}

        {step === 3 && (
          <section className="w-[603px] max-w-full">
            <header className="mb-2 text-black text-xl font-medium leading-[30px]">
              Set a new password
            </header>
            <div className="w-full border rounded-[15px] border-[#E7E7E7] bg-white shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] p-8">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="new-password"
                    className="text-[#344054] text-sm leading-5"
                  >
                    New password
                  </label>
                  <div className="flex items-center gap-2 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] focus-within:border-[#FCC01C]">
                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="flex-1 text-[#6F6E6D] text-base leading-6 bg-transparent border-none outline-none placeholder:text-[#6F6E6D] focus:text-black"
                      minLength={6}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="text-[#6F6E6D] hover:text-[#FCC01C] transition-colors"
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="text-[#344054] text-sm leading-5"
                  >
                    Confirm new password
                  </label>
                  <div className="flex items-center gap-2 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] focus-within:border-[#FCC01C]">
                    <input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="flex-1 text-[#6F6E6D] text-base leading-6 bg-transparent border-none outline-none placeholder:text-[#6F6E6D] focus:text-black"
                      minLength={6}
                      required
                    />
                  </div>
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="text-sm text-red-500 mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !newPassword ||
                    newPassword !== confirmPassword
                  }
                  className="w-full text-white text-base font-bold leading-6 gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-[#FCC01C] px-[113px] py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#e6ac19] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save new password"}
                </button>
                <button
                  type="button"
                  onClick={goToLogin}
                  className="w-full text-center text-[#3F3E3D] text-[15px] font-normal hover:text-[#FCC01C] transition-colors"
                >
                  Back to login
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
