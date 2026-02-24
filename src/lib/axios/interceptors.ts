import axios from 'axios';
import { signOut } from '@/app/store/Hooks/userAuth';

/**
 * Performs a plain (no-interceptor) refresh token call.
 * Uses raw axios (NOT the intercepted instance) to avoid infinite retry loops.
 */
const refreshTokenFlow = async (): Promise<void> => {
  await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/authcentral/token`,
    { tokenType: 'REFRESH' },
    { withCredentials: true }
  );
};

export const useApi = () => {
  const baseApi = (headers?: Record<any, any>) => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 120000,
      withCredentials: true,
      headers: {
        ...headers,
      },
    });

    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Only attempt to refresh if we get a 401 and haven't tried refreshing yet
        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            console.log('Refreshing token...');
            await refreshTokenFlow();
            // Refresh successful — retry the original request
            return instance(originalRequest);
          } catch (refreshError) {
            // Refresh failed — sign out the user
            console.log('Refresh failed, signing out...');
            await signOut();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  };

  return { baseApi };
};
