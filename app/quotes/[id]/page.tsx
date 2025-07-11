import React from "react";

import { DishCard } from "@/components/quotes/dish-card";
import { MenuSelection } from "@/components/quotes/menu-selection";
import { QuoteSummary } from "@/components/quotes/quote-summary";

const Index: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] flex justify-center max-md:w-full max-md:max-w-screen-lg max-md:h-auto max-md:min-h-screen">
      <main className="flex flex-col items-center w-full max-w-[885px] px-4 py-9">
        <h1 className="self-start text-2xl font-semibold leading-none text-black w-full max-w-[885px] px-4">
          Preview quote
        </h1>

        <div className="w-full max-w-[885px] px-4">
          <div className="flex gap-5 w-full max-md:flex-col">
            <div className="w-[57%] max-md:ml-0 max-md:w-full">
              <div className="grow mt-6 max-md:mt-10 max-md:max-w-full">
                <DishCard
                  imageSrc="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9f5b325159a2a4814c8c96c3a0659ce4ebd41156?placeholderIfAbsent=true"
                  title="Braised Chicken With Lemon and Olives"
                  chefName="Chloe Esther"
                  chefImageSrc="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/a9da32595396357c135403f4072880ce67d7078f?placeholderIfAbsent=true"
                />
                <MenuSelection />
              </div>
            </div>

            <div className="ml-5 w-[43%] max-md:ml-0 max-md:w-full">
              <QuoteSummary />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
