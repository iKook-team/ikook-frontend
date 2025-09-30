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
    // Central guard: normalize budget_type case if present
    if (payload && typeof payload === "object" && "budget_type" in payload) {
      const bt = payload.budget_type;

      if (bt != null) {
        const v = String(bt).trim().toLowerCase();

        if (v === "fixed") payload.budget_type = "Fixed";
        else if (v === "flexible") payload.budget_type = "Flexible";
      }
    }
    const response = await apiClient.post("/bookings/", payload);

    return response.data;
  },
  async updateBooking(id: string | number, payload: any) {
    const response = await apiClient.patch(`/bookings/${id}/`, payload);

    return response.data;
  },
};
