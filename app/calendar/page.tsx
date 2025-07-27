"use client";
import React from "react";

import CalendarGrid from "@/components/calendar/calendar-grid";
import CalendarControls from "@/components/calendar/calendar-controls";
import BookingDetails from "@/components/calendar/booking-details";
import SetAvailabilityModal from "@/components/calendar/set-availability-modals";

export default function CalendarPage() {
  const [showBookingDetails, setShowBookingDetails] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(true); // Modal is open by default as shown in design

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <div className="flex items-center space-x-4">
          <CalendarControls />
        </div>
      </div>
      <CalendarGrid />
      {showBookingDetails && (
        <BookingDetails onClose={() => setShowBookingDetails(false)} />
      )}
      {isModalOpen && <SetAvailabilityModal onClose={handleCloseModal} />}
    </div>
  );
}
