"use client";

import React, { useState } from 'react';

import { Toggle } from '@/components/ui/toggle';

export const NotificationSettings: React.FC = () => {
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(true);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving notification settings:', {
      emailNotification,
      smsNotification,
    });
    // Here you would typically send the data to your backend
  };

  return (
    <section className="max-w-[1440px] mx-auto my-0 px-12 py-6">
      <div className="w-[655px] relative mx-auto my-0">
        <h1 className="text-black text-2xl font-semibold leading-8 mb-[53px]">
          Notification
        </h1>
        
        <form onSubmit={handleSaveChanges} className="w-[654px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] bg-white rounded-[15px] border-solid border-[#E7E7E7]">
          <div className="pt-[34px] pb-0 px-[18px]">
            <div className="flex items-center justify-between mb-6">
              <label htmlFor="email-notification" className="text-[#020101] text-[15px] font-normal">
                Email notification
              </label>
              <Toggle
                checked={emailNotification}
                onChange={setEmailNotification}
              />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <label htmlFor="sms-notification" className="text-[#020101] text-[15px] font-normal">
                SMS notification
              </label>
              <Toggle
                checked={smsNotification}
                onChange={setSmsNotification}
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