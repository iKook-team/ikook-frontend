"use client";

import Image from "next/image";
import React, { useState } from "react";

interface TagSelectorProps {
  label: string;
  tags: readonly string[] | string[];
  selectedTags?: string[];
  className?: string;
  onTagsChange?: (tags: string[]) => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  label,
  tags: propTags = [], // Default to empty array if undefined
  selectedTags = [],
  className = "",
  onTagsChange,
}) => {
  // Ensure tags is always an array and log if it's not
  const tags = Array.isArray(propTags) ? [...propTags] : [];

  const [isOpen, setIsOpen] = useState(false);

  // Debug info
  React.useEffect(() => {
    console.log("TagSelector Mounted - tags:", tags);
    console.log("TagSelector Mounted - selectedTags:", selectedTags);
  }, [tags, selectedTags]);

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    onTagsChange?.(newTags);
  };

  return (
    <div className={`relative flex flex-col pb-2.5 w-full ${className}`}>
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      <button
        className="flex flex-wrap gap-2 items-center px-3.5 py-2.5 mt-1.5 w-full bg-white rounded-lg border border-solid shadow-sm border-stone-300 min-h-[45px]"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap flex-1 gap-2">
          {selectedTags.length > 0 ? (
            selectedTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-black bg-amber-100 border border-amber-200 rounded-full"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-400">Select tags...</span>
          )}
        </div>
        <Image
          alt="arrow"
          className={`object-contain shrink-0 self-stretch my-auto w-4 aspect-square transition-transform ${isOpen ? "rotate-180" : ""}`}
          height={16}
          src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/620e0157fc3f2b2a6a85ebddd0cde1b4dd5631d1?placeholderIfAbsent=true"
          width={16}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full left-0 mt-1 w-full bg-white rounded-lg border border-solid shadow-lg border-stone-300">
          <div className="flex flex-wrap gap-2 p-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                className={`flex gap-2.5 justify-center items-center px-2.5 py-1 border border-amber-200 border-solid bg-stone-50 rounded-[40px] text-xs text-black ${
                  selectedTags.includes(tag) ? "bg-amber-100" : ""
                }`}
                type="button"
                onClick={() => toggleTag(tag)}
              >
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
