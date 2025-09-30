import apiClient from "@/src/lib/axios";

export interface GroceryImage {
  id: number;
  image: string;
  grocery: number;
}

export interface GroceryItem {
  name: string;
  weight: string; // keep as string to match API
  measurement_unit: string;
}

export type GroceryStatus = "Active" | "Pending" | "Review" | "Deleted";

export interface Grocery {
  id: number;
  name: string;
  product_type: "Single Item" | "Multiple Items";
  weight_or_quantity?: string;
  measurement_unit?: string;
  category: string;
  price: string;
  status: GroceryStatus;
  items?: GroceryItem[];
  images: GroceryImage[];
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface Wrapped<T> {
  status: boolean;
  message: string;
  data: ApiResponse<T>;
}

export const groceriesService = {
  async getGroceryById(id: string | number): Promise<Grocery> {
    const response = await apiClient.get<Wrapped<Grocery> | Grocery>(
      `/groceries/${id}/`,
    );
    const payload: any = response.data;
    const data: Grocery | undefined =
      payload && (payload as any).data
        ? (payload as any).data
        : (payload as any);

    return data as Grocery;
  },
  async getGroceries(
    params: Partial<{
      page: number;
      page_size: number;
      status: GroceryStatus;
      chef_id: string | number;
    }>,
  ): Promise<ApiResponse<Grocery>> {
    try {
      const response = await apiClient.get<
        Wrapped<Grocery> | ApiResponse<Grocery>
      >("/groceries/", {
        params: { page_size: 20, ...params },
      });

      const payload: any = response.data;
      const data: ApiResponse<Grocery> | undefined = payload?.data ?? payload;

      if (!data || !Array.isArray(data.results)) {
        return { count: 0, next: null, previous: null, results: [] };
      }

      return data;
    } catch (error) {
      return { count: 0, next: null, previous: null, results: [] };
    }
  },
  async createGrocery(payload: {
    name: string;
    product_type: "Single Item" | "Multiple Items";
    weight_or_quantity?: string;
    measurement_unit?: string;
    category: string;
    price: string;
    status: GroceryStatus;
    items?: GroceryItem[];
  }): Promise<Grocery> {
    const res = await apiClient.post<Wrapped<Grocery> | Grocery>(
      "/groceries/",
      payload,
    );
    const payloadResp: any = res.data;
    const data: Grocery | undefined =
      payloadResp && payloadResp.data ? payloadResp.data : payloadResp;

    return data as Grocery;
  },
  async uploadGroceryImage(payload: {
    image: string;
    grocery: number | string;
  }): Promise<{ id: number; image: string; grocery: number }> {
    const res = await apiClient.post("/groceries/images/", payload);

    return res.data;
  },
  async uploadGroceryImageFile(
    file: File | Blob,
    groceryId: number | string,
  ): Promise<{ id: number; image: string; grocery: number }> {
    const form = new FormData();
    // Include filename if available
    const filename = (file as File)?.name || "upload.jpg";

    form.append("image", file, filename);
    form.append("grocery", String(groceryId));
    const res = await apiClient.post("/groceries/images/", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },
  async uploadGroceryImageForm(
    formData: FormData,
  ): Promise<{ id: number; image: string; grocery: number }> {
    const res = await apiClient.post(`/groceries/images/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },
  async deleteGroceryImage(id: string | number) {
    const res = await apiClient.delete(`/groceries/images/${id}/`);

    return res.data;
  },
  async updateGrocery(
    id: string | number,
    payload: Partial<{
      name: string;
      product_type: "Single Item" | "Multiple Items";
      weight_or_quantity?: string;
      measurement_unit?: string;
      category: string;
      price: string;
      status: GroceryStatus;
      items?: GroceryItem[];
    }>,
  ): Promise<Grocery> {
    const res = await apiClient.patch<Wrapped<Grocery> | Grocery>(
      `/groceries/${id}/`,
      payload,
    );
    const dataAny: any = res.data;
    const data: Grocery | undefined =
      dataAny && dataAny.data ? dataAny.data : dataAny;

    return data as Grocery;
  },
};

export default groceriesService;
