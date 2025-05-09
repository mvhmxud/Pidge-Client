import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
});

let failedRequests: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If 401 and not a refresh request and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("refresh-token") &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Queue the failed request
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh tokens
        await api.post("/api/auth/refresh-token");

        // Retry the original request
        const retryResponse = await api(originalRequest);

        // Process any queued requests
        failedRequests.forEach((prom) => prom.resolve(api(originalRequest)));
        failedRequests = [];

        return retryResponse;
      } catch (refreshError) {
        // Clear queue and redirect to login if refresh fails
        failedRequests.forEach((prom) => prom.reject(refreshError));
        failedRequests = [];
        // window.location.href = paths.login;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    console.log("refreshed throw axios interceptor ");
    return Promise.reject(error);
  }
);

export default api;
