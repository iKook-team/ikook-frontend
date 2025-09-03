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
  cuisines: string[];
  service: number;
  events?: string[]; // Only for Large Event service
}

export interface CreateServiceBase {
  availability: boolean;
  chef_service: string;
  cover_image?: string | File | null;
  starting_price_per_person: string;
  min_num_of_guests: number;
  cuisines: string[];
}

export interface CreateLargeEventService extends CreateServiceBase {
  chef_service: "Large Event";
  events: string[];
}

export interface CreateCorporateDiningService extends CreateServiceBase {
  chef_service: "Corporate Dining";
  events: string[];
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
    const response = await apiClient.get<{ data: ServicesResponse }>(
      "/services/",
    );

    return response.data.data; // Extract the nested data property
  },

  // Update service availability
  updateServiceAvailability: async (
    id: number,
    availability: boolean,
  ): Promise<Service> => {
    const response = await apiClient.patch<{ data: Service }>(
      `/services/${id}/`,
      { availability },
    );

    return response.data.data; // Extract the nested data property
  },

  // Create a new service
  createService: async <T extends CreateServiceBase>(
    data: T,
  ): Promise<Service> => {
    const formData = new FormData();

    // Append all fields to formData
    Object.entries(data).forEach(([key, value]) => {
      if (key === "cover_image" && value) {
        // Handle file upload
        formData.append(key, value as File);
      } else if (Array.isArray(value)) {
        // Handle array fields (cuisines, events)
        value.forEach((item) => formData.append(key, item));
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.post<{ data: Service }>(
      "/services/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Disable axios-retry for this request
        ["axios-retry"]: { retries: 0 } as any,
      },
    );

    return response.data.data; // Extract the nested data property
  },

  // Get a single service by id
  getService: async (id: number): Promise<Service> => {
    const response = await apiClient.get<{ data: Service }>(`/services/${id}/`);
    return response.data.data;
  },

  // Update a service entirely/partially (multipart for file compatibility)
  updateService: async (
    id: number,
    data: Record<string, unknown>,
  ): Promise<Service> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "cover_image" && value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, String(item)));
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.patch<{ data: Service }>(
      `/services/${id}/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        // Disable axios-retry for this request
        ["axios-retry"]: { retries: 0 } as any,
      },
    );
    return response.data.data;
  },
};

export default servicesService;
