import React from "react";

import { ReviewSection } from "@/components/review/review-section";
import { ReviewsGrid } from "@/components/review/reviews-grid";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFB] w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            <ReviewSection />
            <ReviewsGrid />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
