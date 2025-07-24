import axios from "@/src/lib/axios";

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
  async getQuoteById(id: string | number) {
    const response = await axios.get(`/quotes/${id}/`);
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
  
  async createQuote(data: CreateQuoteInput) {
    const response = await axios.post('/quotes/', data);
    return response.data;
  },
};