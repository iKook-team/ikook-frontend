import apiClient from "@/src/lib/axios";

export interface NewsletterPayload {
  email: string;
  name?: string;
}

export const newsletterService = {
  subscribe: async (payload: NewsletterPayload) => {
    const res = await apiClient.post(`/users/auth/newsletter/`, {
      ...payload,
      email: payload.email.toLowerCase(), // Normalize email to lowercase
    });
    return res.data as { email: string; email_sent: boolean; message?: string };
  },
};
