import React from "react";

import { ChefRequirementsData } from "@/components/auth/chef-requirements";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <ChefRequirementsData />
      </main>
    </div>
  );
};

export default Index;
