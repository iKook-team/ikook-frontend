import React from 'react';

interface StatItemProps {
  number: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ number, label }) => (
  <div className="self-stretch flex flex-col my-auto pl-2.5 pr-10 py-2.5 rounded-md max-md:pr-5">
    <div className="text-[#060605] text-5xl font-semibold leading-none tracking-[-0.96px] max-md:text-[40px]">
      {number}
    </div>
    <div className="text-[#3F3E3D] text-xl font-normal">
      {label}
    </div>
  </div>
);

export const StatsSection: React.FC = () => {
  return (
    <section className="flex w-[967px] max-w-full flex-col items-stretch ml-[136px] mt-[54px] max-md:mt-10">
      <div className="flex items-center gap-8 text-center flex-wrap max-md:max-w-full">
        <StatItem number="+400" label="Happy chefs" />
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/c7bdab4562f038dc260d58f3679ce863f8e0e430?placeholderIfAbsent=true"
          className="aspect-[0.02] object-contain w-px stroke-[1px] stroke-[#CFCFCE] self-stretch shrink-0 my-auto"
          alt=""
        />
        <StatItem number="+5,000" label="Satisfied users" />
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/c7bdab4562f038dc260d58f3679ce863f8e0e430?placeholderIfAbsent=true"
          className="aspect-[0.02] object-contain w-px stroke-[1px] stroke-[#CFCFCE] self-stretch shrink-0 my-auto"
          alt=""
        />
        <StatItem number="+15,000" label="Menu booked" />
      </div>
      <h2 className="text-[#323335] text-5xl font-semibold leading-[60px] tracking-[-0.96px] mt-5 max-md:max-w-full max-md:text-[40px] max-md:leading-[56px]">
        Experience different cuisines and enjoy professionally prepared food,
        at your home or for any occasion.
      </h2>
    </section>
  );
};
