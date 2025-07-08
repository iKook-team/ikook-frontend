"use client";
import React from "react";

import { MenuItem } from "./menu-item";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const MyMenusPage: React.FC = () => {
  const router = useRouter();
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
  ];

  return (
    <div className="flex overflow-hidden flex-col bg-zinc-50">
      <main className="flex flex-col self-center mt-9 w-full max-w-[1114px] max-md:max-w-full">
        <h1 className="self-start ml-28 text-2xl font-semibold leading-none text-black max-md:ml-2.5">
          Menus
        </h1>

        <nav className="flex gap-4 justify-between w-[885px] mt-9 ml-28 text-xs font-medium text-zinc-950 max-md:max-w-full items-center">
          <div className="flex flex-wrap gap-2.5 items-center min-w-60 max-md:max-w-full">
            <button className="overflow-hidden gap-2 self-stretch px-3.5 py-2 border-solid border-[0.767px] border-[color:var(--Black-200,#CFCFCE)] rounded-[30.689px] text-zinc-950">
              Active menus (1)
            </button>
            <button className="overflow-hidden gap-2 self-stretch py-2 pr-3.5 pl-3.5 text-white bg-amber-400 border-solid border-[1.534px] border-[color:var(--Primary-200,#F9DF98)] rounded-[30.689px]">
              Draft (5)
            </button>
            <button className="overflow-hidden gap-2 self-stretch py-2 pr-3.5 pl-3.5 whitespace-nowrap border-solid border-[0.767px] border-[color:var(--Black-200,#CFCFCE)] rounded-[30.689px] text-zinc-950">
              Pending(5)
            </button>
            <button className="overflow-hidden gap-2 self-stretch px-3.5 py-2 border-solid border-[0.767px] border-[color:var(--Black-200,#CFCFCE)] rounded-[30.689px] text-zinc-950">
              Deleted (4)
            </button>
          </div>
          <Button
            size="sm"
            className="bg-amber-400 border-solid border-[1.534px] border-[color:var(--Primary-200,#F9DF98)] rounded-[30.689px] text-white"
            onClick={() => router.push("/menus/create")}
          >
            New Menu
          </Button>
        </nav>

        <div className="ml-28 w-[885px] gap-6 grid grid-cols-1 md:grid-cols-2 py-8">
          {menus.map((menu) => (
            <MenuItem key={menu.id} {...menu} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyMenusPage;
