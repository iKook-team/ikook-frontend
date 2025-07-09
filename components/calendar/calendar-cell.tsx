import React from "react";

interface CalendarCellProps {
  left: number;
  top: number;
  type: "available" | "unavailable";
}

export default function CalendarCell({ left, top, type }: CalendarCellProps) {
  return (
    <div
      className="absolute h-[167px] w-[106px]"
      style={{ left: `${left}px`, top: `${top}px` }}
    >
      <div className="absolute top-0 left-0 rounded-md bg-stone-50 h-[167px] w-[106px]" />
      <div
        className="absolute text-xs h-[15px] text-zinc-800 text-opacity-40 w-[47px]"
        style={{ top: type === "available" ? "6px" : "6px", left: "8px" }}
      >
        Available
      </div>
    </div>
  );
}
