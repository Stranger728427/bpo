import { axiosInstance } from './axiosInstance';

// Request interceptor - can be extended later for auth tokens
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token here when auth is implemented
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (e.g., 401 for auth)
    return Promise.reject(error);
  }
);

export const setupInterceptors = () => {
  // This function can be called to initialize interceptors
  // after the store is available
};
