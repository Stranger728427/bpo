import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { axiosInstance } from './axiosInstance';
import { RequestHeaders } from './types';
import { siteConfig } from '@/components/constants/Constant';
import { store } from '@/app/store/store';

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const user = state?.UserAuth?.value;

    const tenantNameFromConfig = siteConfig.tenantName;
    const tenantIdFromUser = user?.email;
    const currentUserId = user?.userId;
    const currentEmail = user?.email;
    const userRoles = user?.roles;

    if (tenantNameFromConfig) {
      config.headers[RequestHeaders.TENANT_ID] = tenantNameFromConfig;
    }
    if (tenantIdFromUser) {
      config.headers[RequestHeaders.TENANT_ID] = tenantIdFromUser;
    }
    if (currentUserId) {
      config.headers[RequestHeaders.USER_ID] = currentUserId;
    }
    if (currentEmail) {
      config.headers[RequestHeaders.USER_NAME] = currentEmail;
    }
    if (userRoles && userRoles.length > 0) {
      config.headers[RequestHeaders.USER_ROLE] = userRoles.join(', ');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh token endpoint
        await axiosInstance.put('/token', { tokenType: 'Refresh' });
        
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Handle logout if refresh fails
        // store.dispatch(logout()); // Need to import logout action or handle via event
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

