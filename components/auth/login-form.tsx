"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<"host" | "chef">("host");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // In a real app, you would validate the form and submit to your API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSignup = () => {
    router.push("/join");
  };

  return (
    <section className="w-[603px] h-[786px] absolute left-[419px] top-[193px] max-md:w-[90%] max-md:max-w-[500px] max-md:-translate-x-2/4 max-md:left-2/4 max-md:top-[120px] max-sm:w-[95%] max-sm:top-[100px]">
      <h1 className="text-black text-xl font-normal leading-[30px] absolute w-[219px] h-[30px] left-0 top-0 max-sm:text-lg max-sm:text-center max-sm:w-full max-sm:left-0">
        Login to your account
      </h1>

      <div className="flex w-[605px] h-[750px] flex-col items-center border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] absolute bg-white pl-[49px] pr-12 pt-[41px] pb-[671px] rounded-[15px] border-solid border-[#E7E7E7] left-0 top-9 max-md:w-full max-md:h-auto max-md:px-6 max-md:py-8 max-sm:px-4 max-sm:py-6 max-sm:rounded-xl">
        {/* User Type Toggle */}
        <div className="w-[508px] h-[38px] absolute left-[49px] top-[41px] max-md:w-full max-md:relative max-md:mb-8 max-md:left-0 max-md:top-0 max-sm:mb-6">
          <div className="w-[509px] h-[38px] absolute bg-[#CFCFCE] rounded-[4.547px] left-0 top-0 max-md:w-full" />

          <button
            type="button"
            onClick={() => setUserType("host")}
            className={`w-[235px] h-[30px] absolute left-[5px] top-1 rounded-sm transition-all ${
              userType === "host"
                ? "shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)] bg-[#FCC01C]"
                : "bg-transparent"
            }`}
            aria-pressed={userType === "host"}
          >
            <span
              className={`text-xs font-normal leading-[11px] ${
                userType === "host" ? "text-white" : "text-[#020101]"
              }`}
            >
              Host
            </span>
          </button>

          <button
            type="button"
            onClick={() => setUserType("chef")}
            className={`absolute right-[5px] top-1 w-[235px] h-[30px] rounded-sm transition-all ${
              userType === "chef"
                ? "shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)] bg-[#FCC01C]"
                : "bg-transparent"
            }`}
            aria-pressed={userType === "chef"}
          >
            <span
              className={`text-xs font-normal leading-[11px] ${
                userType === "chef" ? "text-white" : "text-[#020101]"
              }`}
            >
              Chef
            </span>
          </button>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-[508px] flex-col items-start gap-4 absolute h-[211px] left-[49px] top-[185px] max-md:w-full max-md:relative max-md:mb-6 max-md:left-0 max-md:top-0 max-sm:gap-3 max-sm:mb-5"
        >
          <div className="flex flex-col items-start gap-8 max-sm:gap-6 w-full">
            {/* Email/Phone Field */}
            <div className="flex w-full flex-col items-start">
              <div className="flex flex-col items-start gap-1.5 w-full">
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <label
                    htmlFor="email"
                    className="text-[#344054] text-sm font-normal leading-5"
                  >
                    Email/Phone
                  </label>
                  <div className="flex items-center gap-2 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] focus-within:border-[#FCC01C]">
                    <input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address or phone number"
                      className="flex-1 text-[#6F6E6D] text-base font-normal leading-6 bg-transparent border-none outline-none placeholder:text-[#6F6E6D] focus:text-black"
                      required
                      aria-describedby="email-help"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex w-full flex-col items-start">
              <div className="flex flex-col items-start gap-1.5 w-full">
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <label
                    htmlFor="password"
                    className="text-[#344054] text-sm font-normal leading-5"
                  >
                    Password
                  </label>
                  <div className="flex items-center gap-2 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white px-3.5 py-2.5 rounded-lg border-solid border-[#CFCFCE] focus-within:border-[#FCC01C]">
                    <input
                      className="flex-1 text-[#6F6E6D] text-base font-normal leading-6 bg-transparent border-none outline-none placeholder:text-[#6F6E6D] focus:text-black"
                      id="password"
                      minLength={6}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#6F6E6D] hover:text-[#FCC01C] transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-[#3F3E3D] text-[15px] font-normal hover:text-[#FCC01C] transition-colors"
          >
            Forgot password?
          </button>
        </form>

        {/* Submit Button and Signup Link */}
        <div className="flex w-[508px] flex-col items-center gap-4 absolute h-[87px] left-12 top-[478px] max-md:w-full max-md:relative max-md:left-0 max-md:top-0">
          <button
            className="text-white text-base font-bold leading-6 gap-2 w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-[#FCC01C] px-[113px] py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#e6ac19] transition-colors max-sm:px-5 max-sm:py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            form="login-form"
            onClick={handleSubmit}
            type="submit"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          
          {error && (
            <div className="w-full text-red-500 text-sm text-center mt-2">
              {error}
            </div>
          )}

          <div className="w-full text-black text-center text-[15px] font-normal max-sm:text-sm">
            <span>Don&apos;t have account, </span>
            <button
              type="button"
              onClick={handleSignup}
              className="text-[#FCC01C] hover:underline"
            >
              signup
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
