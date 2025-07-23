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
interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
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
      console.error('Error in chatService.getChats:', error);
      handleApiError(error, 'Failed to load conversations');
      throw error; // Re-throw to allow components to handle the error if needed
    }
  },

  async getMessages(chatId: number): Promise<MessagesResponse> {
    try {
      const response = await axios.get(
        `/chats/messages/`,
        { params: { chat: chatId } }
      );
      
      if (!response?.data) {
        throw new Error('No data received from server');
      }
      
      // Log the response for debugging
      console.log('Messages API response:', response.data);
      
      // Handle different response formats
      let messageResults: Message[] = [];
      
      // Case 1: Response has a 'results' array (standard paginated response)
      if (response.data.results && Array.isArray(response.data.results)) {
        messageResults = response.data.results;
      } 
      // Case 2: Response is an array (direct array of messages)
      else if (Array.isArray(response.data)) {
        messageResults = response.data;
      }
      
      // Return in the expected format
      return {
        count: messageResults.length,
        next: response.data.next || null,
        previous: response.data.previous || null,
        current: 1,
        total: messageResults.length,
        results: messageResults
      };
    } catch (error) {
      handleApiError(error, 'Failed to load messages');
      throw error; // Re-throw to allow components to handle the error if needed
    }
  },
};
