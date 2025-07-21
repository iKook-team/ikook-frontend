import React from 'react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-[rgba(252,192,28,1)] self-stretch w-full mt-[134px] px-20 py-[100px] max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[41%] max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/3d4c5f975f65ef7685fe3588ff79571cb159f96f?placeholderIfAbsent=true"
            className="aspect-[0.89] object-contain w-full shadow-[0px_0px_0px_4px_rgba(255,255,255,0.01)] grow rounded-md max-md:max-w-full max-md:mt-10"
            alt="Customer testimonial"
          />
        </div>
        <div className="w-[59%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col items-stretch max-md:max-w-full max-md:mt-10">
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/ba9b4844ef333cb1c8d9b3023e62da062f67d9ad?placeholderIfAbsent=true"
              className="aspect-[333.33] object-contain w-full max-md:max-w-full max-md:mr-0.5"
              alt="Quote decoration"
            />
            <h2 className="text-[#323335] text-[35px] font-medium self-center mt-[9px]">
              What They Say
            </h2>
            <blockquote className="text-[#323335] text-[35px] font-medium mt-[106px] max-md:max-w-full max-md:mr-0.5 max-md:mt-10">
              The food and service was excellent, I was very impressed, I'd
              totally recommend ikook. Excellent way to find the professional
              chef you need for your occasions.
            </blockquote>
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/ba9b4844ef333cb1c8d9b3023e62da062f67d9ad?placeholderIfAbsent=true"
              className="aspect-[333.33] object-contain w-full mt-7 max-md:max-w-full"
              alt="Quote decoration"
            />
            <div className="flex w-full items-stretch gap-5 flex-wrap justify-between mt-[13px] max-md:max-w-full max-md:mr-0.5">
              <div className="text-3xl text-[#323335] font-medium text-justify">
                <div className="text-[#323335]">
                  Stephanie Moore
                </div>
                <img
                  src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1c61455e37f353e5b7a2820d9e211df2e7245509?placeholderIfAbsent=true"
                  className="aspect-[4.72] object-contain w-[137px] max-w-full mt-3"
                  alt="Rating stars"
                />
              </div>
              <div className="flex items-stretch gap-[13px] mt-2">
                <button className="hover:scale-105 transition-transform">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/5f87d7f9fb2055e9b00f163eeed0cd552a755ef3?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-[70px] shrink-0"
                    alt="Previous testimonial"
                  />
                </button>
                <button className="hover:scale-105 transition-transform">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/0224b4c9eb67b5b2b7b466980dd2e29b0a57546c?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-[70px] shrink-0"
                    alt="Next testimonial"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
