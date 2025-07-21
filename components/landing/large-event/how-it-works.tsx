import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="justify-center w-full max-w-[1388px] overflow-hidden bg-[#FCC01C] mt-[100px] pt-[37px] pb-[60px] px-[65px] rounded-[20px] max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-6/12 max-md:w-full max-md:ml-0">
          <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
            <h2 className="text-black text-3xl font-semibold leading-none">
              How It Works
            </h2>
            <article className="overflow-hidden bg-[#FFFCF5] mt-6 px-8 py-[30px] rounded-[20px] max-md:max-w-full max-md:px-5">
              <div className="flex w-[50px] flex-col items-center text-4xl text-[#FCC01C] font-bold whitespace-nowrap tracking-[-0.72px] leading-none justify-center h-[50px] bg-[#FDEEC5] px-[18px] rounded-[5px]">
                <span className="text-[#FCC01C]">1</span>
              </div>
              <div className="mt-[26px] max-md:max-w-full">
                <h3 className="text-black text-2xl font-semibold leading-none">
                  Browse Event Chefs
                </h3>
                <p className="text-[#3F3E3D] text-base font-normal mt-2 max-md:max-w-full">
                  Explore our curated list of chefs with expertise in
                  large-scale events.
                </p>
              </div>
            </article>
            <article className="overflow-hidden bg-[#FFFCF5] mt-3 px-8 py-5 rounded-[20px] max-md:max-w-full max-md:px-5">
              <div className="flex w-[50px] flex-col items-center text-4xl text-[#FCC01C] font-bold whitespace-nowrap tracking-[-0.72px] leading-none justify-center h-[50px] bg-[#FDEEC5] px-[15px] rounded-[5px]">
                <span className="text-[#FCC01C]">2</span>
              </div>
              <div className="mt-[22px] max-md:max-w-full">
                <h3 className="text-black text-2xl font-semibold leading-none">
                  Event Planning
                </h3>
                <p className="text-[#3F3E3D] text-base font-normal leading-6 mt-2 max-md:max-w-full">
                  Provide details about your event, including the type, theme,
                  and budget.
                </p>
              </div>
            </article>
          </div>
        </div>
        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <article className="grow overflow-hidden w-full bg-[#FFFCF5] mt-[62px] pl-8 pt-[23px] pb-[43px] rounded-[20px] max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-6/12 max-md:w-full max-md:ml-0">
                <div className="max-md:mt-10">
                  <div className="flex w-[50px] flex-col items-center text-4xl text-[#FCC01C] font-bold whitespace-nowrap tracking-[-0.72px] leading-none justify-center h-[50px] bg-[#FDEEC5] px-3.5 rounded-[5px]">
                    <span className="text-[#FCC01C]">3</span>
                  </div>
                  <div className="mt-16 max-md:mt-10">
                    <h3 className="text-black text-2xl font-semibold leading-none">
                      Craft Your Menu
                    </h3>
                    <p className="text-[#3F3E3D] text-base font-normal leading-6 mt-3">
                      Collaborate with the chef to design a bespoke menu that
                      suits your event's ambiance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                <img
                  src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/7e9aa8684450aa59dc59b0e75918d52f39057621?placeholderIfAbsent=true"
                  className="aspect-[0.73] object-contain w-full shadow-[2px_5px_40px_rgba(0,0,0,0.1)] grow max-md:mt-10"
                  alt="Chef crafting custom menu"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
