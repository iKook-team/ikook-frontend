import axios from "@/src/lib/axios";

export const menuService = {
  async getMenuById(id: string | number) {
    const response = await axios.get(`/menus/${id}/`);
    return response.data;
  },
}; 