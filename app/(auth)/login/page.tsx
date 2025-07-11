import React from "react";

import { LoginForm } from "@/components/auth/login-form";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] flex justify-center items-start pt-[96.5px] pb-8 px-4 sm:px-6">
      <main className="relative w-[603px]">
        <LoginForm />
      </main>
    </div>
  );
};

export default Index;
