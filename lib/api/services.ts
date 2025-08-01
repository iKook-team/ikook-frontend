import apiClient from "@/src/lib/axios";

export interface ChefProfile {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string | null;
  city: string;
  num_reviews: number;
  average_rating: number;
}

export interface Service {
  id: number;
  chef: ChefProfile;
  availability: boolean;
  chef_service: string;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  is_favourite: boolean;
  starting_price_per_person: string;
  min_num_of_guests: number;
  cuisines: any[]; // You might want to define a proper type for cuisines
  service: number;
}

export interface ServicesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  current: number;
  total: number;
  results: Service[];
}

export const servicesService = {
  // Fetch all services for the current chef
  fetchServices: async (): Promise<ServicesResponse> => {
    const response = await apiClient.get<ServicesResponse>('/services/');
    return response.data;
  },

  // Update service availability
  updateServiceAvailability: async (id: number, availability: boolean): Promise<Service> => {
    const response = await apiClient.patch<Service>(`/services/${id}/`, { availability });
    return response.data;
  },
};

export default servicesService;
