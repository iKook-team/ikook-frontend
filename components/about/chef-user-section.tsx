import React from "react";

interface InfoCardProps {
  icon: string;
  title: string;
  content: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content }) => {
  return (
    <div className="w-6/12 max-md:w-full max-md:ml-0">
      <article className="border flex w-full flex-col items-stretch mx-auto pl-[47px] pr-[23px] py-[69px] rounded-[10px] border-solid border-[rgba(50,51,53,0.40)] max-md:max-w-full max-md:mt-[38px] max-md:px-5">
        <div className="flex items-stretch gap-[40px_45px] text-[40px] text-[#323335] font-semibold whitespace-nowrap">
          <img
            src={icon}
            className="aspect-[1] object-contain w-20 shrink-0 rounded-[0px_0px_0px_0px]"
            alt={`${title} icon`}
          />
          <h3 className="text-[#323335] mt-3.5">{title}</h3>
        </div>
        <div className="text-[#323335] text-xl font-normal mt-[65px] max-md:max-w-full max-md:mt-10">
          {content}
        </div>
      </article>
    </div>
  );
};

const ChefUserSection: React.FC = () => {
  const chefContent = (
    <>
      <span className="font-bold">Earning Potential:</span> Fair compensation
      for culinary expertise.
      <br />
      <br />
      <span className="font-bold">Respect and Recognition:</span> Valued
      contributions and open communication.
    </>
  );

  const userContent = (
    <>
      <span className="font-bold">Fair Pricing: </span>Transparent and
      competitive pricing without hidden fees.
      <br />
      <br />
      <span className="font-bold">Equal Opportunities:</span> Diverse access to
      talented chefs, regardless of background.
    </>
  );

  return (
    <section className="w-full flex flex-col items-stretch">
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2db9fc78cdc9cd82a6055fa610cfcf0ac54838db?placeholderIfAbsent=true"
        className="aspect-[500] object-contain w-full mt-[142px] max-md:mt-10"
        alt="Decorative divider"
      />
      <h2 className="text-[#323335] text-[35px] font-medium self-center mt-4">
        Chef & User
      </h2>
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2db9fc78cdc9cd82a6055fa610cfcf0ac54838db?placeholderIfAbsent=true"
        className="aspect-[500] object-contain w-full mt-4"
        alt="Decorative divider"
      />
      <div className="w-full mt-[86px] max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <InfoCard
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/fbe960f1893d52aee8bfef21c06d0e56565c05ed?placeholderIfAbsent=true"
            title="Chef"
            content={chefContent}
          />
          <InfoCard
            icon="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/fbe960f1893d52aee8bfef21c06d0e56565c05ed?placeholderIfAbsent=true"
            title="User"
            content={userContent}
          />
        </div>
      </div>
    </section>
  );
};

export default ChefUserSection;
