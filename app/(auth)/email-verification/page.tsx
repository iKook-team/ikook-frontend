import React from "react";

import { OTPVerification } from "@/components/auth/otp-verification";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <OTPVerification />
      </main>
    </div>
  );
};

export default Index;
