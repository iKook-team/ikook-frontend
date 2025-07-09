"use client";
import React from "react";

export default function CalendarNavigation() {
  return (
    <>
      {/* Left Arrow */}
      <button className="absolute left-12 h-[50px] top-[33px] w-[50px]">
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-bg-left" style="width: 50px; height: 50px; fill: rgba(252,192,28,0.20); position: absolute; left: 0; top: 0"> <circle cx="25" cy="25" r="25" fill="#FCC01C" fill-opacity="0.2"></circle> </svg>',
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon-left" style="width: 20px; height: 20px; position: absolute; left: 15px; top: 15px"> <path d="M12.4997 3.33203L5.83301 9.9987L12.4997 16.6654" stroke="#323335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
          }}
        />
      </button>

      {/* Right Arrow */}
      <button className="absolute h-[50px] left-[1342px] top-[33px] w-[50px]">
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-bg-right" style="width: 50px; height: 50px; fill: rgba(252,192,28,0.20); position: absolute; left: 0; top: 0"> <circle cx="25" cy="25" r="25" fill="#FCC01C" fill-opacity="0.2"></circle> </svg>',
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon-right" style="width: 20px; height: 20px; position: absolute; left: 15px; top: 15px"> <path d="M7.50033 16.668L14.167 10.0013L7.50033 3.33464" stroke="#323335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
          }}
        />
      </button>
    </>
  );
}
