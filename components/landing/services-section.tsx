import React from 'react';

export const ServicesSection: React.FC = () => {
  return (
    <section className="flex flex-col self-stretch relative min-h-[714px] w-full items-stretch mt-[100px] pl-20 pb-40 max-md:max-w-full max-md:mt-10 max-md:pl-5 max-md:pb-[100px]">
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/f374884a0e450b386b507bb3fd694801d16a5fa3?placeholderIfAbsent=true"
        className="absolute h-full w-full object-cover inset-0"
        alt="Services background"
      />
      <h2 className="relative text-[#323335] text-6xl font-semibold leading-[1.2] tracking-[-1.2px] max-md:text-[40px]">
        Our Services
      </h2>
      <div className="relative flex items-stretch gap-5 flex-nowrap overflow-x-auto justify-start mt-[46px] -mb-8 max-md:max-w-full max-md:mt-10 max-md:mb-2.5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/71f8819e07f7e354e236fd11ce59eae88d95f669?placeholderIfAbsent=true"
          className="object-cover w-[220px] h-[300px] rounded-[10px] flex-shrink-0"
          alt="Service 1"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/8c0c788ee93ef08e649bc261daffe3000301b4dc?placeholderIfAbsent=true"
          className="object-cover w-[220px] h-[300px] rounded-[10px] flex-shrink-0"
          alt="Service 2"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/fe0da22c9095d83cded948130c7e915d6f47d867?placeholderIfAbsent=true"
          className="object-cover w-[220px] h-[300px] rounded-[10px] flex-shrink-0"
          alt="Service 3"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/ca2dd2c3fa96f0b407caeaa325378259d551d90b?placeholderIfAbsent=true"
          className="object-cover w-[220px] h-[300px] rounded-[10px] flex-shrink-0"
          alt="Service 4"
        />
      </div>
    </section>
  );
};
