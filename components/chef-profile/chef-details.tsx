import React from "react";

import { Tag } from "@/components/chef-profile/tag";

type ChefDetailsProps = {
  bio?: string;
  cuisines?: string[];
};

export const ChefDetails: React.FC<ChefDetailsProps> = ({
  bio,
  cuisines = [],
}) => {
  const qualities = [
    "Highly rated",
    "Impeccable cleanliness",
    "Reliable",
    "Fast communication",
  ];
  const events = ["Wedding", "Birthday", "Bachelor's Party", "Night Party"];

  return (
    <main className="grow max-md:max-w-full max-md:mt-[33px]">
      <section className="max-w-full w-[688px]">
        <article className="border flex flex-col items-stretch justify-center bg-white px-5 py-[27px] rounded-[15px] border-solid border-[#E7E7E7] max-md:max-w-full">
          <div className="max-md:max-w-full">
            {bio ? (
              <p className="text-[#6F6E6D] text-base font-normal leading-6 max-md:max-w-full">
                {bio}
              </p>
            ) : null}
            <div className="w-[613px] max-w-full text-base text-black font-medium mt-6">
              <div className="mt-4">Response time: within 1 day</div>
              <div className="w-full max-w-[613px] text-sm text-[#060605] mt-4 max-md:max-w-full">
                <div className="flex w-full gap-2 flex-wrap max-md:max-w-full">
                  {qualities.map((quality, index) => (
                    <Tag key={index}>{quality}</Tag>
                  ))}
                </div>
              </div>
            </div>
            <hr className="aspect-[500] object-contain w-[644px] stroke-[1px] stroke-[#E7E7E7] max-w-full mt-6" />
            <div className="w-full max-w-[641px] mt-6 max-md:max-w-full">
              <h3 className="text-black text-base font-semibold">
                Cuisines I can cook
              </h3>
              <div className="flex w-full gap-2 text-sm text-[#060605] font-medium flex-wrap mt-[9px] max-md:max-w-full">
                {(cuisines && cuisines.length > 0
                  ? cuisines
                  : ["African", "Italian", "Chinese"]
                ).map((cuisine, index) => (
                  <Tag key={index}>{cuisine}</Tag>
                ))}
              </div>
            </div>
            <div className="w-[613px] max-w-full mt-6">
              <h3 className="text-black text-base font-semibold">
                Events I&apos;m available for
              </h3>
              <div className="flex w-full max-w-[613px] gap-2 text-sm text-[#060605] font-medium flex-wrap mt-[9px] max-md:max-w-full">
                {events.map((event, index) => (
                  <Tag key={index}>{event}</Tag>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};
