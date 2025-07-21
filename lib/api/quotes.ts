import axios from "@/src/lib/axios";

export const quotesService = {
  async getQuoteById(id: string | number) {
    const response = await axios.get(`/quote/${id}/`);
    return response.data;
  },
  async getQuoteByBookingId(bookingId: string | number) {
    const response = await axios.get(`/quotes/?booking=${bookingId}`);
    const results = response.data?.data?.results;
    if (results && results.length > 0) {
      return results[0];
    }
    throw new Error('No quote found for this booking');
  },
}; 