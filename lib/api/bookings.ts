import apiClient from "@/src/lib/axios";

export interface BookingQueryParams {
  status?: string;
  page?: number;
  page_size?: number;
}

export const bookingsService = {
  async getBookings(params: BookingQueryParams = {}) {
    const response = await apiClient.get("/bookings/", { params });
    return response.data;
  },
  async getBookingById(id: string | number) {
    const response = await apiClient.get(`/bookings/${id}/`);
    return response.data;
  },
  async createBooking(payload: any) {
    const response = await apiClient.post("/bookings/", payload);
    return response.data;
  },
};
