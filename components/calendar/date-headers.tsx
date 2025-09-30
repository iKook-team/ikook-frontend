import React from "react";
import { format } from "date-fns";

interface DateHeadersProps {
  dates: Date[];
  onDateClick?: (date: Date) => void;
  selectedDate?: Date | null;
}

export default function DateHeaders({
  dates,
  onDateClick,
  selectedDate,
}: DateHeadersProps) {
  const isToday = (date: Date): boolean => {
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;

    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getDayClasses = (date: Date): string => {
    const baseClasses = [
      "flex-1",
      "flex",
      "flex-col",
      "items-center",
      "pt-2",
      "pb-1",
      "border-b-2",
      "border-transparent",
      "transition-colors",
      "duration-200",
      "cursor-pointer",
    ];

    if (isToday(date)) {
      baseClasses.push("text-yellow-600");
    } else if (isSelected(date)) {
      baseClasses.push("border-yellow-500 text-yellow-600");
    } else {
      baseClasses.push("text-zinc-800 text-opacity-70 hover:text-opacity-100");
    }

    return baseClasses.join(" ");
  };

  const handleDateClick = (date: Date) => {
    if (onDateClick) {
      onDateClick(date);
    }
  };

  return (
    <div className="w-full">
      <div className="flex">
        {dates.map((date, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`Select date ${format(date, "EEEE, MMMM d, yyyy")}`}
            className={`flex-1 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 ${getDayClasses(date)}`}
            onClick={() => handleDateClick(date)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleDateClick(date);
              }
            }}
          >
            <div className="text-xs font-medium mb-1">
              {format(date, "EEE")}
            </div>
            <div className="text-xl font-semibold">{format(date, "d")}</div>
            <div className="text-xs mt-1">{format(date, "MMM")}</div>
            {isToday(date) && (
              <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1 mx-auto" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
