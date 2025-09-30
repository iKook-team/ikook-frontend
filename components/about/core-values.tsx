import React from "react";

interface CoreValueCardProps {
  icon: string;
  title: string;
  description: string;
  isDark?: boolean;
}

const CoreValueCard: React.FC<CoreValueCardProps> = ({
  icon,
  title,
  description,
  isDark = false,
}) => {
  const cardClasses = isDark
    ? "flex grow flex-col text-white w-full bg-[#323335] pt-6 pb-[46px] px-[30px] rounded-[6.531px] border-[0.653px] border-solid border-[rgba(50,51,53,0.40)] max-md:mt-[38px] max-md:px-5"
    : "flex grow flex-col w-full px-[31px] py-[26px] rounded-[6.531px] border-[0.653px] border-solid border-[rgba(50,51,53,0.40)] max-md:mt-[38px] max-md:pl-5";

  const textColor = isDark ? "text-white" : "text-[#323335]";

  return (
    <div className="w-[33%] max-md:w-full max-md:ml-0">
      <article className={cardClasses}>
        <img
          src={icon}
          className="aspect-[1] object-contain w-[76px] rounded-[0px_0px_0px_0px]"
          alt={`${title} icon`}
        />
        <h3 className={`${textColor} text-2xl font-semibold mt-5`}>{title}</h3>
        <p
          className={`${textColor} text-sm font-normal self-stretch mt-[15px]`}
        >
          {description}
        </p>
      </article>
    </div>
  );
};

const CoreValues: React.FC = () => {
  const coreValues = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/02efae481f9daa524203ecff4c7cff919f2e55b5?placeholderIfAbsent=true",
      title: "Fairness",
      description:
        "We ensure transparent and equitable experiences for clients and customer by uphold fairness in every aspect, fostering trust, inclusivity, and mutual success.",
      isDark: false,
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/40edcdb88634d065d10cfd71318310ed1e71e666?placeholderIfAbsent=true",
      title: "Building Community",
      description:
        "Build more of a genuine community with chefs and local business",
      isDark: false,
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/e4319786b0009034424a5b2074f218ca8dcc0b28?placeholderIfAbsent=true",
      title: "Security and Trust",
      description:
        "By ensuring that our chef are verify and we also ensure that we follow the GDPR law in other to protect our user details.",
      isDark: true,
    },
  ];

  return (
    <section className="w-full flex flex-col items-stretch">
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2db9fc78cdc9cd82a6055fa610cfcf0ac54838db?placeholderIfAbsent=true"
        className="aspect-[500] object-contain w-full self-center mt-[150px] max-md:mt-10"
        alt="Decorative divider"
      />
      <h2 className="text-[#323335] text-[35px] font-medium self-center mt-4">
        Core Value
      </h2>
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2db9fc78cdc9cd82a6055fa610cfcf0ac54838db?placeholderIfAbsent=true"
        className="aspect-[500] object-contain w-full mt-4"
        alt="Decorative divider"
      />
      <div className="w-full mt-[74px] max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {coreValues.map((value, index) => (
            <CoreValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              isDark={value.isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
