import React from "react";

const Header = () => {
  return (
    <header className="bg-white pt-[26px]">
      <div className="flex w-[666px] max-w-full items-stretch gap-[40px_43px] flex-wrap mr-[92px] max-md:mr-2.5 mx-auto">
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
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/65ac5efa-dbcf-4698-9542-c3bfe50f32ce?placeholderIfAbsent=true"
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
              alt="Login icon"
            />
            <button className="text-[#3F3E3D] hover:text-[#FCC01C] transition-colors">
              Login
            </button>
          </div>
          <div className="self-stretch flex items-center gap-3 my-auto">
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/70d79e0e7e655e4599cbd4d20e908b2e1e1e2c32?placeholderIfAbsent=true"
              className="aspect-[1.75] object-contain w-[84px] self-stretch shrink-0 my-auto rounded-[0px_0px_0px_0px]"
              alt="Logo"
            />
            <button className="relative">
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/915b5b2d73f1b25052a76b5d7689ea7553843998?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-[22px] shadow-[0px_0px_0px_4px_rgba(255,255,255,0.01)] self-stretch shrink-0 my-auto"
                alt="Cart"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
