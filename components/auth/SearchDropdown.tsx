"use client";

import React, { useState } from "react";

export const SearchDropdown: React.FC = () => {
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    console.log("Searching with:", { location, eventDate, guests });
  };

  return (
    <div className="inline-flex items-center gap-[29.651px] shadow-[0px_4.942px_4.942px_0px_rgba(0,0,0,0.04)] absolute w-[604px] h-14 bg-white px-[22px] py-[9.884px] rounded-[617.731px] border-[1.235px] border-solid border-[#EBEBEB] left-[335px] top-[26px] max-md:hidden">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-[#060605] text-base font-normal leading-6 bg-transparent border-none outline-none placeholder:text-[#060605]"
          aria-label="Location"
        />
      </div>

      <div className="w-px h-[30px] bg-[#EBEBEB]" />

      <div className="flex-1">
        <input
          type="date"
          placeholder="Event Date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full text-[#060605] text-base font-normal leading-6 bg-transparent border-none outline-none placeholder:text-[#060605]"
          aria-label="Event Date"
        />
      </div>

      <div className="w-px h-[30px] bg-[#EBEBEB]" />

      <div className="flex-1">
        <input
          type="number"
          placeholder="Guest"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full text-[#060605] text-base font-normal leading-6 bg-transparent border-none outline-none placeholder:text-[#060605]"
          aria-label="Number of guests"
          min="1"
        />
      </div>

      <button
        onClick={handleSearch}
        className="flex justify-center items-center gap-2 border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-[#FCC01C] px-3.5 py-2 rounded-[30px] border-solid border-[#FCC01C] hover:bg-[#e6ac19] transition-colors"
        aria-label="Search events"
      >
        <div className="w-5 h-5">
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="search-icon" style="width: 18px; height: 18px; stroke-width: 1.67px; stroke: #FFF"> <path d="M18.8318 20.6411C19.1579 20.9671 19.6865 20.9671 20.0126 20.6411C20.3387 20.315 20.3387 19.7863 20.0126 19.4602L18.8318 20.6411ZM15.3519 9.2663C15.3519 12.9744 12.3459 15.9803 8.63789 15.9803V17.6503C13.2683 17.6503 17.0219 13.8967 17.0219 9.2663H15.3519ZM8.63789 15.9803C4.92984 15.9803 1.92387 12.9744 1.92387 9.2663H0.253867C0.253867 13.8967 4.00752 17.6503 8.63789 17.6503V15.9803ZM1.92387 9.2663C1.92387 5.55825 4.92984 2.55229 8.63789 2.55229V0.882285C4.00752 0.882285 0.253867 4.63594 0.253867 9.2663H1.92387ZM8.63789 2.55229C12.3459 2.55229 15.3519 5.55825 15.3519 9.2663H17.0219C17.0219 4.63594 13.2683 0.882285 8.63789 0.882285V2.55229ZM13.4396 15.2489L18.8318 20.6411L20.0126 19.4602L14.6205 14.068L13.4396 15.2489Z" fill="white"></path> </svg>',
            }}
          />
        </div>
        <span className="text-white text-sm font-bold leading-5">Search</span>
      </button>
    </div>
  );
};
