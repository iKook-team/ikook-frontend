import React from "react";

import CreateMenuStep1 from "@/components/menus/create-menu-step1";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen flex items-center justify-center">
      <main className="relative mt-8">
        <CreateMenuStep1 />
      </main>
    </div>
  );
};

export default Index;
