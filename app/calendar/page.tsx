"use client";
import React, { useState, useCallback, useMemo } from "react";

import CalendarGrid from "@/components/calendar/calendar-grid";
import CalendarControls from "@/components/calendar/calendar-controls";
import BookingDetails from "@/components/calendar/booking-details";
import SetAvailabilityModal from "@/components/calendar/set-availability-modals";
import { getWeekDates, getMonthYearString, addDays, isSameDay } from "@/lib/date-utils";

interface BookingEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  hasBooking: boolean;
  booking?: {
    id: string;
    service: string;
    host_user: string;
    // Add other booking properties as needed
  };
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<BookingEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<BookingEvent[]>([]);
  
  // Get the current week's dates based on the current date
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  // Handle modal open/close
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Handle week navigation
  const navigateWeek = useCallback((direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(currentDate);
    
    if (direction === 'today') {
      const today = new Date();
      setCurrentDate(today);
      setSelectedDate(today);
      return;
    }
    
    const daysToAdd = direction === 'next' ? 7 : -7;
    newDate.setDate(newDate.getDate() + daysToAdd);
    setCurrentDate(newDate);
  }, [currentDate]);

  // Handle date selection from the calendar
  const handleDateSelect = useCallback((date: Date) => {
    // Update selectedDate with the clicked date
    setSelectedDate(date);
    
    // Update currentDate if needed for week navigation
    if (!isSameDay(date, currentDate) && !weekDates.some(d => isSameDay(d, date))) {
      setCurrentDate(date);
    }
    
    // Clear any selected event
    setSelectedEvent(null);
    
    // Only open modal if we're not clicking on an existing event
    const hasEvent = events.some((event: BookingEvent) => isSameDay(event.start, date));
    if (!hasEvent) {
      handleOpenModal();
    }
  }, [currentDate, weekDates, handleOpenModal, events]);

  // Track panel state
  const [panelVisible, setPanelVisible] = useState(false);
  const [panelCoords, setPanelCoords] = useState({ top: 0, left: 0 });

  // Handle event click
  const handleEventClick = useCallback((event: BookingEvent, element: HTMLElement) => {
    // Get the clicked cell's position relative to the viewport
    const rect = element.getBoundingClientRect();
    
    // Calculate position for the panel
    const viewportWidth = window.innerWidth;
    const panelWidth = 306; // Width of the panel
    const margin = 10; // Space between event and panel
    
    // Default position: to the right of the event
    let left = rect.right + window.scrollX + margin;
    let top = rect.top + window.scrollY;
    
    // If panel would go off the right edge of the viewport
    if (left + panelWidth > viewportWidth) {
      // Show to the left of the event
      left = rect.left + window.scrollX - panelWidth - margin;
    }
    
    // Ensure panel stays within viewport bounds
    left = Math.max(10, Math.min(left, viewportWidth - panelWidth - 10));
    top = Math.max(10, Math.min(top, document.documentElement.scrollHeight - 320));
    
    const newCoords = { top, left };
    
    // Update state in a single batch
    requestAnimationFrame(() => {
      setSelectedEvent(event);
      setSelectedDate(event.start);
      setPanelCoords(newCoords);
      setPanelVisible(true);
    });
  }, []);

  // Handle panel close
  const handleClosePanel = useCallback(() => {
    console.log('Closing panel');
    setPanelVisible(false);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:items-center md:flex-row">
            <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
            <div className="flex items-center space-x-4">
              <CalendarControls 
                currentDate={currentDate}
                onDateChange={handleDateSelect}
                onNavigate={navigateWeek}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content and Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Calendar Area */}
        <main className="flex-1 overflow-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-7xl">
              <CalendarGrid 
                currentDate={currentDate}
                weekDates={weekDates}
                selectedDate={selectedDate}
                selectedEvent={selectedEvent}
                onDateSelect={handleDateSelect}
                onEventClick={handleEventClick}
                onNavigate={navigateWeek}
              />
            </div>
          </div>
        </main>
      </div>
        

      {/* Booking Details Panel */}
      {panelVisible && selectedEvent && (
        <div 
          className="fixed z-[100] transition-all duration-200 ease-in-out"
          style={{
            top: `${panelCoords.top}px`,
            left: `${panelCoords.left}px`,
            opacity: panelVisible ? 1 : 0,
            transform: panelVisible ? 'scale(1)' : 'scale(0.95)',
            transformOrigin: 'top left',
            pointerEvents: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <BookingDetails onClose={handleClosePanel} event={selectedEvent} />
        </div>
      )}

      {/* Modals */}
      {isModalOpen && (
        <SetAvailabilityModal 
          onClose={handleCloseModal} 
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
