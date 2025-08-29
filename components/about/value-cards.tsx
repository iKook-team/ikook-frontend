import React from 'react';

interface ValueCardProps {
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description }) => {
  return (
    <div className="w-[33%] max-md:w-full max-md:ml-0">
      <article className="flex grow flex-col items-stretch w-full bg-[#FCC01C] pt-[35px] pb-[94px] px-[31px] rounded-[6.536px] border-[0.654px] border-solid border-[rgba(50,51,53,0.40)] max-md:mt-[38px] max-md:pl-5">
        <h3 className="text-white text-[33px] font-bold leading-none">
          {title}
        </h3>
        <p className="text-[#323335] text-[23px] font-normal mt-12 max-md:mt-10">
          {description}
        </p>
      </article>
    </div>
  );
};

const ValueCards: React.FC = () => {
  const values = [
    {
      title: "Purpose",
      description: "To elevate the dining experiences from mere meal to cherish moment"
    },
    {
      title: "Vision",
      description: "To offer a diverse selection of private chefs who cater to a rich array of cuisines thereby bringing global culinary delights to your doorstep."
    },
    {
      title: "Mission",
      description: "To provide a platform that brings talented chefs and food enthusiasts together"
    }
  ];

  return (
    <section className="mt-32 max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        {values.map((value, index) => (
          <ValueCard
            key={index}
            title={value.title}
            description={value.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ValueCards;