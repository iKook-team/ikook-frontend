import apiClient from "@/src/lib/axios";

export const paymentsService = {
  async pay(quoteId: number) {
    try {
      // Build return URL to host dashboard after checkout
      const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      const returnUrl = `${baseUrl}/dashboard/host`;

      const response = await apiClient.post("/payments/", {
        quote: quoteId,
        use_checkout: true,
        use_wallet: false,
        use_bonus: false,
        action: "pay",
        return_url: returnUrl,
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

  async verifyWalletFunding(reference: string) {
    try {
      const response = await apiClient.post("/payments/wallets/transactions/", {
        action: "verify",
        reference,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async fundWallet(amount: number | string) {
    try {
      const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      const returnUrl = `${baseUrl}/wallet`;

      const response = await apiClient.post("/payments/wallets/transactions/", {
        amount,
        use_checkout: true,
        action: "fund",
        return_url: returnUrl,
      });

      return response.data;
    } catch (error) {
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
      throw error;
    }
  },

  async getWalletDetails() {
    try {
      const response = await apiClient.get("/payments/wallets/details/");

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getWalletTransactions() {
    try {
      const response = await apiClient.get("/payments/wallets/transactions/");

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async redeemGiftCard(cardNumber: string) {
    try {
      const response = await apiClient.post(
        "/payments/wallets/transactions/redeem-gift-card/",
        {
          card_number: cardNumber,
        },
      );

      return response.data;
    } catch (error) {
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
      throw error;
    }
  },

  async updateBankDetails(bankId: number, data: any) {
    try {
      const response = await apiClient.patch(
        `/earnings/bank-details/${bankId}/`,
        data,
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createBankDetails(data: any) {
    try {
      const response = await apiClient.post("/earnings/bank-details/", data);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
