import apiClient from "@/src/lib/axios";

export const paymentsService = {
  async pay(quoteId: number) {
    try {
      // Get the base URL for the current environment
      const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      const callbackUrl = `${baseUrl}/dashboard/payment/callback`;

      console.log("Initiating payment with callback URL:", callbackUrl);

      const response = await apiClient.post("/payments/", {
        quote: quoteId,
        use_checkout: true,
        use_wallet: false,
        use_bonus: false,
        action: "pay",
        callback_url: callbackUrl,
      });

      console.log("Payment API response:", response);

      // Ensure the response has the expected structure
      if (
        response.data &&
        response.data.data &&
        response.data.data.checkout_url
      ) {
        return {
          ...response.data.data,
          status: response.data.status,
          message: response.data.message,
        };
      }

      return response.data;
    } catch (error) {
      console.error("Error in pay:", error);
      throw error;
    }
  },

  async verify(reference: string) {
    try {
      console.log("Sending verification request for reference:", reference);
      const response = await apiClient.post("/payments/", {
        action: "verify",
        reference: reference,
      });

      console.log("Verification response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  },

  async getWalletDetails() {
    try {
      const response = await apiClient.get("/payments/wallets/details/");
      return response.data;
    } catch (error) {
      console.error("Error getting wallet details:", error);
      throw error;
    }
  },

  async getWalletTransactions() {
    try {
      const response = await apiClient.get("/payments/wallets/transactions/");
      return response.data;
    } catch (error) {
      console.error("Error getting wallet transactions:", error);
      throw error;
    }
  },

  async redeemGiftCard(cardNumber: string) {
    try {
      const response = await apiClient.post("/payments/redeem-gift-card/", {
        card_number: cardNumber,
      });
      return response.data;
    } catch (error) {
      console.error("Error redeeming gift card:", error);
      throw error;
    }
  },

  async getBanks() {
    try {
      const response = await apiClient.get("/payments/banks/");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBankDetails(bankId: number) {
    try {
      const response = await apiClient.get(`/earnings/bank-details/${bankId}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching bank details:", error);
      throw error;
    }
  },

  async updateBankDetails(bankId: number, data: any) {
    try {
      const response = await apiClient.patch(`/earnings/bank-details/${bankId}/`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating bank details:", error);
      throw error;
    }
  },

  async createBankDetails(data: any) {
    try {
      const response = await apiClient.post("/earnings/bank-details/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating bank details:", error);
      throw error;
    }
  },
};
