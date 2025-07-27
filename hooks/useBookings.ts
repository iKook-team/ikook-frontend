import { useState, useEffect } from "react";

import { bookingsService, BookingQueryParams } from "@/lib/api/bookings";

interface UseBookingsProps {
  status?: string;
  page?: number;
  pageSize?: number;
}

const useBookings = ({ status, page = 1, pageSize = 10 }: UseBookingsProps) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: BookingQueryParams = {
        status,
        page,
        page_size: pageSize,
      };
      const response = await bookingsService.getBookings(params);
      // Handle backend response structure
      const data = response?.data || {};

      setBookings(data.results || []);
      setTotalCount(data.count || 0);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again later.");
      setBookings([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page, pageSize]);

  const refetch = () => {
    fetchBookings();
  };

  return {
    bookings,
    loading,
    error,
    totalCount,
    refetch,
  };
};

export default useBookings;

// Single booking hook
export const useBooking = (id?: string | number) => {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    bookingsService
      .getBookingById(id)
      .then((data) => {
        // Handle backend response structure
        setBooking(data?.data || null);
      })
      .catch(() => {
        setError("Failed to fetch booking details. Please try again later.");
        setBooking(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { booking, loading, error };
};
