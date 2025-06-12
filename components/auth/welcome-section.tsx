import React from "react";

interface WelcomeSectionProps {
  imageUrl?: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  imageUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/a87e983046a75cf5f53be6a087d73ceeab1df42b?placeholderIfAbsent=true",
}) => {
  return (
    <section className="flex flex-col items-center text-center">
      <img
        src={imageUrl}
        alt="chef/cuate"
        className="w-[245px] h-[242px] mb-[46px] max-md:w-[200px] max-md:h-[197px] max-md:mb-[35px] max-sm:w-[150px] max-sm:h-[148px] max-sm:mb-[25px]"
      />
      <h1 className="text-black text-[19px] font-bold w-[316px] h-[29px] text-center mb-[11px] max-md:text-[17px] max-md:w-full max-sm:text-base max-sm:w-full max-sm:mb-[15px]">
        LETS GET YOU STARTED ON iKOOK
      </h1>
      <p className="w-[508px] text-[#7C7C7C] text-center text-[15px] font-normal h-[46px] mb-[81px] max-md:w-full max-md:text-sm max-md:mb-[60px] max-sm:w-full max-sm:text-[13px] max-sm:mb-10">
        Are you ready to share your culinary passion or Host unforgettable
        dining experiences on iKooK?
      </p>
    </section>
  );
};
