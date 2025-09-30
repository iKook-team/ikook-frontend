"use client";
import React, { useEffect, useState } from "react";
import { isSameDay } from "date-fns";

import DateHeaders from "./date-headers";
import EventBlock from "./event-block";

import {
  fetchTimeSlots,
  mapTimeSlotToEvents,
  BookingEvent,
} from "@/lib/api/calendar";

interface CalendarGridProps {
  currentDate: Date;
  weekDates: Date[];
  selectedDate: Date | null;
  selectedEvent: BookingEvent | null;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: BookingEvent, element: HTMLElement) => void;
  onNavigate: (direction: "prev" | "next" | "today") => void;
}

export default function CalendarGrid({
  currentDate,
  weekDates,
  selectedDate,
  selectedEvent,
  onDateSelect,
  onEventClick,
  onNavigate,
}: CalendarGridProps) {
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle date selection
  const handleDateSelect = (e: React.MouseEvent, date: Date) => {
    // Only proceed if the click was directly on a cell with no events
    const target = e.target as HTMLElement;
    const cell = target.closest(".calendar-cell");

    // Check if we clicked directly on a cell with no events
    if (cell && !cell.querySelector(".calendar-event")) {
      e.stopPropagation();
      e.preventDefault();
      onDateSelect(date);
    }
  };

  // Calculate time slots for the day (8:00 AM to 8:00 PM)
  const timeSlots: string[] = [];

  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  // Fetch events when the week changes
  useEffect(() => {
    const fetchEvents = async () => {
      if (weekDates.length === 0) return;

      setIsLoading(true);
      setError(null);

      try {
        const startOfWeek = weekDates[0];
        const endOfWeek = weekDates[weekDates.length - 1];

        const timeSlots = await fetchTimeSlots(startOfWeek, endOfWeek);
        const mappedEvents = timeSlots.flatMap(mapTimeSlotToEvents);

        setEvents(mappedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [weekDates]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Calendar Header with Navigation and Date Headers */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex">
          {/* Empty space to match time column width */}
          <div className="w-16 md:w-20 flex-shrink-0 border-r border-gray-200" />

          {/* Date Headers */}
          <div className="flex-1">
            <DateHeaders
              dates={weekDates}
              onDateClick={onDateSelect}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>

      {/* Calendar Grid Area */}
      <div className="flex flex-1 overflow-auto">
        {/* Time Slots Column */}
        <div className="w-16 md:w-20 flex-shrink-0 border-r border-gray-200">
          <div className="h-16 border-b" /> {/* Empty space for day headers */}
          <div className="py-2">
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className="h-16 flex items-start justify-end pr-2"
              >
                <span className="text-xs text-gray-500">{time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 relative min-w-0">
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {/* Horizontal Lines */}
            <div className="absolute inset-x-0 top-0 h-px bg-gray-100" />
            {timeSlots.map((_, index) => (
              <div
                key={index}
                className="absolute inset-x-0 h-px bg-gray-100"
                style={{ top: `${(index + 1) * 64}px` }}
              />
            ))}

            {/* Vertical Lines */}
            {weekDates.map((_, index) => (
              <div
                key={index}
                className="absolute top-0 bottom-0 w-px bg-gray-100"
                style={{ left: `${(index + 1) * (100 / weekDates.length)}%` }}
              />
            ))}
          </div>

          {/* Calendar Cells */}
          <div className="absolute inset-0 flex">
            {weekDates.map((date, colIndex) => (
              <div
                key={colIndex}
                className="relative"
                style={{ width: `${100 / weekDates.length}%` }}
              >
                {timeSlots.map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    role="gridcell"
                    tabIndex={0}
                    aria-label={`Time slot ${rowIndex + 1} on ${date.toLocaleDateString()}`}
                    className="h-16 border-b border-r border-gray-100 hover:bg-gray-50 transition-colors calendar-cell focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onClick={(e) => handleDateSelect(e, date)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleDateSelect(e as any, date);
                      }
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Loading and error states */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <div className="text-gray-500">Loading events...</div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50">
              <div className="text-red-600">{error}</div>
            </div>
          )}

          {/* Render events */}
          {events
            .filter((event) => {
              // Only show events that fall within the current week
              return weekDates.some((date) => isSameDay(date, event.start));
            })
            .map((event) => (
              <EventBlock
                key={event.id}
                event={event}
                onClick={onEventClick}
                isSelected={selectedEvent?.id === event.id}
                weekDates={weekDates}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
