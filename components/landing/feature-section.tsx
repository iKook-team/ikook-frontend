import React from 'react';

interface FeatureSectionProps {
  badge: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageFirst?: boolean;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  badge,
  title,
  description,
  features,
  image,
  imageFirst = false
}) => {
  const content = (
    <div className="self-stretch flex min-w-60 flex-col items-stretch w-[618px] my-auto max-md:max-w-full">
      <div className="justify-center items-center border bg-[#E2F4FF] flex gap-2.5 text-base text-[#1B98E0] font-semibold whitespace-nowrap text-center leading-[1.3] px-6 py-2 rounded-[30px] border-solid border-[#1B98E0] max-md:px-5">
        <div className="text-[#1B98E0] self-stretch my-auto">
          {badge}
        </div>
      </div>
      <div className="flex max-w-full w-[618px] flex-col items-stretch mt-[35px]">
        <h3 className="text-[#001118] text-[40px] font-semibold leading-[52px] max-md:max-w-full">
          {title}
        </h3>
        <p className="text-[#828282] text-sm font-normal leading-6 mt-[19px] max-md:max-w-full">
          {description}
        </p>
        <div className="flex flex-col text-lg text-black font-medium leading-none mt-[19px]">
          {features.map((feature, index) => (
            <div key={index} className={`flex gap-4 ${index > 0 ? 'mt-6' : ''}`}>
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/226a2a930098d80a1050f28cf10f6522412c855b?placeholderIfAbsent=true"
                className="aspect-[1.05] object-contain w-[22px] shrink-0"
                alt="Check mark"
              />
              <div>{feature}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const imageElement = (
    <div className="self-stretch min-w-60 overflow-hidden w-[519px] bg-[#1C58FC] my-auto rounded-[20px] max-md:max-w-full">
      <div className="rounded-[50%] max-md:max-w-full">
        <div className="rounded-[50%] max-md:max-w-full">
          <div className="pt-4 rounded-[50%] max-md:max-w-full">
            <div className="flex flex-col items-stretch justify-center px-[26px] py-[34px] rounded-[50%] max-md:max-w-full max-md:px-5">
              <div className="pt-2.5 px-[34px] rounded-[50%] max-md:max-w-full max-md:px-5">
                <img
                  src={image}
                  className="aspect-[0.81] object-contain w-full z-10 -mb-9 max-md:mb-2.5"
                  alt={title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const regularImage = (
    <img
      src={image}
      className="aspect-[0.98] object-contain w-[519px] self-stretch min-w-60 my-auto max-md:max-w-full"
      alt={title}
    />
  );

  return (
    <section className="flex items-center gap-[40px_78px] flex-wrap mt-20 max-md:max-w-full max-md:mt-10">
      {imageFirst ? (
        <>
          {image.includes('3751a312') || image.includes('2d950556') ? imageElement : regularImage}
          {content}
        </>
      ) : (
        <>
          {content}
          {image.includes('3751a312') || image.includes('2d950556') ? imageElement : regularImage}
        </>
      )}
    </section>
  );
};