import React from 'react';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  className?: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, className = "" }) => {
  return (
    <div className={`overflow-hidden bg-[#FFFCF5] px-8 py-[30px] rounded-[20px] max-md:max-w-full max-md:px-5 ${className}`}>
      <div className="flex w-[50px] flex-col items-center text-4xl text-[#FCC01C] font-bold whitespace-nowrap tracking-[-0.72px] leading-none justify-center h-[50px] bg-[#FDEEC5] px-[18px] rounded-[5px]">
        <div className="text-[#FCC01C]">{number}</div>
      </div>
      <div className="mt-[26px] max-md:max-w-full">
        <h4 className="text-black text-2xl font-semibold leading-none">
          {title}
        </h4>
        <p className="text-[#3F3E3D] text-base font-normal mt-2 max-md:max-w-full">
          {description}
        </p>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  return (
    <section className="self-stretch flex w-full flex-col pl-[26px] max-md:max-w-full max-md:pl-5">
      <div className="justify-center w-full max-w-[1388px] overflow-hidden bg-[#FCC01C] mt-[100px] pt-[37px] pb-[60px] px-[65px] rounded-[20px] max-md:max-w-full max-md:mt-10 max-md:px-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-6/12 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
              <h2 className="text-black text-3xl font-semibold leading-none">
                How It Works
              </h2>
              <StepCard
                number="1"
                title="Explore our menus"
                description="Browse through our diverse menu crafted by our chefs"
                className="mt-6"
              />
              <StepCard
                number="2"
                title="Select a menus"
                description="Pick your choice from the list of menus by our chefs"
                className="mt-3"
              />
            </div>
          </div>
          <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="grow overflow-hidden w-full bg-[#FFFCF5] mt-[62px] pl-8 pt-6 rounded-[20px] max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-6/12 max-md:w-full max-md:ml-0">
                  <div className="max-md:mt-10">
                    <div className="flex w-[50px] flex-col items-center text-4xl text-[#FCC01C] font-bold whitespace-nowrap tracking-[-0.72px] leading-none justify-center h-[50px] bg-[#FDEEC5] px-3.5 rounded-[5px]">
                      <div className="text-[#FCC01C]">3</div>
                    </div>
                    <div className="mt-16 max-md:mt-10">
                      <h4 className="text-black text-2xl font-semibold leading-none">
                        Book with Ease
                      </h4>
                      <p className="text-[#3F3E3D] text-base font-normal leading-6 mt-3">
                        Enjoy a hassle-free booking process and anticipate a
                        culinary adventure like no other.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/0b1d6d25e44812771ac0f6d9b1a46de5a7cd637f?placeholderIfAbsent=true"
                    className="aspect-[0.73] object-contain w-full grow max-md:mt-10"
                    alt="Booking process illustration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/537a7affc2e54825e425ab43312bdd98269d1655?placeholderIfAbsent=true"
        className="aspect-[2.46] object-contain w-full max-w-[1352px] mt-[100px] max-md:max-w-full max-md:mt-10"
        alt="Decorative divider"
      />
    </section>
  );
};

export default HowItWorksSection;
