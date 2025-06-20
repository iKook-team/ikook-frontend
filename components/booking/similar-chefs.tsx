import React from "react";

import { Badge } from "../ui/badge";

interface Chef {
  image: string;
  location: string;
  price: string;
  name: string;
  rating: string;
  ratingIcon: string;
  reviews: string;
  avatar: string;
  badges: Array<{
    icon: string;
    label: string;
  }>;
}

export const SimilarChefs: React.FC = () => {
  const chefs: Chef[] = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/533770ce26d6614ec2ba2df25fcd51f1a66b5d10?placeholderIfAbsent=true",
      location: "London",
      price: "From £20pp",
      name: "Jim Howard",
      rating: "4.6",
      ratingIcon:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9eb712ed4337d5535f7d87106db4b9ba20819d7c?placeholderIfAbsent=true",
      reviews: "(23 Reviews)",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/29f19a9e30cb91825932bbe3aa38d3322f11eaea?placeholderIfAbsent=true",
      badges: [
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/7c75e38b96082cb66c0a4a783b20c701bd0eb4bb?placeholderIfAbsent=true",
          label: "5 Cuisines",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/5b675e2e83ae77c1e45e32a292a3661af7df9344?placeholderIfAbsent=true",
          label: "40+ People",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/fcd1f8519440d478669282252e964d6a8df08943?placeholderIfAbsent=true",
          label: "4 more",
        },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/03bfb4d4aa55699fcd80fd28772191b3a836c4a5?placeholderIfAbsent=true",
      location: "Lagos",
      price: "From £20pp",
      name: "Jim Howard",
      rating: "4.6",
      ratingIcon:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2f0258e52ba6213ecab04adf12170da0a4a7409b?placeholderIfAbsent=true",
      reviews: "(23 Reviews)",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f0e34a5db2edab23e5bc1e42870a2b9b1f776b5b?placeholderIfAbsent=true",
      badges: [
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/6021a4acf3bf0627101a680c5f99f6d04f87bbf4?placeholderIfAbsent=true",
          label: "5 Cuisines",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/723d98e274728211f16321410db3c4436fb0055b?placeholderIfAbsent=true",
          label: "40+ People",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/21f8323f86a6a6e25855f190b6c3062812c08a26?placeholderIfAbsent=true",
          label: "4 more",
        },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/184e1719bc0cfcca05c38a34f6b8f9d628d3f0f9?placeholderIfAbsent=true",
      location: "London",
      price: "From £20pp",
      name: "Jim Howard",
      rating: "4.6",
      ratingIcon:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/e5a400a6c94fa0ebf83de885bce7d381200f944a?placeholderIfAbsent=true",
      reviews: "(23 Reviews)",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/47ad8b8376537d8a86352f39d28550c9760dc209?placeholderIfAbsent=true",
      badges: [
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f22b9b57bf4fad9274c0cfef945d6b4575a389bd?placeholderIfAbsent=true",
          label: "5 Cuisines",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/600d2928155f850ecffe903c2dae45e6da05706b?placeholderIfAbsent=true",
          label: "40+ People",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/f1dcf5f42fac22cab3b17135a89163720b3c8e52?placeholderIfAbsent=true",
          label: "4 more",
        },
      ],
    },
  ];

  return (
    <section className="mt-11 max-md:max-w-full max-md:mt-10">
      <div className="flex items-center flex-wrap max-md:max-w-full">
        <h2 className="text-black text-2xl font-medium leading-none self-stretch my-auto">
          Similar chefs
        </h2>
        <div className="self-stretch flex gap-[18px] my-auto ml-auto">
          <button className="hover:scale-110 transition-transform">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/e9d1612c0c070e200a45b71d9beebe8d6263d0b5?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[50px] shrink-0"
              alt="Previous"
            />
          </button>
          <button className="hover:scale-110 transition-transform">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/682035c6a5c5564067579d780d3306bfe1c4cb34?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[50px] shrink-0"
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap mt-3 max-md:max-w-full">
        {chefs.map((chef, index) => (
          <article
            key={index}
            className="shadow-[0px_4.942px_4.942px_0px_rgba(0,0,0,0.04)] w-[213px]"
          >
            <div className="border-[color:var(--Black-100,#E7E7E7)] flex w-full flex-col items-stretch bg-white pt-px pb-[11px] rounded-[10.32px] border-[0.688px] border-solid">
              <div className="flex flex-col relative aspect-[1.411] w-full pl-[9px] pr-[21px] py-2 rounded-[10px_10px_0px_0px] max-md:pr-5">
                <img
                  src={chef.image}
                  className="absolute h-full w-full object-cover inset-0 rounded-[10px_10px_0px_0px]"
                  alt={chef.name}
                />
                <span className="relative self-stretch w-[31px] bg-white gap-[7px] overflow-hidden text-[7px] text-[#323335] font-normal whitespace-nowrap text-center px-[9px] py-[3px] rounded-[20.64px]">
                  {chef.location}
                </span>
                <span className="relative text-white text-right text-sm font-semibold leading-none mt-[105px] max-md:mt-10">
                  {chef.price}
                </span>
              </div>

              <div className="self-center z-10 flex mt-[-22px] w-[189px] max-w-full items-start gap-5 justify-between">
                <div className="flex flex-col items-stretch mt-7">
                  <h3 className="text-[#030302] text-base font-semibold">
                    {chef.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[#323335]">
                    <div className="self-stretch flex items-center gap-[3px] text-[10px] font-medium whitespace-nowrap my-auto">
                      <img
                        src={chef.ratingIcon}
                        className="aspect-[1] object-contain w-[9px] self-stretch shrink-0 my-auto"
                        alt="Rating"
                      />
                      <span className="text-[#323335] self-stretch w-4 my-auto">
                        {chef.rating}
                      </span>
                    </div>
                    <span className="text-[#323335] text-[7px] font-normal self-stretch my-auto">
                      {chef.reviews}
                    </span>
                  </div>
                </div>
                <img
                  src={chef.avatar}
                  className="aspect-[1.02] object-contain w-[45px] shrink-0"
                  alt={`${chef.name} avatar`}
                />
              </div>

              <hr className="w-[212px] mt-2 border-[#E7E7E7]" />

              <div className="self-center flex items-center gap-1.5 text-xs text-[#BD9015] font-medium text-center tracking-[-0.06px] leading-none mt-[7px]">
                {chef.badges.map((badge, badgeIndex) => (
                  <Badge
                    key={badgeIndex}
                    className="px-1.5 rounded-[6.88px] bg-[#FFF9E8] text-[#BD9015] border-[#FDEEC5]"
                  >
                    <img
                      src={badge.icon}
                      className="aspect-[0.89] object-contain w-2 self-stretch shrink-0 my-auto"
                      alt=""
                    />
                    <span>{badge.label}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
