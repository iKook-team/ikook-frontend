"use client";

import React from "react";

interface MenuItem {
  id: string;
  name: string;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
}

export default function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <section className="mt-6 max-w-full w-[390px]">
      <h3 className="text-lg font-medium leading-loose text-black">{title}</h3>
      <div className="mt-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex gap-3 items-center ${index > 0 ? "mt-3" : ""}`}
          >
            <div className="flex justify-center items-center self-stretch my-auto w-5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/e3c8d396e4c5a0dc750a068ed920c1105cacaf78?placeholderIfAbsent=true"
                className="object-contain self-stretch my-auto w-5 aspect-square"
                alt="Checkbox"
              />
            </div>
            <p className="self-stretch my-auto text-base text-neutral-700">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
