import { ApiError, ApiResponse } from "../types/api.types";

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { data, status } = error.response;
    return {
      message: data?.message || "An error occurred",
      status: status || 500,
      errors: data?.errors,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: "No response from server. Please check your connection.",
      status: 0,
    };
  }
  // Something happened in setting up the request that triggered an Error
  return {
    message: error.message || "An unexpected error occurred",
    status: 0,
  };
};

// Helper to handle successful responses
export const handleSuccess = <T>(response: { data: ApiResponse<T> }): T => {
  if (!response.data.success) {
    throw {
      response: {
        data: {
          message: response.data.message || "Request failed",
          status: response.data.status || 400,
          errors: {},
        },
      },
    };
  }
  return response.data.data as T;
};
