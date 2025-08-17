import apiClient from "@/src/lib/axios";

export const revenueService = {
  async getEarnings() {
    const response = await apiClient.get("/earnings/");

    return response.data;
  },
  async getWithdrawals(params = {}) {
    const response = await apiClient.get("/earnings/withdrawals/", { params });

    return response.data;
  },
  async getBankDetails(chefId: number) {
    const response = await apiClient.get(`/earnings/bank-details/${chefId}/`);

    return response.data;
  },
  async requestWithdrawal(amount: string, bankDetailId: number) {
    const response = await apiClient.post("/earnings/withdrawals/", {
      amount,
      bank_detail: bankDetailId,
    });

    return response.data;
  },
};
