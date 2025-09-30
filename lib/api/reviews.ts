import apiClient from "@/src/lib/axios";

export const reviewsService = {
  async getChefReviews(params = {}) {
    const response = await apiClient.get("/reviews/", { params });

    return response.data;
  },

  async requestReview(data: { host_email: string; host_name: string }) {
    const response = await apiClient.post("/reviews/request/", data);

    return response.data;
  },
};
