// API service for addons
import apiClient from "@/src/lib/axios";

export interface Addon {
  id: number;
  name: string;
  price: string; // Note: API returns as string, not number
  image: string;
  client: number; // Client ID
  client_name: string; // Client business name
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AddonListResponse {
  status: boolean;
  message: string;
  data: Addon[];
}

export interface AddonCarouselProps {
  selectedAddons: number[];
  onAddonToggle: (addonId: number) => void;
}

export const addonService = {
  async getAddons(): Promise<AddonListResponse> {
    console.log('Making public API call to /addons/');

    const response = await apiClient.get<AddonListResponse>(
      "/addons/",
    );

    console.log('Public API response received:', response);
    console.log('Response data:', response.data);

    // Return the response data directly (matches API structure)
    return response.data;
  },
};