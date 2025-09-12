import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import axiosRetry, { exponentialDelay } from "axios-retry";

import { getToken, clearToken } from "./auth";

// Create axios instance with base URL and headers
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000, // 20 seconds for slower networks
});

// Configure retry mechanism
axiosRetry(apiClient, {
  retries: 5, // increase retries to better handle transient errors
  retryDelay: exponentialDelay, // exponential back-off between retries
  retryCondition: (error) => {
    // Retry on network errors and 5xx server errors
    return !!(
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response && error.response.status >= 500)
    );
  },
  shouldResetTimeout: true, // reset the timeout between retries
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`Retry attempt ${retryCount} for ${requestConfig.url}`);
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      // Safely set the Authorization header
      (config.headers as Record<string, string>).Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Handle 401 Unauthorized responses
    if (error.response?.status === 401) {
      clearToken();
      // Redirect to login or handle as needed
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
