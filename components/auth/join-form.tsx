"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { WelcomeSection } from "./welcome-section";
import { ActionButtons, UserType } from "./action-button";
import { LoginPrompt } from "./login-prompt";

interface JoinFormProps {
  onSubmit?: (userType: UserType) => void;
  onLoginClick?: () => void;
  initialSelectedUserType?: UserType;
}

export const JoinForm: React.FC<JoinFormProps> = ({
  onSubmit,
  onLoginClick,
  initialSelectedUserType = null,
}) => {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState<UserType>(initialSelectedUserType);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectionChange = (type: UserType) => {
    setSelectedUserType(type);
    // Navigate immediately upon selection
    if (type === "host") {
      router.push("/host-signup");
    } else if (type === "chef") {
      router.push("/chef-requirements");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // No-op: navigation happens immediately on selection now
  };

  const handleLoginClick = () => {
    onLoginClick?.();
  };

  return (
    <main className="max-w-none flex flex-col justify-center items-start gap-1.5 w-[603px] h-[786px] box-border mx-auto my-0 p-5 max-md:max-w-[500px] max-md:w-full max-md:p-[15px] max-sm:max-w-screen-sm max-sm:w-full max-sm:p-2.5">
      <header className="text-black text-xl font-medium leading-[30px] w-[104px] h-[30px] mb-1 max-sm:text-lg max-sm:mb-5">
        Join iKooK
      </header>

      <div className="w-[605px] h-[750px] border shadow-[0px_4px_30px_0px_rgba(0,0,0,0.03)] relative flex flex-col items-center box-border bg-white pt-[55px] pb-[106px] px-[49px] rounded-[15px] border-solid border-[#E7E7E7] max-md:w-full max-md:pt-10 max-md:pb-20 max-md:px-[30px] max-sm:w-full max-sm:pt-[30px] max-sm:pb-[60px] max-sm:px-5 max-sm:rounded-[10px]">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <WelcomeSection imageUrl="/join.png" />

          <fieldset className="border-0 p-0 m-0 w-full flex flex-col items-center">
            <legend className="sr-only">Choose your role on iKooK</legend>
            <ActionButtons
              onSelectionChange={handleSelectionChange}
              initialSelectedType={selectedUserType}
            />
          </fieldset>

          {/* Continue button removed; navigation occurs on selection */}

          <LoginPrompt onLoginClick={handleLoginClick} />
        </form>
      </div>
    </main>
  );
};
