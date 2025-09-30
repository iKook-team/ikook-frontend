import apiClient from "@/src/lib/axios";

export const getDiscounts = async (status?: string) => {
  const params: Record<string, string> = {};

  if (status) params.status = status;
  const response = await apiClient.get("/discounts/", { params });

  // Support wrapped responses: { status, message, data: { count, results, ... } }
  // and unwrapped responses: { count, results, ... }
  const payload: any = response.data;
  const data = payload?.data ?? payload;

  return data;
};

export interface CreateDiscountDto {
  discount_item: "All" | "Single Item";
  discount_percentage: number;
  start_date: string; // yyyy-mm-dd
  end_date: string; // yyyy-mm-dd
  menu?: number; // required if discount_item === 'Single Item' for Chef service
  grocery?: number; // required if discount_item === 'Single Item' for Box Groceries service
}

export const createDiscount = async (payload: CreateDiscountDto) => {
  const response = await apiClient.post("/discounts/", payload);

  return response.data;
};
