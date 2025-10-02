import apiClient from "@/src/lib/axios";

// Types
export type MenuTag =
  | "Chef at Home"
  | "Corporate Dining"
  | "Fine Dining"
  | "Large Event"
  | "Meal Delivery"
  | "Meal Prep";

export type ServiceTag = "Box Grocery" | "Cooking Class" | "Eating Coach";

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface Chef {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  cover_photo: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  is_verified: boolean;
  average_rating: number | null;
  num_reviews: number;
  cuisine_types: string[];
  created_at: string;
  updated_at: string;
}

interface Menu {
  id: number;
  name: string;
  description: string;
  price_per_person: string;
  chef: number;
  chef_details: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string | null;
    city: string | null;
    average_rating: number | null;
    num_reviews: number;
  };
  menu_type: MenuTag;
  items: Array<{
    id: number;
    name: string;
    description: string;
    price: string;
  }>;
  images: Array<{
    id: number;
    image: string;
    is_primary: boolean;
  }>;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price_per_person: string;
  chef: number;
  chef_details: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string | null;
    city: string | null;
    average_rating: number | null;
    num_reviews: number;
  };
  chef_service: ServiceTag;
  images: Array<{
    id: number;
    image: string;
    is_primary: boolean;
  }>;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface BaseListingParams {
  page?: number;
  page_size?: number;
  search?: string;
  market?: string;
  city?: string;
  order_by?: string;
  // Add other common filters as needed
}

interface MenuListingParams extends BaseListingParams {
  menu_type?: MenuTag;
  // Add menu-specific filters
  status?: string;
}

interface ServiceListingParams extends BaseListingParams {
  chef_service?: ServiceTag;
  // Add service-specific filters
}

interface ChefListingParams extends BaseListingParams {
  // Add chef-specific filters
}

export const listingService = {
  // Get menu listings
  async getMenus(params: MenuListingParams = {}): Promise<ApiResponse<Menu>> {
    const requestParams = { ...params, page_size: 20 };

    console.log("Fetching menus with params:", requestParams);

    try {
      const response = await apiClient.get<{
        status: boolean;
        message: string;
        data: ApiResponse<Menu>;
      }>("/menus/", {
        params: requestParams,
      });

      console.log("Menu API response:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        count: response.data?.data?.count,
        results: response.data?.data?.results?.length,
      });

      if (!response.data?.data?.results) {
        console.warn("No results array in menu response:", response.data);

        return { count: 0, next: null, previous: null, results: [] };
      }

      // Map the response to match the expected ApiResponse<Menu> format
      return response.data.data;
    } catch (error: any) {
      // Return an empty result set instead of throwing to prevent UI crashes
      return { count: 0, next: null, previous: null, results: [] };
    }
  },

  // Get service listings
  async getServices(
    params: ServiceListingParams = {},
  ): Promise<ApiResponse<Service>> {
    try {
      const response = await apiClient.get("/services/", {
        params: { ...params, page_size: 20 },
      });

      // Support wrapped responses: { status, message, data: { count, results, ... } }
      // and unwrapped responses: { count, results, ... }
      const payload: any = response.data;
      const data: ApiResponse<Service> | undefined = payload?.data ?? payload;

      if (!data || !Array.isArray(data.results)) {
        return { count: 0, next: null, previous: null, results: [] };
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get chef profiles
  async getChefs(params: ChefListingParams = {}): Promise<ApiResponse<Chef>> {
    try {
      const response = await apiClient.get("/users/profiles/", {
        params: {
          ...params,
          user_type: "Chef",
          page_size: 20,
        },
      });

      // Response may be wrapped: { status, message, data: { count, results, ... } }
      // or unwrapped: { count, results, ... }
      const payload: any = response.data;
      const data: ApiResponse<Chef> | undefined = payload?.data ?? payload;

      if (!data || !Array.isArray(data.results)) {
        // Return empty list to avoid UI crashes
        return { count: 0, next: null, previous: null, results: [] };
      }

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching chefs:", error);
      throw error;
    }
  },

  // Get a single menu by ID
  getMenuById: async (id: string | number): Promise<Menu> => {
    try {
      const response = await apiClient.get(`/menus/${id}/`);

      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to fetch menu ${id}:`, error);
      throw error;
    }
  },

  // Get a single service by ID
  getServiceById: async (id: string | number) => {
    try {
      const response = await apiClient.get(`/services/${id}/`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a single chef by ID
  getChefById: async (id: string | number) => {
    try {
      const response = await apiClient.get(`/users/profiles/${id}/`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default listingService;
