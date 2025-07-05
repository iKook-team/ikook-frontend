import React from "react";

import { TagChip } from "./tag-chip";

interface SectionWithTagsProps {
  title: string;
  tags: string[];
  selectedTags?: string[];
  onTagClick?: (tag: string) => void;
  multiSelect?: boolean;
}

export const SectionWithTags: React.FC<SectionWithTagsProps> = ({ 
  title, 
  tags, 
  selectedTags = [], 
  onTagClick,
  multiSelect = true
}) => {
  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <section className="flex w-[488px] flex-col items-start gap-[9px] max-md:w-full">
      <h3 className="text-black text-[15px] font-medium max-sm:text-sm">
        {title}
      </h3>
      <div 
        className="flex items-start content-start gap-[8px_4px] flex-wrap w-full"
        role="group"
        aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
      >
        {tags.map((tag, index) => (
          <TagChip
            key={index}
            label={tag}
            selected={selectedTags.includes(tag)}
            onClick={() => handleTagClick(tag)}
            variant={selectedTags.includes(tag) ? 'selected' : 'default'}
          />
        ))}
      </div>
    </section>
  );
};