import apiClient from "@/src/lib/axios";

export interface Quote {
  id: number;
  name: string;
  booking: number;
  items: QuoteItemInput[];
  created_at: string;
  updated_at: string;
  is_paid: boolean;
}

export interface QuoteItemInput {
  course: string;
  name: string;
  description: string;
  price: string;
}

export interface CreateQuoteInput {
  name: string;
  booking: number;
  items: QuoteItemInput[];
}

export const quotesService = {
  async listQuotes(params?: Record<string, any>) {
    const response = await apiClient.get("/quotes/", { params });

    // Support both {results: [...]} and {data: {results: [...]}}
    const results = response.data?.data?.results || response.data?.results || response.data;
    return Array.isArray(results) ? results : [];
  },
  async getQuoteById(id: string | number) {
    const response = await apiClient.get(`/quotes/${id}/`);

    return response.data;
  },
  async getQuoteByBookingId(bookingId: string | number) {
    try {
      console.log(`Fetching quote for booking ID: ${bookingId}`);
      const response = await apiClient.get(`/quotes/?booking=${bookingId}`);

      console.log("Quotes API response:", response.data);

      const results = response.data?.data?.results || response.data?.results;

      if (results && results.length > 0) {
        console.log(`Found ${results.length} quotes for booking ${bookingId}`);

        return results[0];
      }

      throw new Error(
        `No quotes found for booking ${bookingId}. Response: ${JSON.stringify(response.data)}`,
      );
    } catch (error: any) {
      throw error;
    }
  },

  async createQuote(data: CreateQuoteInput) {
    const response = await apiClient.post("/quotes/", data);
    // Some backends wrap payload in {data}
    return response.data?.data || response.data;
  },
};
