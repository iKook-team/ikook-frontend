import { authService } from './auth';
import apiClient from '@/src/lib/axios';

export interface CreateAddressData {
  place_name: string;
  address_line_one: string;
  address_line_two: string;
  country: string;
  city: string;
  postal_code: string;
}

export interface Address {
  id: number;
  place_name: string;
  address_line_one: string;
  address_line_two: string;
  city: string;
  country: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
}

export interface AddressListResponse {
  count: number;
  next: number | null;
  previous: number | null;
  current: number;
  total: number;
  results: Address[];
}

export const addressService = {
  async getAddresses(): Promise<AddressListResponse> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await apiClient.get<{ data: AddressListResponse }>('/users/profiles/addresses/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Return the nested data property from the response
    return response.data.data;
  },

  async addAddress(data: CreateAddressData): Promise<Address> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await apiClient.post<{ data: Address }>('/users/profiles/addresses/', {
      place_name: data.place_name,
      address_line_one: data.address_line_one,
      address_line_two: data.address_line_two,
      city: data.city,
      postal_code: data.postal_code,
      country: data.country
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  },

  async getAddress(id: number): Promise<Address> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await apiClient.get<{ data: Address }>(`/users/profiles/addresses/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data.data;
  },

  async updateAddress(id: number, data: Partial<CreateAddressData>): Promise<Address> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await apiClient.patch<{ data: Address }>(`/users/profiles/addresses/${id}/`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  },
};
