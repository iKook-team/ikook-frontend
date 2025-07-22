import React from 'react';

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ number, title, description, icon }) => (
  <div className="shadow-[0px_0px_0px_4px_rgba(255,255,255,0.01)] min-w-60 w-[401px] rounded-[0px_0px_0px_0px]">
    <div className="shadow-[0px_0px_0px_4.36px_rgba(255,255,255,0.01)] flex w-full flex-col items-stretch bg-white pt-[9px] pb-[27px] px-[22px] rounded-[16.352px] max-md:px-5">
      <div className="flex w-[229px] max-w-full gap-5 text-[55px] text-black whitespace-nowrap justify-between max-md:text-[40px]">
        <div className="max-md:text-[40px]">
          {number}
        </div>
        <img
          src={icon}
          className="aspect-[1] object-contain w-[100px] shrink-0 max-w-full mt-[18px]"
          alt={title}
        />
      </div>
      <div className="text-[#323335] text-justify text-2xl self-center mt-5">
        {title}
      </div>
      <div className="text-[rgba(104,104,104,1)] text-[15px] font-normal text-center mt-[11px] max-md:ml-[7px]">
        {description}
      </div>
    </div>
  </div>
);

export const WhyUseSection: React.FC = () => {
  return (
    <section className="self-stretch z-10 flex mt-[-60px] w-full flex-col items-stretch bg-[#FCC01C] pt-[38px] pb-[72px] px-20 max-md:max-w-full max-md:px-5">
      <h2 className="text-[#323335] text-justify text-5xl font-semibold leading-none tracking-[-0.96px] max-md:max-w-full max-md:text-[40px]">
        Why you should use iKooK?
      </h2>
      <div className="mt-[52px] max-md:max-w-full max-md:mt-10">
        <div className="grid grid-cols-3 gap-[27px] font-semibold max-md:flex max-md:flex-col max-md:gap-6 max-md:max-w-full">
          <FeatureCard
            number="1"
            title="Precious moments"
            description="Experience memorable moments with family and friends over a tasteful meal."
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/f16ae2e389542d464d8dc2f0da928025ef26bc68?placeholderIfAbsent=true"
          />
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/a5d328d089e010a0ce0ac31b807a5f1397a55909?placeholderIfAbsent=true"
            className="aspect-[1.37] object-contain w-[401px] shadow-[0px_0px_0px_4px_rgba(255,255,255,0.01)] min-w-60 rounded-[0px_0px_0px_0px] col-span-1 mx-auto max-md:w-full"
            alt="Feature illustration"
          />
          <FeatureCard
            number="3"
            title="No Food Wastage"
            description="We partner with local producers and Our chefs are trained to only buy ingredients in quantities that are needed."
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/67a60d8d498dcb6ab3c6a2b7f6448021b36b95e1?placeholderIfAbsent=true"
          />
        </div>
        <div className="grid grid-cols-2 gap-[37px] mt-[30px] max-md:flex max-md:flex-col max-md:gap-6 max-md:max-w-full">
          <FeatureCard
            number="4"
            title="Allergies & Dietary Restrictions"
            description="Our website allows you to register your allergies and dietary restrictions and highlights them to your chef."
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/76887ae983ed31d0e2a6c1939e87e598151cf6dd?placeholderIfAbsent=true"
          />
          <FeatureCard
            number="5"
            title="Economic Growth & Employment"
            description="We aim to achieve sustainable economic growth and inclusive employment, aligned with the UN's SDG goal 8."
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/9e8994aaee2c3af539e37cf92657e2b338bd83af?placeholderIfAbsent=true"
          />
        </div>
      </div>
    </section>
  );
};
