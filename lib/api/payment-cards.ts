import apiClient from "@/src/lib/axios";

export interface PaymentCard {
  id: number;
  gateway: string;
  bank: string;
  card_type: string;
  last4: string;
  authorization_code: string;
  setup_intent_id: string;
  payment_method_id: string;
  created_at: string;
}

export interface PaginatedResponse<T> {
  status: boolean;
  message: string;
  data: {
    count: number;
    next: number | null;
    previous: number | null;
    current: number;
    total: number;
    results: T[];
  };
}

export type PaymentCardsResponse = PaginatedResponse<PaymentCard>;

interface CheckoutResponse {
  status: boolean;
  message: string;
  data?: {
    checkout_url?: string;
    reference?: string;
    client_secret?: string;
    setup_intent_id?: string;
    setup_intent_client_secret?: string;
    id?: string;
  };
}

export const paymentCardsService = {
  async getCards(): Promise<PaymentCardsResponse> {
    try {
      const response =
        await apiClient.get<PaymentCardsResponse>("/payments/cards/");

      return response.data;
    } catch (error) {
      console.error("Error fetching cards:", error);

      return {
        status: false,
        message: "Failed to load cards",
        data: {
          count: 0,
          next: null,
          previous: null,
          current: 1,
          total: 0,
          results: [],
        },
      };
    }
  },

  async initializeCardSetup(country: string): Promise<CheckoutResponse> {
    try {
      const payload = {
        country,
        action: country === "United Kingdom" ? "setup" : "checkout",
        return_url: `${window.location.origin}/payment-cards`,
        metadata: {
          source: "web",
        },
      };

      const response = await apiClient.post<CheckoutResponse>(
        "/payments/cards/",
        payload,
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async verifyCard(reference: string): Promise<void> {
    try {
      const payload = {
        action: "verify",
        reference: reference,
      };

      await apiClient.post("/payments/cards/", payload);
    } catch (error) {
      throw error;
    }
  },

  async deleteCard(cardId: number): Promise<void> {
    try {
      await apiClient.delete(`/payments/cards/${cardId}/`);
    } catch (error) {
      throw error;
    }
  },
};
