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
        }
    ]

    const sortOptions = [
        { key: "popular", label: "Most Popular" },
        { key: "latest", label: "Latest" },
    ];

    const [selectedTag, setSelectedTag] = useState(1);

    const handleTagClick = (tagId: number) => {
        setSelectedTag(tagId);
    };

    return (
        <div className="flex flex-col h-32 justify-between">
            <div className="flex gap-2 justify-between items-center">
                {tags.map((tag) => (
                    <Button
                        radius="full"
                        variant="bordered"
                        className={`border-1 ${tag.id === selectedTag ? 'text-white bg-[#FCC01C] border-[#F9DF98] border-2' : ''}`}
                        key={tag.id}
                        onPress={() => handleTagClick(tag.id)}
                    >
                        {tag.name}
                    </Button>
                ))}
                <Divider orientation="vertical" />
                <Button radius="full" variant="bordered" endContent={<HiAdjustmentsHorizontal />} className="border-1">Filter</Button>
            </div>
            <div className="flex items-center">
                <h1 className="w-1/5 text-xl font-bold">{tags.find((tag) => tag.id === selectedTag)?.name}</h1>
                <div className="w-3/5 max-w-xl flex justify-between items-center rounded-full border-1 py-2 px-4 mx-auto">
                    <div className="w-3/4 text-sm">Cant find what you want? use the custom booking</div>
                    <Button radius="full" className="w-1/4 bg-[#FCC01C] text-white">Custom Booking</Button>
                </div>
                <Select
                    radius="full"
                    className="w-1/5 max-w-40 border-1 rounded-full"
                    defaultSelectedKeys={["popular"]}
                >
                    {sortOptions.map((option) => (
                        <SelectItem key={option.key}>{option.label}</SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
};