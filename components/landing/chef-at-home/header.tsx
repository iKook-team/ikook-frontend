import React from "react";

const Header = () => {
  return (
    <header className="flex w-[666px] max-w-full items-stretch gap-[40px_43px] flex-wrap">
      <nav className="flex gap-[40px_60px] text-base text-[#3F3E3D] font-medium grow shrink basis-auto my-auto">
        <a
          href="#menu"
          className="text-[#3F3E3D] hover:text-[#FCC01C] transition-colors"
        >
          Explore Menu
        </a>
        <a
          href="#how-it-works"
          className="text-[#3F3E3D] hover:text-[#FCC01C] transition-colors"
        >
          How it works
        </a>
        <div className="flex flex-col relative aspect-[2] w-12 whitespace-nowrap">
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/36377412-ae83-42bf-8aa9-4be1c9bd4c74?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Gift icon"
          />
          <a
            href="#gift"
            className="relative text-[#3F3E3D] hover:text-[#FCC01C] transition-colors"
          >
            Gift
          </a>
        </div>
      </nav>
      <div className="flex items-center gap-[38px]">
        <div className="self-stretch flex gap-6 text-base text-[#3F3E3D] font-medium whitespace-nowrap leading-none my-auto">
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/e1357470ea48b0ac45db16380c5d5809749f221e?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-6 shrink-0"
            alt="User icon"
          />
          <a
            href="#login"
            className="text-[#3F3E3D] hover:text-[#FCC01C] transition-colors"
          >
            Login
          </a>
        </div>
        <div className="self-stretch flex items-center gap-3 my-auto">
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/70d79e0e7e655e4599cbd4d20e908b2e1e1e2c32?placeholderIfAbsent=true"
            className="aspect-[1.75] object-contain w-[84px] self-stretch shrink-0 my-auto rounded-[0px_0px_0px_0px]"
            alt="Language selector"
          />
          <img
            src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/3dfc41433201d62b5155cc1b58dbf10f66b32f97?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[22px] shadow-[0px_0px_0px_4px_rgba(255,255,255,0.01)] self-stretch shrink-0 my-auto"
            alt="Menu toggle"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
