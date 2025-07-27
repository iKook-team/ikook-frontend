import React from "react";

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <article className="shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] min-w-60 overflow-hidden w-[398px] bg-[#FFFCF5] pt-6 pb-[71px] px-8 rounded-[20px] max-md:px-5">
      <div className="flex w-[50px] flex-col items-center text-2xl text-[#FCC01C] font-semibold leading-none justify-center h-[50px] bg-white px-[13px] rounded-[5px]">
        <div className="text-[#FCC01C]">{icon}</div>
      </div>
      <div className="mt-[34px]">
        <h3 className="text-black text-2xl font-semibold leading-none">
          {title}
        </h3>
        <p className="text-[#3F3E3D] text-base font-normal leading-6 mt-2">
          {description}
        </p>
      </div>
    </article>
  );
};

export default BenefitCard;
