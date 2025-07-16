import apiClient from "@/src/lib/axios";

export const getDiscounts = async (status?: string) => {
  const params: Record<string, string> = {};
  if (status) params.status = status;
  const response = await apiClient.get("/discounts/", { params });
  return response.data;
}; 