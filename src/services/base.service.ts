import apiClient from "../lib/axios";
import { ApiResponse, PaginatedResponse } from "../types/api.types";
import { handleApiError, handleSuccess } from "../lib/api-utils";

export default class BaseService<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Get all items (with pagination)
  async getAll(params?: Record<string, any>): Promise<PaginatedResponse<T>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<T>>>(
        this.endpoint,
        { params }
      );
      return handleSuccess<PaginatedResponse<T>>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get single item by ID
  async getById(id: string | number): Promise<T> {
    try {
      const response = await apiClient.get<ApiResponse<T>>(
        `${this.endpoint}/${id}`
      );
      return handleSuccess<T>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Create new item
  async create<CreateDto, ResponseT = T>(data: CreateDto): Promise<ResponseT> {
    try {
      const response = await apiClient.post<ApiResponse<ResponseT>>(
        this.endpoint,
        data
      );
      return handleSuccess<ResponseT>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Update item
  async update<UpdateDto, ResponseT = T>(
    id: string | number,
    data: UpdateDto
  ): Promise<ResponseT> {
    try {
      const response = await apiClient.put<ApiResponse<ResponseT>>(
        `${this.endpoint}/${id}`,
        data
      );
      return handleSuccess<ResponseT>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Delete item
  async delete(id: string | number): Promise<boolean> {
    try {
      const response = await apiClient.delete<ApiResponse<boolean>>(
        `${this.endpoint}/${id}`
      );
      return handleSuccess<boolean>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
}
