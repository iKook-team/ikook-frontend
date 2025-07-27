import React from "react";

const Hero = () => {
  return (
    <section className="self-stretch flex w-full flex-col mt-[45px] pl-[26px] max-md:max-w-full max-md:mt-10 max-md:pl-5">
      <div className="flex flex-col self-center relative min-h-[515px] w-full max-w-[1258px] overflow-hidden items-center text-white font-semibold pt-[243px] pb-[43px] px-20 rounded-[40px] max-md:max-w-full max-md:pt-[100px] max-md:px-5">
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/dd49ec9744928839656bd0156d136654f057c90e?placeholderIfAbsent=true"
          className="absolute h-full w-full object-cover inset-0"
          alt="Chef preparing food for large event"
        />
        <div className="relative flex w-[879px] max-w-full flex-col items-center">
          <h1 className="text-[50px] leading-none max-md:max-w-full max-md:text-[40px]">
            Hire a chef for large event
          </h1>
          <p className="text-center text-sm font-medium leading-5 self-stretch mt-3.5 max-md:max-w-full">
            Transform your gatherings into gastronomic celebrations with our
            Large Events service. Discover seasoned chefs specializing in
            crafting culinary experiences for events exceeding 50 guests.
            Elevate every occasion with exceptional cuisine and unmatched
            expertise.
          </p>
          <div className="flex text-lg leading-loose mt-[26px] rounded-[30px]">
            <button className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-[#FCC01C] flex min-w-60 gap-3 overflow-hidden px-7 py-4 rounded-[30px] border-solid border-[#FCC01C] max-md:px-5 hover:bg-[#e6ac19] transition-colors">
              <span className="self-stretch my-auto">Explore our Chefs</span>
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/df85ea64fb942f518cf32d6a0620ed2495bc00ad?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                alt="Arrow icon"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
