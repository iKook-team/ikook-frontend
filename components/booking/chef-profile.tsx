import React from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const ChefProfile: React.FC = () => {
  const services = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/cb394a2dc5cbfdd445ad8e5ea66875e05bb351c6?placeholderIfAbsent=true",
      label: "Chef at Home",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c73958f4891665715287751b4ec929ff7c116e0c?placeholderIfAbsent=true",
      label: "Meal Prep",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/3e1c4baa2dfba034766884a2d8070c74986b4787?placeholderIfAbsent=true",
      label: "Large Event",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/97fde8bd44ed2c7567012b9306a40d890561f606?placeholderIfAbsent=true",
      label: "Gormet Delivery",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f05a2988fffa31518565e82cc12ea323a156f638?placeholderIfAbsent=true",
      label: "Cooking Class",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/42d2048fd178191ed248ce03147318489f5ccec5?placeholderIfAbsent=true",
      label: "Fine Dining",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/10055516d62f43efbcd8ecd26b10151285d1b09c?placeholderIfAbsent=true",
      label: "Corporate Dining",
    },
  ];

  const includes = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dcc49a08f3981f3cb076ea71501491a02d8f23c7?placeholderIfAbsent=true",
      label: "All ingredients",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2cb5d68ef32696605623df89d6521b7fcab1d489?placeholderIfAbsent=true",
      label: "Chef's travel and insurance costs",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/c5ead369dbe6526e295386787d9d64fa6f2d6216?placeholderIfAbsent=true",
      label: "Serving and Cleanup",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/aba0a5adcb3330dceb24b3eb90f281102e6d7b95?placeholderIfAbsent=true",
      label: "Money Protection",
    },
  ];

  return (
    <aside className="shadow-[0px_4px_70px_0px_rgba(0,0,0,0.07)] w-full bg-white px-[22px] py-[19px] rounded-lg max-md:mt-[33px] max-md:pl-5">
      <div className="flex w-full flex-col items-stretch">
        <div className="flex w-full max-w-[351px] flex-col items-stretch">
          <div className="flex items-center gap-5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b8c11ad88b00cdfbfd0dac9c16bd04c1ac816df3?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-20 self-stretch shrink-0 my-auto rounded-lg"
              alt="Chef Titilayo John"
            />
            <div className="self-stretch my-auto">
              <h2 className="text-[#323335] text-2xl font-semibold leading-none">
                Chef Titilayo John
              </h2>
              <div className="flex gap-2 text-sm mt-2">
                <div className="flex items-center gap-1 text-[#3F3E3D] font-normal whitespace-nowrap leading-none">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b73fa66b42753b3eb98e14ce56f8eb5e5d171792?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-[15px] self-stretch shrink-0 my-auto rounded-lg"
                    alt="Location"
                  />
                  <span className="text-[#3F3E3D] self-stretch w-[55px] my-auto">
                    London
                  </span>
                </div>
                <div className="flex items-center text-[#323335]">
                  <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/4f464046760e9f98430e539a21a9defadc460a12?placeholderIfAbsent=true"
                      className="aspect-[1.06] object-contain w-[17px] self-stretch shrink-0 my-auto rounded-lg"
                      alt="Rating"
                    />
                    <span className="text-[#323335] self-stretch w-7 my-auto">
                      4.6
                    </span>
                  </div>
                  <span className="text-[#323335] font-light self-stretch my-auto">
                    (23 Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[#6f6e6d] text-xs font-normal leading-[22px] mt-2">
            3 years experience in culinary but became a chef a year ago. Worked
            with restaurants and other chefs. Born in Milan, grew up in{" "}
            <span className="underline text-[#FCC01C] cursor-pointer hover:text-[#e6ac19]">
              read more
            </span>
          </p>

          <div className="flex w-full max-w-[349px] gap-[9px] text-[10px] text-[#060605] font-medium flex-wrap mt-2">
            {services.map((service, index) => (
              <Badge
                key={index}
                className="gap-[7px] text-[7px] px-[9px] py-[3px]"
              >
                <img
                  src={service.icon}
                  className="aspect-[1] object-contain w-2.5 self-stretch shrink-0 my-auto"
                  alt=""
                />
                <span>{service.label}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <Button variant="outline" size="sm" className="w-full">
            View Profile
          </Button>
        </div>
      </div>

      <hr className="w-full stroke-[1px] stroke-[#E7E7E7] mt-[22px] border-[#E7E7E7]" />

      <div className="text-[#3F3E3D] mt-[17px]">
        <div className="max-w-full w-[351px] rounded-[0px_0px_0px_0px]">
          <div className="flex w-full flex-col items-stretch justify-center bg-[#FFFCF5] px-5 py-4 rounded-lg">
            <div className="flex items-center gap-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/867c6c46926a904b42225a123b24281a7275bc9e?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[50px] self-stretch shrink-0 my-auto"
                alt="Available"
              />
              <div className="self-stretch my-auto">
                <h3 className="text-[#3F3E3D] text-sm font-semibold leading-none">
                  Congratulations, She&apos;s available
                </h3>
                <p className="text-[#3F3E3D] text-xs font-normal">
                  Chef Titilayo is usually fully booked.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-full w-[351px] text-sm font-normal mt-2">
          <div className="flex w-full flex-col bg-[#FFFCF5] px-[27px] py-[19px] rounded-[8.483px] max-md:px-5">
            <h3 className="text-black text-base font-medium">
              The booking includes
            </h3>

            {includes.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-[13px] leading-none mt-[18px] first:mt-[18px]"
              >
                <img
                  src={item.icon}
                  className="aspect-[0.96] object-contain w-[27px] self-stretch shrink-0 my-auto"
                  alt=""
                />
                <span className="text-[#3F3E3D] self-stretch my-auto">
                  {item.label}
                </span>
              </div>
            ))}

            <p className="text-[#3F3E3D] text-[8px] leading-[21px] max-md:mr-[9px] mt-3">
              We pay the chefs after the event, to protect your money
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
