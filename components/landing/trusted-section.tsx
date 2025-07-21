import React from 'react';

export const TrustedSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center mt-[73px] max-md:mt-10">
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2db9fc78cdc9cd82a6055fa610cfcf0ac54838db?placeholderIfAbsent=true"
        className="aspect-[500] object-contain w-full max-w-[1255px] max-md:max-w-full"
        alt="Decorative line"
      />
      <h2 className="text-[#323335] text-[35px] font-medium mt-4 max-md:max-w-full text-center">
        Trusted by huge Organizations
      </h2>
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/2db9fc78cdc9cd82a6055fa610cfcf0ac54838db?placeholderIfAbsent=true"
        className="aspect-[500] object-contain w-full max-w-[1255px] mt-4 max-md:max-w-full"
        alt="Decorative line"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/aa4beab3c119dfaf77debb312e59858c4e1ba582?placeholderIfAbsent=true"
        className="aspect-[15.38] object-contain w-[833px] max-w-full mt-[33px]"
        alt="Partner organizations logos"
      />
      <p className="text-[#323335] text-xl font-medium mt-[23px] max-md:max-w-full text-center">
        and individuals for Private dining, Corporate, Small and Large events
      </p>
    </section>
  );
};
