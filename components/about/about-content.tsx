import React from "react";

const AboutContent: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-stretch">
      <article className="text-[#323335] text-justify text-xl font-normal leading-[46px] mt-[93px] max-md:mt-10">
        <p>
          iKooK is passionate about bringing the joy of fine dining right to
          your doorstep. Our platform connects you with a curated selection of
          talented private chefs, ready to craft personalized culinary
          experiences in the comfort of your home.
        </p>
        <br />
        <br />
        <h2 className="font-bold text-2xl leading-[56px] inline">Our Story</h2>
        <br />
        <p>
          iKooK was born out of a need for good food and the desire to create
          special moments around the dining table. We set out on a mission to
          simplify the process of hiring a private chef and make it accessible
          to more people.
        </p>
        <br />
        <br />
        <h2 className="font-bold text-2xl leading-[56px] inline">
          Join Our Community
        </h2>
        <br />
        <p>
          We&apos;re thrilled to have you as part of our community of food
          enthusiasts. Whether it&apos;s an intimate dinner for two, a family
          celebration, or a social gathering, our chefs are here to make your
          occasions memorable and stress-free.
        </p>
      </article>
    </section>
  );
};

export default AboutContent;
