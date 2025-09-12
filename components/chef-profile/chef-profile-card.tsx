"use client";
import React from 'react';
import { Tag } from '@/components/chef-profile/tag';

import { RatingStars } from '@/components/chef-profile/rating-stars';

type ChefProfileCardProps = {
  name: string;
  city?: string | null;
  avatar?: string | null;
  averageRating?: number | null;
  numReviews?: number | null;
};

export const ChefProfileCard: React.FC<ChefProfileCardProps> = ({
  name,
  city,
  avatar,
  averageRating,
  numReviews,
}) => {
  const handleMessageChef = () => {
    console.log('Message chef clicked');
  };

  const services = [
    { name: 'Chef at Home', icon: 'https://api.builder.io/api/v1/image/assets/TEMP/15342ec7c9e5b3d1ef18fa7438ecdc0190df0406?placeholderIfAbsent=true' },
    { name: 'Meal Prep', icon: 'https://api.builder.io/api/v1/image/assets/TEMP/69cb6d210adf47c29dcb9f6ebc1b8dd288ea7e55?placeholderIfAbsent=true' },
    { name: 'Large Event', icon: 'https://api.builder.io/api/v1/image/assets/TEMP/5affa372d0bdade93af8090878cdb347457a3ce0?placeholderIfAbsent=true' },
    { name: 'Gormet Delivery', icon: 'https://api.builder.io/api/v1/image/assets/TEMP/96888d36b835387e74626f8334408464567a2366?placeholderIfAbsent=true' },
    { name: 'Cooking Class', icon: 'https://api.builder.io/api/v1/image/assets/TEMP/e066dbfcc877e93023eef91333dcdaca9a9b5bdb?placeholderIfAbsent=true' },
    { name: 'Fine Dining', icon: 'https://api.builder.io/api/v1/image/assets/TEMP/b7f2ee309d54083f5d1402231d95e489fb245951?placeholderIfAbsent=true' },
    { name: 'Corporate Dining', icon: 'https://api.builder.io/api/v1/image/assets/TEMP/6caea4935837e0034ed861ef4d4a3f0483fb49fd?placeholderIfAbsent=true' }
  ];

  return (
    <aside className="shadow-[0_4px_70px_0_rgba(0,0,0,0.07)] flex flex-col items-stretch justify-center w-full bg-white p-[22px] rounded-lg max-md:mt-[33px] max-md:pl-5">
      <article>
        <header className="flex items-center gap-5">
          <img
            src={avatar || "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b8c11ad88b00cdfbfd0dac9c16bd04c1ac816df3?placeholderIfAbsent=true"}
            className="aspect-[1] object-contain w-20 self-stretch shrink-0 my-auto rounded-lg"
            alt={name}
          />
          <div className="self-stretch min-w-60 w-[255px] my-auto">
            <h1 className="text-[#323335] text-2xl font-semibold leading-none">
              {name}
            </h1>
            <div className="flex w-full max-w-[255px] gap-2 text-sm text-[#3F3E3D] flex-wrap mt-2">
              <div className="flex items-center gap-1 font-normal whitespace-nowrap leading-none">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/5f7d266981249757da91cabf3da7787c174af566?placeholderIfAbsent=true"
                  className="aspect-[1.07] object-contain w-[15px] self-stretch shrink-0 my-auto rounded-lg"
                  alt="Location"
                />
                <span className="text-[#3F3E3D] self-stretch w-[55px] my-auto">{city || "-"}</span>
              </div>
              <div className="flex items-center text-[#323335]">
                <div className="self-stretch flex items-center gap-1 font-normal whitespace-nowrap leading-none my-auto">
                  <RatingStars rating={typeof averageRating === 'number' ? averageRating : 0} size="sm" />
                  <span className="text-[#323335] self-stretch w-7 my-auto">{typeof averageRating === 'number' ? averageRating : '-'}</span>
                </div>
                <span className="text-[#323335] font-light self-stretch my-auto">{typeof numReviews === 'number' ? `(${numReviews} Reviews)` : ''}</span>
              </div>
              <div className="flex items-center gap-1 font-normal leading-none">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/55e062223d220fdb4ab572890aa7ab9758407043?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                  alt="Bookings"
                />
                <span className="text-[#3F3E3D] self-stretch my-auto">105 iKooK bookings</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex w-full max-w-[349px] gap-[9px] text-[10px] text-[#060605] font-medium flex-wrap mt-5">
          {services.map((service, index) => (
            <Tag key={index} icon={service.icon}>
              {service.name}
            </Tag>
          ))}
        </div>

        <hr className="aspect-[333.33] object-contain w-[352px] stroke-[1px] stroke-[#E7E7E7] max-w-full mt-6" />

        <div className="flex max-w-full w-[349px] flex-col items-center mt-6">
          <div className="flex w-full max-w-[416px] flex-col items-center pl-8 pr-[33px] max-md:px-5">
            <button
              onClick={handleMessageChef}
              className="justify-center items-center border shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] flex w-full gap-2 overflow-hidden text-base text-white font-semibold bg-[#FCC01C] px-5 py-3 rounded-lg border-solid border-[#D0D5DD] hover:bg-[#e6ac19] transition-colors"
            >
              <span className="text-white self-stretch my-auto">Message Chef</span>
            </button>
            <p className="text-[#3F3E3D] text-sm font-normal leading-none mt-2.5">
              You won&apos;t be charged yet
            </p>
          </div>

          <section className="w-full text-sm text-[#3F3E3D] font-normal mt-6">
            <div className="flex w-full flex-col bg-[#FFFCF5] px-[27px] py-[19px] rounded-[8.483px] max-md:px-5">
              <h3 className="text-black text-base font-medium self-stretch max-md:mr-[5px]">
                Titilayo&apos;s confirmed information
              </h3>
              <div className="flex items-center gap-[13px] whitespace-nowrap leading-none mt-[18px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/ebdd00bda6b8f72b7a6a7adf456050f96ff8b78d?placeholderIfAbsent=true"
                  className="aspect-[0.96] object-contain w-[27px] self-stretch shrink-0 my-auto"
                  alt="Identity verified"
                />
                <span className="text-[#3F3E3D] self-stretch my-auto">Identity</span>
              </div>
              <div className="flex items-center gap-[13px] leading-none mt-[13px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/72bdf506ea9013e291c110da4fea11e5a45064a1?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-[27px] self-stretch shrink-0 my-auto"
                  alt="Skills verified"
                />
                <span className="text-[#3F3E3D] self-stretch my-auto">Culinary skills</span>
              </div>
              <div className="flex items-center gap-[13px] leading-none mt-[13px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/307852eb798160ab16aed12170f585f7a3c71f85?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-[27px] self-stretch shrink-0 my-auto"
                  alt="Email verified"
                />
                <span className="text-[#3F3E3D] self-stretch my-auto">Email address</span>
              </div>
              <div className="flex items-center gap-[13px] leading-none mt-[13px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/fc4a8d81403b3cf3b2daf8786d6c89582ba5d149?placeholderIfAbsent=true"
                  className="aspect-[0.96] object-contain w-[27px] self-stretch shrink-0 my-auto"
                  alt="Money protection"
                />
                <span className="text-[#3F3E3D] self-stretch my-auto">Money Protection</span>
              </div>
              <p className="text-[#3F3E3D] text-[8px] leading-[21px]">
                We pay the chefs after the event, to protect your money
              </p>
            </div>
          </section>
        </div>
      </article>
    </aside>
  );
};