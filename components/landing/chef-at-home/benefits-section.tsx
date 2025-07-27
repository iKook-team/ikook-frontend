import React from "react";

import BenefitCard from "./benefit-card";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "🏡",
      title: "Comfort",
      description:
        "Enjoy a five-star dining experience in the comfort of your home.",
    },
    {
      icon: "💡",
      title: "Unique Experience",
      description:
        "Enjoy a five-star dining experience in the comfort of your home.",
    },
    {
      icon: "🕑",
      title: "Time-Saving",
      description:
        "Eliminate the stress of cooking and spend more time with your loved ones.",
    },
  ];

  return (
    <section className="self-stretch flex w-full flex-col pl-[26px] max-md:max-w-full max-md:pl-5">
      <h2 className="text-black text-3xl font-semibold leading-none ml-[69px] mt-[97px] max-md:max-w-full max-md:mt-10">
        Why Choose Chef at Home?
      </h2>
      <div className="self-center flex gap-6 flex-wrap mt-6 max-md:max-w-full">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
