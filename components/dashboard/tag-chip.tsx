import React from "react";

interface TagChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: "default" | "selected";
}

export const TagChip: React.FC<TagChipProps> = ({
  label,
  selected = false,
  onClick,
  variant = "default",
}) => {
  const borderColor =
    selected || variant === "selected" ? "#F9DF98" : "#B7B7B6";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center content-center gap-[4.853px] flex-wrap bg-[#FFFCF5] px-[12.134px] py-[8.089px] rounded-[20.223px] border-[1.011px] border-solid max-sm:px-2.5 max-sm:py-1.5 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#F9DF98] focus:ring-offset-1"
      style={{ borderColor }}
      aria-pressed={selected}
    >
      <span className="text-[#3F3E3D] text-sm font-medium whitespace-nowrap max-sm:text-[13px]">
        {label}
      </span>
    </button>
  );
};
