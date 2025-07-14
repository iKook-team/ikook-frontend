import axios from "@/src/lib/axios";

export const quotesService = {
  async getQuoteById(id: string | number) {
    const response = await axios.get(`/quote/${id}/`);
    return response.data;
  },
}; 