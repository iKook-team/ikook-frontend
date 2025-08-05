"use client";

import React, { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

const NotificationSettings: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [emailNotification, setEmailNotification] = useState<boolean>(true);
  const [smsNotification, setSmsNotification] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load current notification preferences when component mounts
  useEffect(() => {
    if (user) {
      setEmailNotification(user.email_notify !== undefined ? user.email_notify : true);
      setSmsNotification(user.sms_notify !== undefined ? user.sms_notify : true);
    }
  }, [user]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast.error('You must be logged in to update notification settings');
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('email_notify', String(emailNotification));
      formData.append('sms_notify', String(smsNotification));
      
      // Update only the notification preferences
      const updatedUser = await authService.updateProfile(
        user.id,
        formData,
        user.user_type === 'Chef'
      );
      
      // Update the user in the store
      setUser({
        ...user,
        email_notify: emailNotification,
        sms_notify: smsNotification
      });
      
      showToast.success('Notification preferences updated successfully');
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      handleApiError(error, 'Failed to update notification preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto my-0 px-12 py-6">
      <div className="w-[655px] relative mx-auto my-0">
        <h1 className="text-black text-2xl font-semibold leading-8 mb-[53px]">
          Notification
        </h1>

        <form
          onSubmit={handleSaveChanges}
          className="w-[654px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] bg-white rounded-[15px] border-solid border-[#E7E7E7]"
        >
          <div className="pt-[34px] pb-0 px-[18px]">
            <div className="flex items-center justify-between mb-6">
              <label
                htmlFor="email-notification"
                className="text-[#020101] text-[15px] font-normal cursor-pointer"
              >
                Email notification
              </label>
              <Toggle
                checked={emailNotification}
                onChange={() => setEmailNotification(!emailNotification)}
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label
                htmlFor="sms-notification"
                className="text-[#020101] text-[15px] font-normal cursor-pointer"
              >
                SMS notification
              </label>
              <Toggle 
                checked={smsNotification} 
                onChange={() => setSmsNotification(!smsNotification)} 
              />
            </div>
          </div>

          <div className="bg-white pl-[127px] pr-[106px] pt-[33px] pb-[23px] rounded-[0px_0px_15px_15px] border-t-[#E7E7E7] border-t border-solid">
            <button
              type="submit"
              className="flex w-[422px] justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-[#FCC01C] px-7 py-3 rounded-lg border-solid border-[#FCC01C] hover:bg-[#E6AC19] transition-colors"
            >
              <span className="text-white text-base font-bold leading-6">
                Save changes
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const NotificationPage = () => <NotificationSettings />;

export default NotificationPage;
