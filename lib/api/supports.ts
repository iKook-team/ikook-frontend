import apiClient from "@/src/lib/axios";

export type UserTypeParam = "Host" | "Chef";

export interface FaqItem {
  id: number;
  user_type: UserTypeParam;
  question: string;
  answer: string;
  created_at: string; // ISO
}

export interface FaqListResponse {
  count: number;
  next: number | null;
  previous: number | null;
  current: number | null;
  total: number | null;
  results: FaqItem[];
}

interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface SupportUser {
  id: number;
  username: string;
  user_type: UserTypeParam;
  first_name: string;
  last_name: string;
  avatar?: string | null;
}

export interface TicketItem {
  id: number;
  user: SupportUser;
  admin: SupportUser;
  category: string; // e.g., "Booking"
  title: string;
  status: string; // e.g., "Open"
  created_at: string; // ISO
}

export interface TicketsResponse {
  count: number;
  next: number | null;
  previous: number | null;
  current: number | null;
  total: number | null;
  results: TicketItem[];
}

// Support ticket messages
export interface TicketMessageUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar?: string | null;
}

export interface TicketMessageItem {
  id: number;
  ticket: number;
  sender: TicketMessageUser;
  message: string;
  image: string | null;
  is_read: boolean;
  created_at: string; // ISO
}

export interface TicketMessagesResponse {
  count: number;
  next: number | null;
  previous: number | null;
  current: number | null;
  total: number | null;
  results: TicketMessageItem[];
}

export const supportsService = {
  async getFaqs(user_type: UserTypeParam, params: Record<string, any> = {}) {
    const response = await apiClient.get<ApiEnvelope<FaqListResponse>>(
      "/supports/faqs/",
      {
        params: { user_type, ...params },
      },
    );

    return response.data.data;
  },
  async getTickets(params: Record<string, any> = {}) {
    const response = await apiClient.get<ApiEnvelope<TicketsResponse>>(
      "/supports/tickets/",
      {
        params,
      },
    );

    return response.data.data;
  },
  async createTicket(data: {
    category: string;
    title: string;
    message: string;
  }) {
    const response = await apiClient.post<ApiEnvelope<TicketItem>>(
      "/supports/tickets/",
      data,
    );

    return response.data.data;
  },
  async getTicketMessages(ticketId: number, params: Record<string, any> = {}) {
    const response = await apiClient.get<ApiEnvelope<TicketMessagesResponse>>(
      "/supports/tickets/messages/",
      {
        params: { ticket: ticketId, ...params },
      },
    );

    return response.data.data;
  },
  async sendTicketMessage(data: {
    ticket: number;
    message?: string;
    image?: File | null;
  }) {
    // Use FormData to support optional image upload
    const formData = new FormData();

    formData.append("ticket", String(data.ticket));
    if (data.message) formData.append("message", data.message);
    if (data.image) formData.append("image", data.image);

    const response = await apiClient.post<ApiEnvelope<TicketMessageItem>>(
      "/supports/tickets/messages/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return response.data.data;
  },
};
