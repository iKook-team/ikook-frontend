import React from "react";

const WhyChoose = () => {
  const features = [
    {
      icon: "🥂",
      title: "Grand Impressions",
      description:
        "Make a lasting impact with culinary creations tailored for your event.",
    },
    {
      icon: "💐",
      title: "Event Coordination",
      description:
        "Collaborate with chefs who understand the dynamics of large gatherings.",
    },
    {
      icon: "⏳",
      title: "Effortless Planning",
      description:
        "Enjoy a stress-free event planning process with our expert chefs at your service.",
    },
  ];

  return (
    <section className="mt-[100px] max-md:mt-10">
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/4dcc388b0c640b80651b5be32368ed565ef53c3b?placeholderIfAbsent=true"
        className="aspect-[2.46] object-contain w-full max-w-[1352px] max-md:max-w-full"
        alt="Decorative divider"
      />
      <h2 className="text-black text-3xl font-semibold leading-none ml-[69px] mt-[97px] max-md:ml-2.5 max-md:mt-10">
        Why Choose Large Events?
      </h2>
      <div className="self-center flex gap-6 flex-wrap mt-6 max-md:max-w-full">
        {features.map((feature, index) => (
          <article
            key={index}
            className="shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] min-w-60 overflow-hidden w-[398px] bg-[#FFFCF5] pt-6 pb-[71px] px-8 rounded-[20px] max-md:px-5"
          >
            <div className="flex w-[50px] flex-col items-center text-2xl text-[#FCC01C] font-semibold whitespace-nowrap leading-none justify-center h-[50px] bg-white px-[13px] rounded-[5px]">
              <span className="text-[#FCC01C]">{feature.icon}</span>
            </div>
            <div className="mt-[34px]">
              <h3 className="text-black text-2xl font-semibold leading-none">
                {feature.title}
              </h3>
              <p className="text-[#3F3E3D] text-base font-normal leading-6 mt-2">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
