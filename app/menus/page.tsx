import React from "react";

import { MyMenusPage } from "@/components/menus/chef-menus";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <MyMenusPage />
      </main>
    </div>
  );
};

export default Index;
