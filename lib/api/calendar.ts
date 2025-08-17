import { format } from "date-fns";

import apiClient from "@/src/lib/axios";

// Types
export interface Booking {
  id: string;
  service: string;
  host_user: string;
  // Add other booking properties as needed
}

export interface TimeSlot {
  id: string;
  chef: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  bookings: Booking[] | null;
}

export interface TimeSlotsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  current: number;
  total: number;
  results: TimeSlot[];
}

// API Functions
export interface CreateTimeSlotData {
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
}

export const createTimeSlot = async (
  data: CreateTimeSlotData,
): Promise<TimeSlot> => {
  try {
    const response = await apiClient.post<TimeSlot>("/calendar/time-slots/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating time slot:", error);
    throw error;
  }
};

export const fetchTimeSlots = async (
  startDate: Date,
  endDate: Date,
): Promise<TimeSlot[]> => {
  try {
    const response = await apiClient.get<TimeSlotsResponse>(
      "/calendar/time-slots/",
      {
        params: {
          start_date: format(startDate, "yyyy-MM-dd"),
          end_date: format(endDate, "yyyy-MM-dd"),
        },
      },
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching time slots:", error);
    throw error;
  }
};

// Helper function to get all dates between start and end dates
const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Map a single booking to calendar events for each day in the date range
const mapBookingToEvents = (
  timeSlot: TimeSlot,
  booking: any,
  index: number,
): BookingEvent[] => {
  const startDate = new Date(timeSlot.start_date);
  const endDate = timeSlot.end_date ? new Date(timeSlot.end_date) : startDate;

  // Get all dates in the range (including start and end dates)
  const datesInRange = getDatesInRange(startDate, endDate);

  return datesInRange.map((date, dateIndex) => {
    // Format the date part (YYYY-MM-DD)
    const dateStr = date.toISOString().split("T")[0];

    // Combine with the time from the time slot
    const startDateTime = new Date(`${dateStr}T${timeSlot.start_time}`);
    const endDateTime = new Date(`${dateStr}T${timeSlot.end_time}`);

    return {
      id: `${timeSlot.id}-${booking.id || index}-${dateIndex}`,
      title: `${booking.service} for ${booking.host}`,
      start: startDateTime,
      end: endDateTime,
      hasBooking: true,
      booking: booking,
    };
  });
};

// Map API time slot to one or more calendar events
export const mapTimeSlotToEvents = (timeSlot: TimeSlot): BookingEvent[] => {
  // If there are bookings, create events for each one across the date range
  if (timeSlot.bookings && timeSlot.bookings.length > 0) {
    return timeSlot.bookings.flatMap((booking, index) =>
      mapBookingToEvents(timeSlot, booking, index),
    );
  }

  // If no bookings, create events for each day in the date range
  const startDate = new Date(timeSlot.start_date);
  const endDate = timeSlot.end_date ? new Date(timeSlot.end_date) : startDate;
  const datesInRange = getDatesInRange(startDate, endDate);

  return datesInRange.map((date, index) => {
    const dateStr = date.toISOString().split("T")[0];

    return {
      id: `${timeSlot.id}-${index}`,
      title: "Available",
      start: new Date(`${dateStr}T${timeSlot.start_time}`),
      end: new Date(`${dateStr}T${timeSlot.end_time}`),
      hasBooking: false,
    };
  });
};

// BookingEvent type for calendar events
export interface BookingEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  hasBooking: boolean;
  booking?: Booking;
}
