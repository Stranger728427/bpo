import { axiosInstance } from './axiosInstance';
import { store } from '@/app/store/store';
import useAuth from '@/app/store/Hooks/userAuth';
import { refreshTokenFlow } from './refreshToken';

export const setupInterceptors = () => {
  const { signOut } = useAuth();

  /**
   * REQUEST INTERCEPTOR
   * Attach latest access token
   */
  axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state?.UserAuth?.value?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  /**
   * RESPONSE INTERCEPTOR
   * Handle 401 + refresh token
   */
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error?.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const newToken = await refreshTokenFlow();

          originalRequest.headers.Authorization =
            `Bearer ${newToken}`;

          return axiosInstance(originalRequest);
        } catch (err) {
          await signOut();
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};