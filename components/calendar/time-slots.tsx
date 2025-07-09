import React from "react";

export default function TimeSlots() {
  const timeSlots = [
    { time: "7 AM", top: 138 },
    { time: "8 AM", top: 186 },
    { time: "9 AM", top: 234 },
    { time: "10 AM", top: 282 },
    { time: "11 AM", top: 330 },
    { time: "12 PM", top: 378 },
    { time: "1 PM", top: 426 },
    { time: "2 PM", top: 474 },
    { time: "3 PM", top: 522 },
    { time: "4 PM", top: 570 },
    { time: "5 PM", top: 618 },
    { time: "6 PM", top: 666 },
    { time: "7 PM", top: 714 },
    { time: "8 PM", top: 762 },
    { time: "9 PM", top: 810 },
    { time: "10 PM", top: 858 },
  ];

  return (
    <>
      {timeSlots.map((slot, index) => (
        <div
          key={index}
          className="absolute text-xs h-[18px] left-[51px] text-zinc-800 text-opacity-70 max-sm:left-2.5 max-sm:text-xs"
          style={{
            top: `${slot.top}px`,
            width: slot.time.length > 4 ? "34px" : "30px",
          }}
        >
          {slot.time}
        </div>
      ))}
    </>
  );
}
