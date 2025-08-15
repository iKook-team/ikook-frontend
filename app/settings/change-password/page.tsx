"use client";
import React, { useState } from "react";

import { authService } from "@/lib/api/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: keyof PasswordFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await authService.changePassword({
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
      });

      if (response) {
        showToast.success("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      // Use handleApiError for consistent error handling
      if (error?.response?.data) {
        // Special handling for validation errors in the change password form
        const errorData = error.response.data;

        if (errorData.old_password) {
          setErrors((prev) => ({
            ...prev,
            currentPassword: Array.isArray(errorData.old_password)
              ? errorData.old_password[0]
              : errorData.old_password,
          }));
        } else if (errorData.new_password) {
          setErrors((prev) => ({
            ...prev,
            newPassword: Array.isArray(errorData.new_password)
              ? errorData.new_password[0]
              : errorData.new_password,
          }));
        } else {
          // For other error formats, use the standard handleApiError
          handleApiError(error, "Error changing password. Please try again.");
          // Set a generic error for the form
          setErrors((prev) => ({
            ...prev,
            currentPassword:
              "Failed to change password. Please check your current password and try again.",
          }));
        }
      } else {
        // For network errors or other unhandled errors
        handleApiError(error, "Error changing password. Please try again.");
        setErrors((prev) => ({
          ...prev,
          currentPassword: "An unexpected error occurred. Please try again.",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            <section className="flex flex-col">
              <h1 className="text-black text-2xl font-semibold leading-none mt-6">
                Change password
              </h1>

              <div className="border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] flex w-full max-w-4xl flex-col items-stretch bg-white mt-[21px] pt-9 rounded-[15px] border-solid border-[#E7E7E7]">
                <form
                  onSubmit={handleSubmit}
                  className="ml-[17px] mr-[18px] mt-0"
                >
                  <div className="w-full max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                          <label
                            htmlFor="currentPassword"
                            className="text-[#344054] text-sm font-medium leading-none"
                          >
                            Current Password
                          </label>
                          <input
                            id="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleInputChange("currentPassword")}
                            placeholder="Password"
                            className={`items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full ${
                              errors.currentPassword
                                ? "border-red-500 text-red-900"
                                : "border-[#CFCFCE] text-[#6F6E6D]"
                            }`}
                            aria-invalid={!!errors.currentPassword}
                            aria-describedby={
                              errors.currentPassword
                                ? "currentPassword-error"
                                : undefined
                            }
                          />
                          {errors.currentPassword && (
                            <p
                              id="currentPassword-error"
                              className="text-red-500 text-sm mt-1"
                            >
                              {errors.currentPassword}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-6 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                          <label
                            htmlFor="newPassword"
                            className="text-[#344054] text-sm font-medium leading-none"
                          >
                            New Password
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleInputChange("newPassword")}
                            placeholder="Password"
                            className={`items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full ${
                              errors.newPassword
                                ? "border-red-500 text-red-900"
                                : "border-[#CFCFCE] text-[#6F6E6D]"
                            }`}
                            aria-invalid={!!errors.newPassword}
                            aria-describedby={
                              errors.newPassword
                                ? "newPassword-error"
                                : undefined
                            }
                          />
                          {errors.newPassword && (
                            <p
                              id="newPassword-error"
                              className="text-red-500 text-sm mt-1"
                            >
                              {errors.newPassword}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-6 max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                          <label
                            htmlFor="confirmPassword"
                            className="text-[#344054] text-sm font-medium leading-none"
                          >
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange("confirmPassword")}
                            placeholder="Confirm password"
                            className={`items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base font-normal bg-white mt-1.5 px-3.5 py-2.5 rounded-lg border-solid max-md:max-w-full ${
                              errors.confirmPassword
                                ? "border-red-500 text-red-900"
                                : "border-[#CFCFCE] text-[#6F6E6D]"
                            }`}
                            aria-invalid={!!errors.confirmPassword}
                            aria-describedby={
                              errors.confirmPassword
                                ? "confirmPassword-error"
                                : undefined
                            }
                          />
                          {errors.confirmPassword && (
                            <p
                              id="confirmPassword-error"
                              className="text-red-500 text-sm mt-1"
                            >
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="justify-center items-center border flex w-full flex-col overflow-hidden text-base text-white font-semibold bg-white mt-[88px] px-[65px] py-7 rounded-[0px_0px_15px_15px] border-solid border-[#E7E7E7] max-md:max-w-full max-md:mt-10 max-md:px-5">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden px-7 py-3 rounded-lg border-solid max-md:px-5 transition-colors ${
                      isSubmitting
                        ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                        : "bg-[#FCC01C] border-[#FCC01C] hover:bg-[#e6ac19]"
                    }`}
                  >
                    <span className="text-white self-stretch my-auto">
                      {isSubmitting ? "Saving..." : "Save changes"}
                    </span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const ChangePasswordPage = () => <ChangePasswordForm />;

export default ChangePasswordPage;
