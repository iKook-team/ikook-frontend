import apiClient from "@/src/lib/axios";

export const menuService = {
  async getMenuById(id: string | number) {
    const response = await apiClient.get(`/menus/${id}/`);
    return response.data;
  },
  async createMenu(data: any) {
    const response = await apiClient.post(`/menus/`, data);
    return response.data;
  },
  async createMenuItem(data: any) {
    const response = await apiClient.post(`/menus/items/`, data);
    return response.data;
  },
  async uploadMenuImage(formData: FormData) {
    const response = await apiClient.post(`/menus/images/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
