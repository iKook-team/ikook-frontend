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
  async updateMenu(id: string | number, data: any) {
    const response = await apiClient.patch(`/menus/${id}/`, data);
    return response.data;
  },
  async deleteMenu(id: string | number) {
    const response = await apiClient.delete(`/menus/${id}/`);
    return response.data;
  },
  async createMenuItem(data: any) {
    const response = await apiClient.post(`/menus/items/`, data);
    return response.data;
  },
  async updateMenuItem(id: string | number, data: any) {
    const response = await apiClient.patch(`/menus/items/${id}/`, data);
    return response.data;
  },
  async deleteMenuItem(id: string | number) {
    const response = await apiClient.delete(`/menus/items/${id}/`);
    return response.data;
  },
  async uploadMenuImage(formData: FormData) {
    const response = await apiClient.post(`/menus/images/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  async deleteMenuImage(id: string | number) {
    const response = await apiClient.delete(`/menus/images/${id}/`);
    return response.data;
  },
  async generateMenuItemDescription(payload: {
    name: string;
    course?: string;
    cuisine_types?: string[];
  }) {
    const response = await apiClient.post(`/menus/items/ai-description/`, payload);
    return response.data;
  },
};
