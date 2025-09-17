"use client";

import React, { useState, useEffect } from "react";

import { Toggle } from "@/components/ui/toggle";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";
import BackButton from "@/components/common/BackButton";

const NotificationSettings: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [emailNotification, setEmailNotification] = useState<boolean>(true);
  const [smsNotification, setSmsNotification] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load current notification preferences when component mounts
  useEffect(() => {
    if (user) {
      setEmailNotification(
        user.email_notify !== undefined ? user.email_notify : true,
      );
      setSmsNotification(
        user.sms_notify !== undefined ? user.sms_notify : true,
      );
    }
  }, [user]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      showToast.error("You must be logged in to update notification settings");

      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("email_notify", String(emailNotification));
      formData.append("sms_notify", String(smsNotification));

      // Update only the notification preferences
      const updatedUser = await authService.updateProfile(
        user.id,
        formData,
        user.user_type === "Chef",
      );

      // Update the user in the store
      setUser({
        ...user,
        email_notify: emailNotification,
        sms_notify: smsNotification,
      });

      showToast.success("Notification preferences updated successfully");
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      handleApiError(error, "Failed to update notification preferences");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <BackButton fallback="/settings" />
        </div>
        
        <h1 className="text-2xl font-semibold text-black mb-8 sm:mb-12">
          Notification
        </h1>

        <form
          onSubmit={handleSaveChanges}
          className="w-full max-w-[654px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] bg-white rounded-[15px] border-solid border-[#E7E7E7] mx-auto"
        >
          <div className="pt-6 sm:pt-8 pb-0 px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 sm:py-4">
              <label
                htmlFor="email-notification"
                className="text-[#020101] text-sm sm:text-base font-normal cursor-pointer"
              >
                Email notification
              </label>
              <Toggle
                checked={emailNotification}
                onChange={() => setEmailNotification(!emailNotification)}
              />
            </div>

            <div className="flex items-center justify-between py-3 sm:py-4">
              <label
                htmlFor="sms-notification"
                className="text-[#020101] text-sm sm:text-base font-normal cursor-pointer"
              >
                SMS notification
              </label>
              <Toggle
                checked={smsNotification}
                onChange={() => setSmsNotification(!smsNotification)}
              />
            </div>
          </div>

          <div className="bg-white px-4 sm:px-8 py-6 sm:py-8 rounded-b-[15px] border-t border-solid border-[#E7E7E7] flex justify-center">
            <button
              type="submit"
              className="w-full max-w-[422px] flex justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-[#FCC01C] px-6 py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#E6AC19] transition-colors"
              disabled={isLoading}
            >
              <span className="text-white text-base font-semibold">
                {isLoading ? 'Saving...' : 'Save changes'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const NotificationPage = () => <NotificationSettings />;

export default NotificationPage;
