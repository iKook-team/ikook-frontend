import React from "react";

import { QuotesSection } from "@/components/quotes/quotes-section";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="relative">
        <QuotesSection />
      </main>
    </div>
  );
};

export default Index;
