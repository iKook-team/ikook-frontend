import axios from "@/src/lib/axios";

export const revenueService = {
  async getEarnings() {
    const response = await axios.get("/earnings/");

    return response.data;
  },
  async getWithdrawals(params = {}) {
    const response = await axios.get("/earnings/withdrawals/", { params });

    return response.data;
  },
  async getBankDetails(chefId: number) {
    const response = await axios.get(`/earnings/bank-details/${chefId}/`);

    return response.data;
  },
  async requestWithdrawal(amount: string, bankDetailId: number) {
    const response = await axios.post("/earnings/withdrawals/", {
      amount,
      bank_detail: bankDetailId,
    });

    return response.data;
  },
};
