import apiClient from "@/src/lib/axios";

// Types
export type FavouriteType = "chef" | "menu";

export interface Chef {
  id: number;
  user_type: string;
  username: string;
  email: string;
  is_active: boolean;
  bank_details: number;
  average_rating: number;
  is_favourite: boolean;
  balance: number;
  num_reviews: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  bio: string;
  avatar: string;
  country: string;
  city: string;
  postal_code: string;
  address: string;
  landmark: string;
  location: string;
  currency: string;
  identity_type: string;
  identity_number: string;
  email_notify: boolean;
  sms_notify: boolean;
  identity_verified: boolean;
  created_at: string;
  updated_at: string;
  service_type: string;
  chef_services: string[];
  cuisines: string[];
  has_work_permit: boolean;
  has_criminal_record: boolean;
  website: string;
  link_to_cooking_images: string;
  identity_document: string;
  culinary_certificate: string;
  weekly_charges: string;
  monthly_charges: string;
  events_available_for: string[];
  serviceable_location: string;
  serviceable_radius: number;
  extra_km: number;
  extra_km_charge: number;
  document_verified: boolean;
}

export interface MenuItem {
  id: number;
  course: string;
  name: string;
  description: string;
  mongodb_id: string;
  created_at: string;
  updated_at: string;
  menu: number;
}

export interface MenuImage {
  id: number;
  image: string;
  created_at: string;
  menu: number;
}

export interface MenuChef {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  city: string;
  num_reviews: string;
  average_rating: string;
}

export interface Menu {
  id: number;
  name: string;
  price_per_person: string;
  num_of_guests: number;
  max_menu_selection: number;
  event_types: string[];
  cuisine_types: string[];
  menu_type: string;
  courses: string[];
  courses_selection_limit: string;
  courses_extra_charge_per_person: string;
  status: string;
  items: MenuItem[];
  images: MenuImage[];
  is_favourite: string;
  chef: MenuChef;
}

export interface FavouriteItem {
  id: number;
  chef: Chef | null;
  menu: Menu | null;
  created_at: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface FavouritesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  current: number;
  total: number;
  results: FavouriteItem[];
}

export const favouritesService = {
  /**
   * Get user's favorite items
   * @param type Type of favorites to retrieve ('chef' or 'menu')
   * @param page Page number for pagination
   * @param pageSize Number of items per page
   */
  getFavourites: async (
    type: FavouriteType,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<FavouritesResponse> => {
    try {
      const response = await apiClient.get<ApiResponse<FavouritesResponse>>(
        "/favourites/",
        {
          params: {
            type,
            page,
            page_size: pageSize,
          },
        },
      );

      return response.data.data;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw error;
    }
  },

  /**
   * Add an item to favorites
   * @param type Type of item to add ('chef' or 'menu')
   * @param id ID of the item to add to favorites
   */
  addToFavourites: async (type: FavouriteType, id: number): Promise<void> => {
    try {
      await apiClient.post("/favourites/", { type, id });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    }
  },

  /**
   * Remove an item from favorites
   * @param id ID of the favorite item to remove
   */
  removeFromFavourites: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/favourites/${id}/`);
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    }
  },

  /**
   * Check if an item is in favorites
   * @param type Type of item to check ('chef' or 'menu')
   * @param id ID of the item to check
   */
  isItemFavourited: async (
    type: FavouriteType,
    id: number,
  ): Promise<boolean> => {
    try {
      const response = await apiClient.get<
        ApiResponse<{ is_favourited: boolean }>
      >(`/favourites/check/`, { params: { type, id } });

      return response.data.data.is_favourited;
    } catch (error) {
      console.error("Error checking favorite status:", error);

      return false;
    }
  },
};

export default favouritesService;
