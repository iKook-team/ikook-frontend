import { authService } from "./auth";

import apiClient from "@/src/lib/axios";

export interface Reference {
  id: number;
  email: string;
  full_name: string;
  country: string;
  address: string;
  occupation: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export interface ReferenceListResponse {
  count: number;
  next: number | null;
  previous: number | null;
  current: number;
  total: number;
  results: Reference[];
}

export const referenceService = {
  async getReferences(): Promise<ReferenceListResponse> {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No authentication token available");
    }

    const response = await apiClient.get<{ data: ReferenceListResponse }>(
      "/users/profiles/references/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  },

  async createReference(
    data: Omit<Reference, "id" | "created_at" | "updated_at">,
  ): Promise<Reference> {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No authentication token available");
    }

    const response = await apiClient.post<{ data: Reference }>(
      "/users/profiles/references/",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.data;
  },

  async updateReference(
    id: number,
    data: Partial<Omit<Reference, "id" | "created_at" | "updated_at">>,
  ): Promise<Reference> {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No authentication token available");
    }

    const response = await apiClient.patch<{ data: Reference }>(
      `/users/profiles/references/${id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.data;
  },

  async deleteReference(id: number): Promise<void> {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No authentication token available");
    }

    await apiClient.delete(`/users/profiles/references/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
