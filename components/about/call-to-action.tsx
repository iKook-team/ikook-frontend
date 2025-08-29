import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-stretch">
      <div className="w-full bg-[rgba(252,192,28,0.10)] mt-[79px] px-6 md:px-10 py-[62px] rounded-[10px] max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[46%] max-md:w-full max-md:ml-0">
            <div className="flex flex-col self-stretch items-stretch text-[#323335] font-semibold my-auto max-md:max-w-full max-md:mt-10">
              <h2 className="text-[#323335] text-[35px] leading-none max-md:max-w-full">
                Book a Private Chef now
              </h2>
              <button className="text-[#323335] text-lg mt-[57px] max-md:mt-10 hover:text-[#FCC01C] transition-colors">
                Get Started
              </button>
            </div>
          </div>
          <div className="w-[54%] ml-5 max-md:w-full max-md:ml-0">
            <div className="grow max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-6/12 max-md:w-full max-md:ml-0">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/7662785d6bf552203a8a5c825beac445ca4d3088?placeholderIfAbsent=true"
                    className="aspect-[0.9] object-contain w-full shadow-[4px_4px_18px_rgba(0,0,0,0.1)] grow mt-9 rounded-md max-md:mt-10"
                    alt="Chef cooking"
                  />
                </div>
                <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/8e68e5e63ec9023f07c14efbaeec12415c273b96?placeholderIfAbsent=true"
                    className="aspect-[0.91] object-contain w-full shadow-[4px_4px_18px_rgba(0,0,0,0.1)] rounded-md max-md:mt-4"
                    alt="Dining experience"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;