import React from 'react';
import { AppStoreButtons } from './app-store-buttons';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  return (
    <header className="self-stretch flex w-full flex-col overflow-hidden items-center bg-[#FFFCF5] pt-[23px] pb-1.5 max-md:max-w-full">
      <div className="flex max-md:max-w-full">
        <AppStoreButtons />
      </div>
      <h1 className="text-[#0f0e0c] text-center text-[50px] font-bold leading-[66px] w-[973px] mt-[78px] max-md:max-w-full max-md:text-[40px] max-md:leading-[59px] max-md:mt-10">
        Discover the new, easy way to book a{" "}
        <span style={{color: "rgba(252,192,28,1)"}}>private chef</span>
      </h1>
      <p className="text-[#3F3E3D] text-center text-sm font-normal w-[777px] mt-3.5 max-md:max-w-full">
        Explore a fresh approach to culinary delights through our
        user-friendly platform, simplifying the process of booking private
        chefs for an unforgettable dining adventure.
      </p>
      <div className="flex gap-8 text-lg text-white font-semibold leading-loose mt-12 max-md:mt-10">
        <Button className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex gap-2 overflow-hidden bg-[#FCC01C] px-7 py-4 rounded-[30px] border-solid border-[#FCC01C] hover:bg-[#FCC01C]/90 max-md:px-5">
          Join waitlist
        </Button>
      </div>
    </header>
  );
};
