import axios from 'axios';
import { signOut } from '@/app/store/Hooks/userAuth';
import { AuthService } from '@/features/auth/components/services/authService.service';
import { API_TYPE } from '@/components/constants/Constant';

/**
 * Auth endpoints that should NEVER trigger a token refresh on 401.
 * A 401 on these means the user's credentials/code are wrong — not session expiry.
 */
const AUTH_ENDPOINTS_EXCLUDED_FROM_REFRESH = [
  '/authcentral/login',   // tenant validation
  '/authcentral/token',   // auth code exchange & token refresh itself
];

const isAuthEndpoint = (url: string = ''): boolean =>
  AUTH_ENDPOINTS_EXCLUDED_FROM_REFRESH.some((endpoint) =>
    url.includes(endpoint)
  );

/**
 * Performs a plain (no-interceptor) refresh token call.
 * Uses raw axios (NOT the intercepted instance) to avoid infinite retry loops.
 * Uses PUT to align with the REST convention (updating an existing token resource).
 */
const refreshTokenFlow = async (): Promise<void> => {
	const authService = AuthService();
	await authService.refreshToken();
};

export const useApi = () => {
  const baseApi = (headers?: Record<any, any>) => {
    const instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_BASE_URL}/${API_TYPE}`,
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

        const is401 = error?.response?.status === 401;
        const alreadyRetried = originalRequest._retry;
        const isExcluded = isAuthEndpoint(originalRequest?.url);

        // Skip refresh for auth endpoints (login/token exchange) — a 401 there
        // means wrong credentials, not an expired session.
        if (is401 && !alreadyRetried && !isExcluded) {
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
