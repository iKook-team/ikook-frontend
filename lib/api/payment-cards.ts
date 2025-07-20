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

export interface PaymentCardsResponse {
  count: number;
  next: number;
  previous: number;
  current: number;
  total: number;
  results: PaymentCard[];
}

export const paymentCardsService = {
  async getCards(): Promise<PaymentCardsResponse> {
    try {
      const response = await apiClient.get<PaymentCardsResponse>("/payments/cards/");
      return response.data;
    } catch (error) {
      // Return an empty result set instead of throwing to prevent UI crashes
      return { count: 0, next: 0, previous: 0, current: 0, total: 0, results: [] };
    }
  },
}; 