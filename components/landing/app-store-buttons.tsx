import React from 'react';

export const AppStoreButtons: React.FC = () => {
  return (
    <div className="flex min-w-60 gap-[11px]">
      <button className="border flex min-h-12 gap-2 text-[#0F0E0C] text-center pb-2 px-5 rounded-lg border-[rgba(186,186,186,1)] border-solid hover:bg-gray-50 transition-colors">
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/fb84ec936e046f8a47cde3301edd1147a0fd30f6?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-8 fill-black shrink-0"
          alt="App Store"
        />
        <div className="flex flex-col">
          <div className="text-[#0F0E0C] text-xs font-light leading-6">
            Get on
          </div>
          <div className="text-[#0F0E0C] text-base font-semibold">
            App Store
          </div>
        </div>
      </button>
      <button className="border flex min-h-12 gap-2 pb-2 px-5 rounded-lg border-[rgba(186,186,186,1)] border-solid hover:bg-gray-50 transition-colors">
        <div className="bg-black flex items-center gap-2.5 overflow-hidden w-[31px] h-[31px] px-[7px] py-1.5 rounded-md">
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/5b32737337fe9299df9f544b003ffb24d88a9c80?placeholderIfAbsent=true"
            className="aspect-[0.89] object-contain w-[17px] fill-neutral-100"
            alt="Play Store"
          />
        </div>
        <div className="flex flex-col text-[#0F0E0C] text-center">
          <div className="text-[#0F0E0C] text-xs font-light leading-6">
            Get on
          </div>
          <div className="text-[#0F0E0C] text-base font-semibold">
            Play Store
          </div>
        </div>
      </button>
    </div>
  );
};