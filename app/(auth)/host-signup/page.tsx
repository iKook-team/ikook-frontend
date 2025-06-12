import React from "react";

import { HostRegistrationForm } from "@/components/auth/host-registration-form";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <HostRegistrationForm />
      </main>
    </div>
  );
};

export default Index;
