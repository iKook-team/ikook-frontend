import React from "react";

import FeatureCard from "./feature-card";

const FeatureSection = () => {
  return (
    <section className="self-stretch flex w-full flex-col pl-[26px] max-md:max-w-full max-md:pl-5">
      <h2 className="text-black text-3xl font-semibold leading-none ml-[67px] mt-[100px] max-md:max-w-full max-md:mt-10">
        Discover Your Culinary Journey
      </h2>
      <div className="self-center w-full max-w-[1250px] mt-6 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-2/5 max-md:w-full max-md:ml-0">
            <FeatureCard
              title="👨��🍳 Expert Chefs"
              description="Explore profiles of skilled chefs, each with a unique culinary flair. From gastronomic wizards to masters of comfort food, find the perfect match for your taste."
              imageSrc="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/e43bce94bdba3a2abea7b9cf25a0e7aac1facddc?placeholderIfAbsent=true"
              imageAlt="Expert chef preparing food"
            />
          </div>
          <div className="w-3/5 ml-5 max-md:w-full max-md:ml-0">
            <article className="flex grow flex-col overflow-hidden w-full bg-[#FFFCF5] pl-7 pr-[76px] pt-[49px] rounded-[20px] max-md:max-w-full max-md:mt-4 max-md:px-5">
              <h3 className="text-black text-3xl font-semibold leading-none">
                🍽️ Tailored Menus
              </h3>
              <p className="text-[#6F6E6D] text-xl font-normal leading-[35px] self-stretch mt-[31px] max-md:max-w-full">
                Indulge in personalized menus crafted to your preferences.
                Whether it&apos;s an intimate dinner for two or a festive
                gathering, our chefs create unforgettable dining experiences.
              </p>
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/c47073a167363356b6c63313bf9dbc08e2273f76?placeholderIfAbsent=true"
                className="aspect-[2.23] object-contain w-[439px] max-w-full"
                alt="Tailored menu dishes"
              />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
