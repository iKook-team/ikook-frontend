"use client";

import React, { useState } from "react";

import { Toggle } from "@/components/ui/toggle";

const AccountManagement = () => {
  const [isAccountDisabled, setIsAccountDisabled] = useState(true);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Account disabled:", isAccountDisabled);
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
                  className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex w-[422px] max-w-full gap-2 overflow-hidden bg-[#FCC01C] ml-[11px] px-7 py-3 rounded-lg border-solid border-[#FCC01C] max-md:px-5"
                >
                  <span className="text-white self-stretch my-auto">
                    Save changes
                  </span>
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
