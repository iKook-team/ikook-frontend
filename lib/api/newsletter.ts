import apiClient from "@/src/lib/axios";

export interface NewsletterPayload {
  email: string;
  name?: string;
}

export interface AdBookingPayload {
  name: string;
  email: string;
  phone: string;
  location: string;
  event_type: string;
  event_date: string;
}

export const newsletterService = {
  subscribe: async (payload: NewsletterPayload) => {
    const res = await apiClient.post(`/users/auth/newsletter/`, {
      ...payload,
      email: payload.email.toLowerCase(), // Normalize email to lowercase
    });

    return res.data as { email: string; email_sent: boolean; message?: string };
  },

  submitAdBooking: async (payload: AdBookingPayload) => {
    const response = await apiClient.post(`/users/contact/`, payload);

    return response.data;
  },
};
