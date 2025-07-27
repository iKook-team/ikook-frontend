import React from "react";

const BookingSection = () => {
  return (
    <section className="self-stretch flex w-full flex-col pl-[26px] max-md:max-w-full max-md:pl-5">
      <h2 className="text-black text-3xl font-semibold leading-none ml-[65px] mt-[100px] max-md:max-w-full max-md:mt-10">
        Seamless Booking Experience
      </h2>
      <div className="self-center w-full max-w-[1254px] mt-6 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[57%] max-md:w-full max-md:ml-0">
            <article className="bg-[rgba(251,250,249,1)] grow overflow-hidden w-full pt-[228px] pb-12 px-[51px] rounded-[20px] max-md:max-w-full max-md:mt-3 max-md:pt-[100px] max-md:px-5">
              <div className="flex flex-col items-center max-md:max-w-full">
                <h3 className="text-black text-3xl font-semibold leading-none">
                  Flexible Scheduling
                </h3>
                <p className="text-[#3F3E3D] text-center text-lg font-normal leading-7 mt-3 max-md:max-w-full">
                  Choose the date and time that suits you. Our flexible
                  scheduling ensures that you can enjoy a private chef&apos;s
                  expertise whenever you desire.
                </p>
              </div>
            </article>
          </div>
          <div className="w-[43%] ml-5 max-md:w-full max-md:ml-0">
            <article className="bg-[rgba(251,250,249,1)] flex grow flex-col overflow-hidden items-stretch w-full pl-5 pr-[45px] pt-[185px] pb-12 rounded-[20px] max-md:max-w-full max-md:mt-3 max-md:pr-5 max-md:pt-[100px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/5bb87557538bcf1bff2f96b237646665887b56db?placeholderIfAbsent=true"
                className="aspect-[18.18] object-contain w-[362px] self-center max-w-full"
                alt="Event specialization illustration"
              />
              <div className="flex flex-col items-center mt-[23px] max-md:max-w-full">
                <h3 className="text-black text-3xl font-semibold leading-none">
                  Event Specialization
                </h3>
                <p className="text-[#3F3E3D] text-center text-lg font-normal leading-7 mt-3 max-md:max-w-full">
                  Planning a celebration? Our chefs specialize in a variety of
                  events – from romantic dinners to family gatherings and
                  everything in between.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
