import React from "react";

export default function DateHeaders() {
  const dates = [
    { day: "21", month: "Nov", dayName: "MON", left: 161, width: 29 },
    { day: "22", month: "Nov", dayName: "TUE", left: 276, width: 35 },
    { day: "23", month: "Nov", dayName: "WED", left: 388, width: 36 },
    { day: "24", month: "Nov", dayName: "THU", left: 511, width: 37 },
    { day: "25", month: "Nov", dayName: "FRI", left: 618, width: 37 },
    { day: "26", month: "Nov", dayName: "SAT", left: 733, width: 37 },
    { day: "27", month: "Nov", dayName: "SUN", left: 854, width: 35 },
    { day: "28", month: "Nov", dayName: "SUN", left: 973, width: 37 },
    { day: "29", month: "Nov", dayName: "SUN", left: 1092, width: 37 },
    { day: "30", month: "Nov", dayName: "SUN", left: 1211, width: 38 },
  ];

  return (
    <>
      {dates.map((date, index) => (
        <div
          key={index}
          className="absolute top-5 h-[68px]"
          style={{ left: `${date.left}px`, width: `${date.width}px` }}
        >
          <div
            className="absolute top-0 w-6 text-xs h-[18px] text-zinc-800 text-opacity-70"
            style={{ left: date.width > 35 ? "7px" : "6px" }}
          >
            {date.month}
          </div>
          <div
            className="absolute text-xs h-[18px] text-zinc-800 text-opacity-70 top-[50px]"
            style={{ left: date.width > 35 ? "7px" : "3px" }}
          >
            {date.dayName}
          </div>
          <div
            className="absolute top-3 text-3xl h-[45px] text-zinc-800"
            style={{ left: "0px", width: `${date.width}px` }}
          >
            {date.day}
          </div>
        </div>
      ))}
    </>
  );
}
