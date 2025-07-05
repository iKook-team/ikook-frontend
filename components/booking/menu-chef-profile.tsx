import Image from "next/image";
import React from "react";

export const ChefProfile: React.FC = () => {
  const handleViewProfile = () => {
    // TODO: Implement view profile logic
  };

  const handleMessageChef = () => {
    // TODO: Implement message chef logic
  };

  return (
    <section className="w-full max-w-[1115px] mt-[71px] max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-6/12 max-md:w-full max-md:ml-0">
          <article className="flex w-full flex-col bg-[#FFFCF5] mx-auto px-[34px] py-7 rounded-lg max-md:max-w-full max-md:mt-9 max-md:px-5">
            <div className="flex items-stretch gap-[19px]">
              <Image
                alt="Chef Titilayo John"
                className="object-contain shrink-0 rounded-lg"
                height={80}
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b8c11ad88b00cdfbfd0dac9c16bd04c1ac816df3?placeholderIfAbsent=true"
                width={80}
              />
              <div className="my-auto">
                <h3 className="text-[#323335] text-2xl font-semibold leading-none">
                  Chef Titilayo John
                </h3>
                <div className="flex gap-2 text-sm mt-2">
                  <div className="flex items-center gap-1 text-[#3F3E3D] font-normal whitespace-nowrap leading-none">
                    <Image
                      alt="Location"
                      className="object-contain self-stretch shrink-0 my-auto rounded-lg"
                      height={14}
                      src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/dfcd46b6803d624324159219dfd8ae78bb76aa0c?placeholderIfAbsent=true"
                      width={15}
                    />
                    <span className="text-[#3F3E3D] self-stretch w-[55px] my-auto">
                      London
                    </span>
                  </div>
                  <div className="flex items-center text-[#323335]">
                    <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                      <Image
                        alt="Rating"
                        className="object-contain self-stretch shrink-0 my-auto rounded-lg"
                        height={17}
                        src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/607894db2d671e85c5a1076a938020fc1900cee9?placeholderIfAbsent=true"
                        width={17}
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
            <p className="text-[#6f6e6d] text-sm font-normal self-stretch mt-[26px] max-md:max-w-full">
              3 years experience in culinary but became a chef a year ago.
              Worked with restaurants and other chefs. Born in Milan, grew up in{" "}
              <span
                style={{
                  textDecoration: "underline",
                  color: "rgba(252,192,28,1)",
                }}
              >
                read more
              </span>
            </p>
            <div className="flex items-center gap-4 text-xs text-[#060605] font-medium mt-6">
              <div className="self-stretch flex items-center gap-[5px] my-auto">
                <Image
                  alt="Service"
                  className="object-contain self-stretch shrink-0 my-auto"
                  height={12}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f200b755364de2e8d4f12a4b91851c38dfd032e5?placeholderIfAbsent=true"
                  width={12}
                />
                <span className="text-[#060605] self-stretch my-auto">
                  Chef at Home
                </span>
              </div>
              <div className="self-stretch flex items-center gap-[5px] my-auto">
                <Image
                  alt="Service"
                  className="object-contain self-stretch shrink-0 my-auto"
                  height={12}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f200b755364de2e8d4f12a4b91851c38dfd032e5?placeholderIfAbsent=true"
                  width={12}
                />
                <span className="text-[#060605] self-stretch my-auto">
                  Large Event
                </span>
              </div>
              <div className="self-stretch flex items-center gap-[5px] my-auto">
                <Image
                  alt="Service"
                  className="object-contain self-stretch shrink-0 my-auto"
                  height={12}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f200b755364de2e8d4f12a4b91851c38dfd032e5?placeholderIfAbsent=true"
                  width={12}
                />
                <span className="text-[#060605] self-stretch my-auto">
                  Meal Prep
                </span>
              </div>
              <div className="self-stretch flex items-center gap-[5px] my-auto">
                <Image
                  alt="Service"
                  className="object-contain self-stretch shrink-0 my-auto"
                  height={12}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f200b755364de2e8d4f12a4b91851c38dfd032e5?placeholderIfAbsent=true"
                  width={12}
                />
                <span className="text-[#060605] self-stretch my-auto">
                  +3 More
                </span>
              </div>
            </div>
            <button
              className="flex text-sm text-[#344054] font-semibold leading-none mt-[23px] rounded-lg"
              onClick={handleViewProfile}
            >
              <div className="text-[#344054] self-stretch border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-white px-3.5 py-2 rounded-lg border-solid">
                View Profile
              </div>
            </button>
          </article>
        </div>
        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="max-md:max-w-full max-md:mt-9">
            <div className="flex w-full flex-col text-black justify-center bg-[#FFFCF5] px-[26px] py-4 rounded-[15px] max-md:max-w-full max-md:px-5">
              <div className="flex items-center gap-6">
                <Image
                  alt="Available"
                  className="object-contain w-[50px] self-stretch shrink-0 my-auto"
                  height={50}
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/0815e60f5cfc35b62bcc1074b83551b54a44e6f0?placeholderIfAbsent=true"
                  width={50}
                />
                <div className="self-stretch min-w-60 my-auto">
                  <h4 className="text-base font-semibold">
                    Congratulations, She&apos;s available
                  </h4>
                  <p className="text-sm font-normal leading-none">
                    Chef Titilayo is usually fully booked.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col text-sm font-semibold bg-[#FFFCF5] mt-4 pt-[17px] pb-[33px] px-[19px] rounded-[15px] max-md:max-w-full max-md:pr-5">
              <h4 className="text-black text-base leading-6 max-md:max-w-full">
                Want to request a personalised menu based on your requirements?
              </h4>
              <p className="text-[#3F3E3D] font-normal leading-5 self-stretch mt-[21px] max-md:max-w-full">
                Just message chef Titilayo and discuss the details of your event
                and the requirements you have.
              </p>
              <button
                className="flex text-[#344054] leading-none mt-[21px] rounded-lg"
                onClick={handleMessageChef}
              >
                <div className="text-[#344054] self-stretch border border-[color:var(--Gray-300,#D0D5DD)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] gap-2 overflow-hidden bg-white px-3.5 py-2 rounded-lg border-solid">
                  Message Chef
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
