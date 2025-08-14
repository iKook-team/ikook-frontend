"use client";
import React from "react";
import { format, parse } from "date-fns";

interface CalendarControlsProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function CalendarControls({ 
  currentDate, 
  onDateChange, 
  onNavigate 
}: CalendarControlsProps) {
  const monthYear = format(currentDate, 'MMMM, yyyy');
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : new Date();
    onDateChange(date);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-center">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onNavigate('prev')}
          className="p-2 hover:bg-amber-50 rounded-full transition-colors"
          aria-label="Previous week"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#3F3E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="text-lg font-medium text-gray-900 min-w-[180px] text-center">
          {monthYear}
        </div>
        
        <button 
          onClick={() => onNavigate('next')}
          className="p-2 hover:bg-amber-50 rounded-full transition-colors"
          aria-label="Next week"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#3F3E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="date"
            value={format(currentDate, 'yyyy-MM-dd')}
            onChange={handleDateChange}
            className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4H14M6 1V3M10 1V3M3.2 6.2H12.8C13.9201 6.2 14.4802 6.2 14.908 6.45643C15.2843 6.68318 15.5686 6.98843 15.7854 7.38876C16 7.7837 16 8.36588 16 9.53024V11.2C16 12.8802 16 13.7202 15.673 14.362C15.3854 14.9265 14.9265 15.3854 14.362 15.673C13.7202 16 12.8802 16 11.2 16H4.8C3.11984 16 2.27976 16 1.63803 15.673C1.07354 15.3854 0.614601 14.9265 0.32698 14.362C0 13.7202 0 12.8802 0 11.2V9.53024C0 8.36588 0 7.7837 0.214606 7.38876C0.431446 6.98843 0.715686 6.68318 1.09202 6.45643C1.51984 6.2 2.0799 6.2 3.2 6.2Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <button 
          className="p-2 bg-amber-400 hover:bg-amber-500 rounded-full transition-colors"
          onClick={() => onDateChange(new Date())}
          aria-label="Today"
        >
          Today
        </button>
      </div>
    </div>
  );
}
