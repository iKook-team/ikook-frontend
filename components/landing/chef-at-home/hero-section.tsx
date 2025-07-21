import React from 'react';
import Header from './header';

const HeroSection = () => {
  return (
    <section className="self-stretch flex w-full flex-col pl-[26px] max-md:max-w-full max-md:pl-5">
      <div className="self-center w-full max-w-[1258px] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[41%] max-md:w-full max-md:ml-0">
            <div className="z-10 flex mr-[-63px] w-full flex-col items-stretch text-[#323335] font-medium mt-[182px] max-md:max-w-full max-md:mt-10">
              <h1 className="text-[#323335] text-[50px] leading-none mr-[34px] max-md:max-w-full max-md:text-[40px] max-md:mr-2.5">
                Hire a Chef at Home
              </h1>
              <p className="text-[#323335] text-3xl leading-[42px] mt-2.5 max-md:max-w-full">
                where culinary excellence meets the comfort of your own space.
              </p>
              <p className="text-[#6F6E6D] text-sm font-normal leading-5 w-[414px] mt-[29px]">
                Elevate your dining experience with our curated selection of
                private chefs who bring the restaurant to your doorstep.
              </p>
              <div className="flex text-lg text-white font-semibold leading-loose mt-[62px] rounded-[30px] max-md:mt-10">
                <button className="justify-center items-center border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex min-w-60 gap-3 overflow-hidden bg-[#FCC01C] px-7 py-4 rounded-[30px] border-solid border-[#FCC01C] max-md:px-5 hover:bg-[#e6ac19] transition-colors">
                  <span className="text-white self-stretch my-auto">
                    Explore our Menu
                  </span>
                  <img
                    src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/df85ea64fb942f518cf32d6a0620ed2495bc00ad?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                    alt="Arrow icon"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="w-[59%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col items-stretch max-md:max-w-full">
              <Header />
              <div className="mt-[132px] max-md:max-w-full max-md:mt-10">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                  <div className="w-3/5 max-md:w-full max-md:ml-0">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/58ab7f5abdbc0a6e2fbfc502e801e7b6c19a331f?placeholderIfAbsent=true"
                      className="aspect-[1.21] object-contain w-full grow rounded-[0px_0px_0px_0px] max-md:max-w-full max-md:mt-4"
                      alt="Chef cooking"
                    />
                  </div>
                  <div className="w-2/5 ml-5 max-md:w-full max-md:ml-0">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/3df44774d5d943216511540ce987d3b7eded3cda?placeholderIfAbsent=true"
                      className="aspect-[0.82] object-contain w-full grow rounded-[20px] max-md:mt-[18px]"
                      alt="Prepared dish"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
