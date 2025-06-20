"use client";

import React, { useState } from "react";

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
  separatorUrl: string;
  checkboxUrl: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  courses,
  separatorUrl,
  checkboxUrl,
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleItemToggle = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  return (
    <section>
      <div className="mt-7 max-md:max-w-full">
        <h2 className="text-[#030302] text-2xl font-semibold leading-none">
          Your menu pick
        </h2>
        <p className="text-[#6F6E6D] text-xs font-normal max-md:max-w-full">
          Your menu selection from Braised chicken with lemon and olives by Chef
          Titilayo John
        </p>
      </div>
      <img
        src={separatorUrl}
        alt=""
        className="aspect-[500] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-3.5 max-md:max-w-full"
      />
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
              <img
                src={separatorUrl}
                alt=""
                className="aspect-[500] object-contain w-full stroke-[1px] stroke-[#E7E7E7] mt-1.5"
              />
            </div>
            <div className="flex flex-col items-stretch mt-4">
              {course.items.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 ${itemIndex > 0 ? "mt-3" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => handleItemToggle(item.id)}
                    className="self-stretch flex items-center justify-center w-5 my-auto"
                    aria-pressed={selectedItems.has(item.id)}
                  >
                    <img
                      src={checkboxUrl}
                      alt={
                        selectedItems.has(item.id) ? "Selected" : "Not selected"
                      }
                      className="aspect-[1] object-contain w-5 self-stretch my-auto"
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
