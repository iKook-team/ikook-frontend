// Token storage keys
const TOKEN_KEY = "ikook_auth_token";
const REFRESH_TOKEN_KEY = "ikook_refresh_token";

export type AuthTokens = {
  token: string;
  refreshToken: string;
};

// Save tokens to localStorage
export const saveTokens = (token: string, refreshToken: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    // Debug logging removed
  }
};

// Get access token
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_KEY);

    // Debug logging removed
    return token;
  }

  return null;
};

// Get refresh token
export const getRefreshToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);

    // Debug logging removed
    return token;
  }

  return null;
};

// Clear all auth data
export const clearToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    // Debug logging removed
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const hasToken = getToken() !== null;

  // Debug logging removed
  return hasToken;
};
