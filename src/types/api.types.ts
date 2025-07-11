// Common API response type
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status: number;
  success: boolean;
}

// Error response type
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Pagination type for list responses
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Add more specific types as needed for your API responses
