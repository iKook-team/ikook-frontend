import React from "react";

import { ChefRequirementsData } from "@/components/auth/chef-requirements";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] px-2 sm:px-4 md:px-6 lg:px-8">
      <main className="relative">
        <ChefRequirementsData />
      </main>
    </div>
  );
};

export default Index;
