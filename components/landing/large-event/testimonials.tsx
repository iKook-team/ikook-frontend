import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-[rgba(252,192,28,1)] self-stretch flex w-full flex-col items-stretch mt-[100px] pt-[67px] pb-[37px] max-md:max-w-full max-md:mt-10">
      <div className="flex w-full flex-col items-stretch text-[35px] text-[#323335] font-medium px-20 max-md:max-w-full max-md:px-5">
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/3ef29dca4d20f8f52a16e13819dcb4a96aee71fc?placeholderIfAbsent=true"
          className="aspect-[500] object-contain w-full max-w-[1259px] max-md:max-w-full"
          alt="Decorative stars"
        />
        <h2 className="text-[#323335] self-center mt-3">What They Say</h2>
      </div>
      <div className="w-full max-w-[1352px] mt-[115px] max-md:max-w-full max-md:mt-10 mx-auto px-4">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <article className="w-[57%] max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch text-[#323335] font-medium mt-1 max-md:max-w-full max-md:mt-10">
              <blockquote className="text-[#323335] text-[35px] max-md:max-w-full max-md:mr-0.5">
                The food and service was excellent, I was very impressed,
                I&apos;d totally recommend ikook. Excellent way to find the
                professional chef you need for your occasions.
              </blockquote>
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/ba9b4844ef333cb1c8d9b3023e62da062f67d9ad?placeholderIfAbsent=true"
                className="aspect-[333.33] object-contain w-full mt-7 max-md:max-w-full"
                alt="Rating stars"
              />
              <cite className="text-[#323335] text-justify text-3xl mt-[13px] not-italic">
                Stephanie Moore
              </cite>
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/22c99495a77d9c38bbfdbff469b721092dd596b8?placeholderIfAbsent=true"
                className="aspect-[4.72] object-contain w-[137px] max-w-full mt-3"
                alt="Customer"
              />
            </div>
          </article>
          <article className="w-[43%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col items-stretch max-md:max-w-full max-md:mt-10">
              <blockquote className="text-[#323335] text-[35px] font-medium max-md:max-w-full">
                The food and service was excellent, I was very impressed,
                I&apos;d totally recommend ikook. Excellent way to find the
                professional chef you need for your occasions.
              </blockquote>
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/a042c0fedfad6e8fd7448679c90c7caf4c05a995?placeholderIfAbsent=true"
                className="aspect-[250] object-contain w-full mt-7 max-md:max-w-full"
                alt="Rating stars"
              />
              <cite className="text-[#323335] text-justify text-3xl font-medium mt-[13px] not-italic">
                Stephanie Moore
              </cite>
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/22c99495a77d9c38bbfdbff469b721092dd596b8?placeholderIfAbsent=true"
                className="aspect-[4.72] object-contain w-[137px] max-w-full mt-3"
                alt="Customer"
              />
              <div className="flex items-stretch gap-[13px] mr-[91px] mt-[26px] max-md:mr-2.5">
                <button className="hover:scale-105 transition-transform">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/5ede4c4dee62756642495f7781f16b607d43d22a?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-[70px] shrink-0"
                    alt="Previous testimonial"
                  />
                </button>
                <button className="hover:scale-105 transition-transform">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/0c6ca8b819ae41a8f4038da2da8f2b2fd5435741?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-[70px] shrink-0"
                    alt="Next testimonial"
                  />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
