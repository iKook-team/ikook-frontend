import React from "react";
import { format } from "date-fns";
import { isSameDay } from "date-fns";

import { BookingEvent } from "@/lib/api/calendar";

interface EventBlockProps {
  event: BookingEvent;
  onClick: (event: BookingEvent, element: HTMLElement) => void;
  isSelected: boolean;
  weekDates: Date[];
}

export default function EventBlock({
  event,
  onClick,
  isSelected,
  weekDates,
}: EventBlockProps) {
  const dayIndex = weekDates.findIndex((date) => isSameDay(date, event.start));

  if (dayIndex === -1) return null;

  const startHour = event.start.getHours();
  const startMinute = event.start.getMinutes();
  const endHour = event.end.getHours();
  const endMinute = event.end.getMinutes();

  const top = ((startHour - 8) * 60 + startMinute) * (64 / 60);
  const height =
    ((endHour - startHour) * 60 + (endMinute - startMinute)) * (64 / 60);

  const eventTimeRange = `${format(event.start, 'h:mma')} - ${format(event.end, 'h:mma')}`;
  const eventDate = format(event.start, 'EEEE, MMMM d, yyyy');
  const eventTitle = event.booking 
    ? `${event.booking.service} for ${event.booking.host_user}` 
    : 'Available time slot';

  return (
    <button
      type="button"
      aria-label={`${eventTitle} on ${eventDate} from ${eventTimeRange}`}
      className={`absolute left-1 right-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500 ${
        isSelected
          ? "bg-yellow-600 text-white"
          : "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
      }`}
      style={{
        left: `${(dayIndex / weekDates.length) * 100}%`,
        width: `calc(${100 / weekDates.length}% - 0.5rem)`,
        top: `${top}px`,
        height: `${height}px`,
        margin: "0 0.125rem",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(event, e.currentTarget);
      }}
    >
      <div className="p-1 text-xs font-medium truncate">
        {event.booking
          ? `${event.booking.service} for ${event.booking.host_user}`
          : "Available"}
      </div>
      <div className="px-1 text-xs opacity-80">
        {format(event.start, "h:mma")} - {format(event.end, "h:mma")}
      </div>
    </button>
  );
}
