"use client";

import { Button } from "@heroui/react";

import { MenuItem } from "./menus/menu-item";

export const Menu = () => {
  const menus = [
    {
      id: 1,
      title: "British",
      price: "20",
      img: "/menus/menu1.png",
      location: "London",
    },
    {
      id: 2,
      title: "African",
      price: "20",
      img: "/menus/menu2.png",
      location: "London",
    },
    {
      id: 3,
      title: "Spanish",
      price: "20",
      img: "/menus/menu3.png",
      location: "London",
    },
    {
      id: 4,
      title: "Mexican",
      price: "20",
      img: "/menus/menu4.png",
      location: "London",
    },
    {
      id: 5,
      title: "Italian",
      price: "20",
      img: "/menus/menu1.png",
      location: "London",
    },
    {
      id: 6,
      title: "British",
      price: "20",
      img: "/menus/menu2.png",
      location: "London",
    },
    {
      id: 7,
      title: "African",
      price: "20",
      img: "/menus/menu3.png",
      location: "London",
    },
    {
      id: 8,
      title: "Italian",
      price: "20",
      img: "/menus/menu4.png",
      location: "London",
    },
  ];

  return (
    <section className="px-12 max-md:px-6 max-sm:px-4">
      <div className="gap-4 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-8 justify-items-center">
        {menus.map((menu) => (
          <MenuItem key={menu.id} {...menu} />
        ))}
      </div>
      <Button className="bg-[#FCC01C] text-white flex mx-auto mt-16 mb-24">
        Load More
      </Button>
    </section>
  );
};
