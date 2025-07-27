import React from "react";

import { Button } from "../ui/button";

interface MenuCard {
  image: string;
  cuisine: string;
  title: string;
  price: string;
  heartIcon: string;
}

export const MenusSection: React.FC = () => {
  const menus: MenuCard[] = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/1abf8321a13811b531ddddc68013542ba0053650?placeholderIfAbsent=true",
      cuisine: "Italian",
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      heartIcon:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/b4e3e77d45a59345b763f6043f3ffb954e5f5364?placeholderIfAbsent=true",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/0a0b187a2d6331d0606e74e55027b7bd0278189b?placeholderIfAbsent=true",
      cuisine: "Italian",
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      heartIcon:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/2d50f9c10e0a61a271d0704d904880744ca43793?placeholderIfAbsent=true",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/febb8420de2e72ae4d3f21727bfed1ce336ef3c9?placeholderIfAbsent=true",
      cuisine: "Italian",
      title: "Grilled Barbeque Dishes",
      price: "£20pp",
      heartIcon:
        "https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/abb936b34363d30a8df0f0411c7c10288f2f7add?placeholderIfAbsent=true",
    },
  ];

  return (
    <section className="shadow-[0px_2px_19px_rgba(0,0,0,0.03)] max-w-full w-[690px] mt-11 max-md:mt-10">
      <div className="border-[color:var(--Black-100,#E7E7E7)] bg-white pt-[19px] pb-2.5 px-5 rounded-[9.308px] border-[0.621px] border-solid max-md:max-w-full">
        <div className="flex flex-col items-stretch max-md:max-w-full">
          <div className="max-md:max-w-full">
            <h2 className="text-black text-2xl font-medium leading-none">
              Menus
            </h2>
            <div className="flex gap-2 flex-wrap mt-3 max-md:max-w-full">
              {menus.map((menu, index) => (
                <article key={index} className="w-[210px]">
                  <div className="border-[color:var(--Yellow-0,#FFFCF5)] bg-white rounded-[10.176px] border-[0.678px] border-solid">
                    <div className="flex flex-col relative aspect-[1.206] w-full px-2 py-2.5 rounded-[10px]">
                      <img
                        src={menu.image}
                        className="absolute h-full w-full object-cover inset-0 rounded-[10px]"
                        alt={menu.title}
                      />
                      <div className="relative flex items-center gap-[40px_129px] text-[7px] text-[#323335] font-normal whitespace-nowrap text-center">
                        <div className="self-stretch w-12 my-auto rounded-[20px]">
                          <span className="self-stretch w-[31px] bg-white gap-[7px] overflow-hidden pl-[9px] pr-2 py-[3px] rounded-[20.352px] inline-block">
                            {menu.cuisine}
                          </span>
                        </div>
                        <button className="hover:scale-110 transition-transform">
                          <img
                            src={menu.heartIcon}
                            className="aspect-[1] object-contain w-[17px] self-stretch shrink-0 my-auto"
                            alt="Add to favorites"
                          />
                        </button>
                      </div>
                      <div className="relative flex items-center gap-2 mt-[121px] max-md:mr-0.5 max-md:mt-10">
                        <h3 className="text-white text-[9px] font-semibold leading-none self-stretch w-[149px] my-auto">
                          {menu.title}
                        </h3>
                        <span className="text-[#FCC01C] text-right text-[11px] font-bold leading-normal self-stretch my-auto">
                          {menu.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <Button variant="outline" size="sm">
              View all menus (10)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
