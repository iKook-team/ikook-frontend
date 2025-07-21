import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  className = ""
}) => {
  return (
    <article className={`grow overflow-hidden w-full bg-[#FFFCF5] pl-7 pt-[25px] rounded-[20px] max-md:max-w-full max-md:mt-4 ${className}`}>
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[44%] max-md:w-full max-md:ml-0">
          <div className="flex mr-[-210px] flex-col self-stretch items-stretch my-auto max-md:mt-10">
            <h3 className="text-black text-3xl font-semibold leading-none">
              {title}
            </h3>
            <p className="text-[#6F6E6D] text-xl font-normal leading-[35px] mt-[46px] max-md:mt-10">
              {description}
            </p>
          </div>
        </div>
        <div className="w-[56%] ml-5 max-md:w-full max-md:ml-0">
          <img
            src={imageSrc}
            className="aspect-[0.99] object-contain w-full grow max-md:mt-[25px]"
            alt={imageAlt}
          />
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;
