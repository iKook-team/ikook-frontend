"use client";

import React, { useState } from "react";

import { WelcomeSection } from "./welcome-section";
import { ActionButtons, UserType } from "./action-button";
import { LoginPrompt } from "./login-prompt";

interface JoinFormProps {
  onSubmit?: (userType: UserType) => void;
  onLoginClick?: () => void;
}

export const JoinForm: React.FC<JoinFormProps> = ({
  onSubmit,
  onLoginClick,
}) => {
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectionChange = (selection: UserType) => {
    setSelectedUserType(selection);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserType) {
      alert("Please select whether you want to join as a Host or Chef");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit?.(selectedUserType);
      console.log(`User selected: ${selectedUserType}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginClick = () => {
    onLoginClick?.();
    console.log("Login clicked");
  };

  return (
    <main className="max-w-none flex flex-col justify-center items-start gap-1.5 w-[603px] h-[786px] box-border mx-auto my-0 p-5 max-md:max-w-[500px] max-md:w-full max-md:p-[15px] max-sm:max-w-screen-sm max-sm:w-full max-sm:p-2.5">
      <header className="text-black text-xl font-medium leading-[30px] w-[104px] h-[30px] mb-9 max-sm:text-lg max-sm:mb-5">
        Join iKooK
      </header>

      <div className="w-[605px] h-[750px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] relative flex flex-col items-center box-border bg-white pt-[55px] pb-[106px] px-[49px] rounded-[15px] border-solid border-[#E7E7E7] max-md:w-full max-md:pt-10 max-md:pb-20 max-md:px-[30px] max-sm:w-full max-sm:pt-[30px] max-sm:pb-[60px] max-sm:px-5 max-sm:rounded-[10px]">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <WelcomeSection />

          <fieldset className="border-0 p-0 m-0 w-full flex flex-col items-center">
            <legend className="sr-only">Choose your role on iKooK</legend>
            <ActionButtons onSelectionChange={handleSelectionChange} />
          </fieldset>

          {selectedUserType && (
            <button
              type="submit"
              aria-label={`Continue as ${selectedUserType}`}
              className="mb-4 px-6 py-2 bg-[#FCC01C] text-white rounded-lg font-medium hover:bg-[#e6ac19] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FCC01C] focus:ring-opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : `Continue as ${selectedUserType === "host" ? "Host" : "Chef"}`}
            </button>
          )}

          <LoginPrompt onLoginClick={handleLoginClick} />
        </form>
      </div>
    </main>
  );
};
