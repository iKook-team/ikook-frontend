"use client";

import { useState } from "react";
import { Button, Divider, Select, SelectItem } from "@heroui/react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export const Filter = () => {
  const tags = [
    {
      id: 1,
      name: "Chef at Home",
    },
    {
      id: 2,
      name: "Large Event",
    },
    {
      id: 3,
      name: "Meal Prep",
    },
    {
      id: 4,
      name: "Gormet Delivery",
    },
    {
      id: 5,
      name: "Cooking Class",
    },
    {
      id: 6,
      name: "Fine Dining",
    },
    {
      id: 7,
      name: "Corporate Dining",
    },
    {
      id: 8,
      name: "CHEFS",
    },
  ];

  const sortOptions = [
    { key: "popular", label: "Most Popular" },
    { key: "latest", label: "Latest" },
  ];

  const [selectedTag, setSelectedTag] = useState(1);

  const handleTagClick = (tagId: number) => {
    setSelectedTag(tagId);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Tags and filter button row */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex flex-wrap gap-2 lg:gap-4 flex-grow">
          {tags.map((tag) => (
            <Button
              radius="full"
              variant="bordered"
              className={`border-1 mb-1 ${tag.id === selectedTag ? "text-white bg-yellow-400 border-yellow-200 border-2" : ""}`}
              key={tag.id}
              onPress={() => handleTagClick(tag.id)}
            >
              {tag.name}
            </Button>
          ))}
        </div>
        <div className="hidden md:block">
          <Divider orientation="vertical" />
        </div>
        <Button
          radius="full"
          variant="bordered"
          endContent={<HiAdjustmentsHorizontal />}
          className="border-1"
        >
          Filter
        </Button>
      </div>

      {/* Title, custom booking, and sort select row */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <h1 className="text-xl font-bold w-full md:w-1/4">
          {tags.find((tag) => tag.id === selectedTag)?.name}
        </h1>

        <div className="w-full md:w-2/4 flex justify-between items-center rounded-full border-1 py-2 px-4">
          <div className="w-2/3 text-xs sm:text-sm">
            Cant find what you want? use the custom booking
          </div>
          <Button radius="full" size="sm" className="bg-yellow-400 text-white">
            Custom Booking
          </Button>
        </div>

        <div className="flex w-1/2 md:w-1/4 mt-2 md:mt-0 justify-end">
          <Select
            radius="full"
            className="w-full max-w-full md:max-w-40 border-1 rounded-full"
            defaultSelectedKeys={["popular"]}
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
