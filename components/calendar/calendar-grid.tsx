"use client";
import React from "react";

import CalendarNavigation from "./calendar-navigation";
import DateHeaders from "./date-headers";
import TimeSlots from "./time-slots";
import CalendarCell from "./calendar-cell";
import EventBlock from "./event-block";

export default function CalendarGrid() {
  return (
    <div className="absolute left-0 h-[881px] top-[214px] w-[1440px] max-md:overflow-x-auto max-md:w-full max-sm:px-2.5 max-sm:py-0">
      <div className="absolute top-0 left-0 h-[881px] w-[1440px] max-md:min-w-[1200px]">
        {/* Grid Lines */}
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="1440" height="2" viewBox="0 0 1440 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="calendar-line-1" style="width: 1440px; height: 0; stroke-width: 1px; stroke: rgba(0,0,0,0.10); position: absolute; left: 0; top: 0"> <path d="M0 1H1440" stroke="black" stroke-opacity="0.1"></path> </svg>',
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="1440" height="2" viewBox="0 0 1440 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="calendar-line-2" style="width: 1440px; height: 0; stroke-width: 1px; stroke: rgba(0,0,0,0.10); position: absolute; left: 0; top: 108px"> <path d="M0 1H1440" stroke="black" stroke-opacity="0.1"></path> </svg>',
          }}
        />

        {/* Vertical Lines */}
        {[119, 241, 350, 470, 593, 700, 813, 937, 1055, 1173, 1307].map(
          (left, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{
                __html: `<svg width="2" height="772" viewBox="0 0 2 772" fill="none" xmlns="http://www.w3.org/2000/svg" class="vertical-line-${index + 1}" style="width: 0; height: 773px; stroke-width: 1px; stroke: rgba(0,0,0,0.10); position: absolute; left: ${left}px; top: 108px"> <path d="M1 0V773" stroke="black" stroke-opacity="0.1"></path> </svg>`,
              }}
            />
          ),
        )}

        {/* Horizontal Lines */}
        {[292, 483, 675].map((top, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{
              __html: `<svg width="1321" height="2" viewBox="0 0 1321 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="horizontal-line-${index + 1}" style="width: 1321px; height: 0; stroke-width: 1px; stroke: rgba(0,0,0,0.10); position: absolute; left: 119px; top: ${top}px"> <path d="M0 1L1321 1" stroke="black" stroke-opacity="0.1"></path> </svg>`,
            }}
          />
        ))}

        <CalendarNavigation />
        <DateHeaders />
        <TimeSlots />

        {/* Calendar Cells and Events */}
        <EventBlock />

        {/* Available/Unavailable cells */}
        {[
          { left: 127, top: 304 },
          { left: 127, top: 496 },
          { left: 127, top: 685 },
          { left: 357, top: 116 },
          { left: 357, top: 304 },
          { left: 357, top: 496 },
          { left: 357, top: 685 },
          { left: 479, top: 116 },
          { left: 479, top: 304 },
          { left: 479, top: 496 },
          { left: 479, top: 685 },
          { left: 938, top: 116 },
          { left: 938, top: 304 },
          { left: 938, top: 496 },
          { left: 938, top: 685 },
          { left: 1060, top: 116 },
          { left: 1060, top: 304 },
          { left: 1060, top: 496 },
          { left: 1060, top: 685 },
        ].map((cell, index) => (
          <CalendarCell
            key={index}
            left={cell.left}
            top={cell.top}
            type="available"
          />
        ))}

        {/* Unavailable labels */}
        {[
          { left: 249, top: 122, text: "Unavailable" },
          { left: 249, top: 310, text: "Unavailable" },
          { left: 249, top: 502, text: "Unavailable" },
          { left: 249, top: 691, text: "Unavailable" },
          { left: 601, top: 122, text: "Unavailable" },
          { left: 601, top: 310, text: "Unavailable" },
          { left: 601, top: 502, text: "Unavailable" },
          { left: 601, top: 691, text: "Unavailable" },
          { left: 710, top: 122, text: "Unavailable" },
          { left: 710, top: 310, text: "Unavailable" },
          { left: 710, top: 502, text: "Unavailable" },
          { left: 710, top: 691, text: "Unavailable" },
          { left: 825, top: 122, text: "Unavailable" },
          { left: 825, top: 310, text: "Unavailable" },
          { left: 825, top: 502, text: "Unavailable" },
          { left: 825, top: 691, text: "Unavailable" },
          { left: 1186, top: 122, text: "Unavailable" },
          { left: 1186, top: 310, text: "Unavailable" },
          { left: 1186, top: 502, text: "Unavailable" },
          { left: 1186, top: 691, text: "Unavailable" },
          { left: 1319, top: 335, text: "Unavailable" },
          { left: 1319, top: 523, text: "Unavailable" },
          { left: 1319, top: 715, text: "Unavailable" },
          { left: 1319, top: 904, text: "Unavailable" },
        ].map((label, index) => (
          <div
            key={index}
            className="absolute text-xs h-[15px] text-zinc-800 text-opacity-40 w-[60px]"
            style={{ left: `${label.left}px`, top: `${label.top}px` }}
          >
            {label.text}
          </div>
        ))}
      </div>
    </div>
  );
}
