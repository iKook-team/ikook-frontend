import axios from "@/src/lib/axios";
import { handleApiError } from "@/lib/utils/toast";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface LastMessage {
  id: number;
  message: string;
  image: string | null;
  is_read: boolean;
  created_at: string;
  chat: number;
  sender: number;
}

export interface LastBooking {
  id: number;
  chef_service: string;
  status: string;
  is_custom: boolean;
  chef_associations: string;
  selected_chef_id: string;
  created_at: string;
}

export interface Chat {
  id: number;
  host: User;
  chef: User;
  last_message: LastMessage | null;
  last_booking: LastBooking | null;
}

export interface Message {
  id: number;
  sender: User;
  message: string;
  image: string | null;
  is_read: boolean;
  created_at: string;
  chat: number;
}

export interface MessagesResponse {
  count: number;
  next: number | null;
  previous: number | null;
  current: number;
  total: number;
  results: Message[];
}

export interface ChatsResponse {
  count: number;
  next: number | null;
  previous: number | null;
  current: number;
  total: number;
  results: Chat[];
}

// Response type that matches the actual API response structure
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface SendMessageData {
  message: string;
  image?: string | null;
  chat: number;
}

export const chatService = {
  async getChats(): Promise<ChatsResponse> {
    try {
      const response = await axios.get("/chats/");
      
      // Always ensure we have a response object
      if (!response) {
        throw new Error('No response from server');
      }

      // Extract the data, defaulting to empty array if not found
      const responseData = response?.data?.data || response?.data || [];
      
      // Ensure we always return an array of chats
      let chatResults: Chat[] = [];
      
      if (Array.isArray(responseData)) {
        chatResults = responseData;
      } else if (responseData?.results && Array.isArray(responseData.results)) {
        chatResults = responseData.results;
      } else if (responseData?.id) {
        chatResults = [responseData];
      }
      
      // Return a valid response structure in all cases
      return {
        count: chatResults.length,
        next: null,
        previous: null,
        current: 1,
        total: chatResults.length,
        results: chatResults
      };
    } catch (error) {
      handleApiError(error, 'Failed to load conversations');
      throw error; // Re-throw to allow components to handle the error if needed
    }
  },

  async getMessages(chatId: number): Promise<MessagesResponse> {
    try {
      const response = await axios.get<{
        status: boolean;
        message: string;
        data: {
          count: number;
          next: number | null;
          previous: number | null;
          current: number;
          total: number;
          results: Message[];
        };
      }>(
        `/chats/messages/`,
        { params: { chat: chatId } }
      );
      
      if (!response?.data) {
        throw new Error('No data received from server');
      }
      
      // Log the response for debugging
      console.log('Messages API response:', response.data);
      
      // Handle the nested response structure
      const responseData = response.data.data || response.data;
      let messageResults: Message[] = [];
      
      if (responseData.results && Array.isArray(responseData.results)) {
        messageResults = responseData.results;
      } else if (Array.isArray(responseData)) {
        messageResults = responseData;
      }
      
      // Return in the expected format
      return {
        count: responseData.count || messageResults.length,
        next: responseData.next || null,
        previous: responseData.previous || null,
        current: responseData.current || 1,
        total: responseData.total || messageResults.length,
        results: messageResults
      };
    } catch (error) {
      handleApiError(error, 'Failed to load messages');
      throw error; // Re-throw to allow components to handle the error if needed
    }
  },

  async sendMessage(data: SendMessageData): Promise<Message> {
    try {
      const response = await axios.post<ApiResponse<Message>>(
        '/chats/messages/',
        data
      );

      if (!response?.data?.data) {
        throw new Error('No data received from server');
      }

      return response.data.data;
    } catch (error) {
      handleApiError(error, 'Failed to send message');
      throw error;
    }
  },
};
