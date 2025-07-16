import axios from "@/src/lib/axios";

export const reviewsService = {
  async getChefReviews(params = {}) {
    const response = await axios.get("/reviews/", { params });
    return response.data;
  },
}; 