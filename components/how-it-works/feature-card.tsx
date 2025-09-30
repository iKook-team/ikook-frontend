import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  iconSvg: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  iconSvg,
}) => {
  return (
    <article className="w-[597px] h-[500px] relative max-md:w-full">
      <div className="w-[597px] h-[500px] absolute bg-[rgba(252,192,28,0.10)] rounded-[15px] left-0 top-0 max-md:w-full" />
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-[548px] h-[245px] absolute rounded-xl left-[23px] top-[22px] max-md:w-[calc(100%_-_46px)]"
      />
      <div className="w-[548px] h-[247px] absolute bg-[rgba(0,0,0,0.20)] rounded-xl left-[23px] top-5 max-md:w-[calc(100%_-_46px)]" />
      <div className="w-[102px] h-[102px] absolute bg-white rounded-[14.566px] left-[39px] top-[47px]" />
      <div
        className="absolute left-[60px] top-[68px]"
        dangerouslySetInnerHTML={{ __html: iconSvg }}
      />
      <h3 className="text-[#323335] text-[29px] font-bold absolute left-10 top-[292px] max-sm:text-2xl">
        {title}
      </h3>
      <p className="w-[531px] text-[rgba(50,51,53,0.70)] text-xl font-normal leading-10 absolute left-10 top-[352px] max-md:w-[calc(100%_-_80px)] max-md:text-lg max-sm:text-base max-sm:leading-6">
        {description}
      </p>
    </article>
  );
};

export default FeatureCard;
