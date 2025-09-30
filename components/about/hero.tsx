import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-stretch mt-[146px] max-md:mt-10">
      <h1 className="text-[#323335] text-[70px] font-bold leading-none max-md:text-[40px]">
        {"Ab"}
        <span className="relative inline-block">
          <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FCC01C] z-[2]" />
          <span className="relative z-[3]">out Us</span>
        </span>
      </h1>
    </section>
  );
};

export default Hero;
