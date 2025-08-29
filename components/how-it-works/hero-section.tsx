import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-[#323335] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {"How it "}
              <span className="relative inline-block">
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FCC01C] z-[2]" />
                <span className="relative z-[3]">works</span>
              </span>
            </h1>
            <p className="text-[rgba(50,51,53,0.70)] text-base md:text-lg leading-7 mt-6">
              Our platform connects you with top chefs, who bring their expertise and delicious menus right to your doorstep. Simply browse through our extensive list of menus, choose the one that suits your taste, and book a chef for the day and time that works best for you. Leave the cooking to the professionals and enjoy a unique dining experience, made just for you!
            </p>
          </div>
          <div className="relative flex justify-center md:justify-end">
            <div className="absolute inset-0 -z-10 bg-[rgba(252,192,28,0.10)] rounded-lg md:rounded-xl" />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/0fcabc83e55247e5fa2e39d74ed14cfef51fa164?width=836"
              alt="Chopping board with food"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-[418px] lg:h-[418px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;