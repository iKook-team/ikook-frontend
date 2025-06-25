import React from "react";

import { MyBookingsPage } from "@/components/dashboard/host-dashboard";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <MyBookingsPage />
      </main>
    </div>
  );
};

export default Index;
