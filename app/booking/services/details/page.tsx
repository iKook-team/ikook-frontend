import React from "react";

import { ChefProfile } from "@/components/booking/chef-profile";
import { EventDetails } from "@/components/booking/event-details";
import { ReviewsSection } from "@/components/booking/reviews-section";
import { MenusSection } from "@/components/booking/menus-section";
import { SimilarChefs } from "@/components/booking/similar-chefs";

const Index = () => {
  return (
    <main className="mx-auto w-full max-w-[1117px] mt-[41px] px-4 mb-16 max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[36%] max-md:w-full max-md:ml-0">
          <ChefProfile />
        </div>

        <div className="w-[64%] ml-5 max-md:w-full max-md:ml-0">
          <div className="grow max-md:max-w-full max-md:mt-[33px]">
            <EventDetails />
            <ReviewsSection />
            <MenusSection />
            <SimilarChefs />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
