"use client";

import React, { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";

const AccountManagement = () => {
  const { user, setUser } = useAuthStore();
  const [isAccountDisabled, setIsAccountDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load current account status when component mounts
  useEffect(() => {
    if (user) {
      // The toggle represents "Disable my account"
      // When is_active is true (account is active), toggle should be OFF (unchecked)
      // When is_active is false (account is inactive), toggle should be ON (checked)
      setIsAccountDisabled(user.is_active === false);
      console.log('User active status:', user.is_active, 'Toggle state (isAccountDisabled):', user.is_active === false);
    }
  }, [user]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast.error('You must be logged in to manage your account');
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      // Toggle ON (checked) means we want to disable the account (set is_active to false)
      // Toggle OFF (unchecked) means we want to enable the account (set is_active to true)
      const newIsActive = !isAccountDisabled; // Invert the toggle state for the API
      formData.append('is_active', String(newIsActive));
      
      console.log('Sending is_active:', newIsActive, 'Toggle state (isAccountDisabled):', isAccountDisabled);
      
      // Update the account active status
      const updatedUser = await authService.updateProfile(
        user.id,
        formData,
        user.user_type === 'Chef'
      );
      
      // Update the user in the store
      setUser({
        ...user,
        is_active: newIsActive
      });
      
      showToast.success(
        newIsActive 
          ? 'Your account has been enabled successfully' 
          : 'Your account has been disabled successfully'
      );
    } catch (error) {
      console.error('Error updating account status:', error);
      handleApiError(error, 'Failed to update account status');
      // Revert the toggle on error
      setIsAccountDisabled(!isAccountDisabled);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            <h1 className="text-black text-2xl font-semibold leading-none mb-6">
              Manage Account
            </h1>
            <section className="border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] w-full max-w-4xl bg-white mt-[21px] pt-[43px] rounded-[15px] border-solid border-[#E7E7E7]">
              <div className="flex w-full flex-col items-stretch px-[17px] max-md:max-w-full max-md:pr-5">
                <p className="text-[#3F3E3D] text-sm font-normal">
                  To disable or delete your profile all over the site
                </p>
                <div className="flex items-center flex-wrap mt-6 max-md:max-w-full">
                  <label
                    htmlFor="disable-account"
                    className="text-[#323335] text-sm font-medium self-stretch my-auto"
                  >
                    Disable my account temporarily
                  </label>
                  <div className="self-stretch w-[37px] my-auto ml-auto">
                    <Toggle
                      checked={isAccountDisabled}
                      onChange={() => setIsAccountDisabled(!isAccountDisabled)}
                      disabled={isLoading}
                      aria-label={isAccountDisabled ? "Enable account" : "Disable account"}
                    />
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSaveChanges}
                className="justify-center items-center border flex w-full flex-col overflow-hidden text-base text-white font-semibold bg-white mt-[273px] px-[65px] py-7 rounded-[0px_0px_15px_15px] border-solid border-[#E7E7E7] max-md:max-w-full max-md:mt-10 max-md:px-5"
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden bg-[#FCC01C] ml-[11px] px-7 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                >
                  {isLoading ? (
                    <span className="text-white">Saving...</span>
                  ) : (
                    <span className="text-white self-stretch my-auto">
                      {isAccountDisabled ? 'Disable Account' : 'Enable Account'}
                    </span>
                  )}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountManagement;
