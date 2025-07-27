import React from "react";

interface TestimonialProps {
  quote: string;
  author: string;
  className?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  className = "",
}) => {
  return (
    <article
      className={`flex flex-col items-stretch text-[#323335] font-medium ${className}`}
    >
      <blockquote className="text-[#323335] text-[35px] max-md:max-w-full max-md:mr-0.5">
        {quote}
      </blockquote>
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/ba9b4844ef333cb1c8d9b3023e62da062f67d9ad?placeholderIfAbsent=true"
        className="aspect-[333.33] object-contain w-full mt-7 max-md:max-w-full"
        alt="Rating stars"
      />
      <cite className="text-[#323335] text-justify text-3xl mt-[13px] not-italic">
        {author}
      </cite>
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/22c99495a77d9c38bbfdbff469b721092dd596b8?placeholderIfAbsent=true"
        className="aspect-[4.72] object-contain w-[137px] max-w-full mt-3"
        alt="Customer"
      />
    </article>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="bg-[rgba(252,192,28,1)] self-stretch flex w-full flex-col items-stretch mt-[100px] pt-[67px] pb-[37px] max-md:max-w-full max-md:mt-10">
      <div className="flex w-full flex-col items-stretch text-[35px] text-[#323335] font-medium px-20 max-md:max-w-full max-md:px-5">
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/3ef29dca4d20f8f52a16e13819dcb4a96aee71fc?placeholderIfAbsent=true"
          className="aspect-[500] object-contain w-full max-w-[1259px] max-md:max-w-full"
          alt="Decorative element"
        />
        <h2 className="text-[#323335] self-center mt-3">What They Say</h2>
      </div>
      <div className="w-full max-w-[1352px] mt-[115px] max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[57%] max-md:w-full max-md:ml-0">
            <Testimonial
              quote="The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions."
              author="Stephanie Moore"
              className="mt-1 max-md:max-w-full max-md:mt-10"
            />
          </div>
          <div className="w-[43%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col items-stretch max-md:max-w-full max-md:mt-10">
              <Testimonial
                quote="The food and service was excellent, I was very impressed, I'd totally recommend ikook. Excellent way to find the professional chef you need for your occasions."
                author="Stephanie Moore"
              />
              <div className="flex items-stretch gap-[13px] mr-[91px] mt-[26px] max-md:mr-2.5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/efa9222aeed914e951c0a19f746475c23c885eae?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-[70px] shrink-0"
                  alt="Navigation arrow left"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/537407a3c73d3e7cc7bc77bce92b4561c32e501d?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-[70px] shrink-0"
                  alt="Navigation arrow right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
