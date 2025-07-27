"use client";

import Image from "next/image";
import React from "react";

interface MenuItem {
  id: string;
  name: string;
}

interface MenuCourse {
  title: string;
  quantity: number;
  items: MenuItem[];
}

interface MenuSectionProps {
  courses: MenuCourse[];
  checkboxUrl: string;
  selectedMenuItems: string[];
  setSelectedMenuItems: (items: string[]) => void;
  menuName: string;
  chefName: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  courses,
  checkboxUrl,
  selectedMenuItems,
  setSelectedMenuItems,
  menuName,
  chefName,
}) => {
  const handleItemToggle = (itemId: string) => {
    let newSelected: string[];

    if (selectedMenuItems.includes(itemId)) {
      newSelected = selectedMenuItems.filter((id) => id !== itemId);
    } else {
      newSelected = [...selectedMenuItems, itemId];
    }
    setSelectedMenuItems(newSelected);
  };

  return (
    <section>
      <div className="mt-7 max-md:max-w-full">
        <h2 className="text-[#030302] text-2xl font-semibold leading-none">
          Your menu pick
        </h2>
        <p className="text-[#6F6E6D] text-xs font-normal max-md:max-w-full">
          Your menu selection from {menuName} by {chefName}
        </p>
      </div>
      <hr className="w-full border-t border-gray-200 mt-3.5" />
      <div className="mt-[22px] max-md:max-w-full">
        {courses.map((course, courseIndex) => (
          <div
            key={courseIndex}
            className={`flex max-w-full w-[613px] flex-col items-stretch ${courseIndex > 0 ? "mt-6" : ""}`}
          >
            <div className="w-full text-lg text-black font-medium leading-loose">
              <h3>
                {course.title} x{course.quantity}
              </h3>
              <hr className="w-full border-t border-gray-200 mt-1.5" />
            </div>
            <div className="flex flex-col items-stretch mt-4">
              {course.items.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 ${itemIndex > 0 ? "mt-3" : ""}`}
                >
                  <button
                    aria-pressed={selectedMenuItems.includes(item.id)}
                    className="self-stretch flex items-center justify-center w-5 my-auto"
                    type="button"
                    onClick={() => handleItemToggle(item.id)}
                  >
                    <Image
                      alt={
                        selectedMenuItems.includes(item.id)
                          ? "Selected"
                          : "Not selected"
                      }
                      className="object-contain self-stretch my-auto"
                      height={20}
                      src={checkboxUrl}
                      width={20}
                    />
                  </button>
                  <label className="text-[#344054] text-base font-medium self-stretch my-auto cursor-pointer">
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
