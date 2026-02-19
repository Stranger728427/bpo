import axios from 'axios';
import useAuth from '@/app/store/Hooks/userAuth';
import { env } from '@/app/config/env';
import { siteConfig } from '@/components/constants/Constant';


export const useApi = () => {
	const { signOut } = useAuth(); 
  const {tenantName} = siteConfig
	const baseApi = (headers?: Record<any, any>) => {

		const instance = axios.create({
			baseURL: env.AUTH_BASE_URL,
			timeout: 120000,
			withCredentials: true,
			headers: {
				...headers,
			},
		});

		const refreshTokenFlow = async () => {
			await axios.put(
				`${env.AUTH_BASE_URL}/authcentral/token`,
				{
					tenantName,
				},
				{
					withCredentials: true,
				}
			);
		};

		instance.interceptors.response.use(
			function (response) {
				return response;
			},
			async (error) => {
				const originalRequest = error.config;

				// Only attempt to refresh if we get a 401 and haven't tried refreshing yet
				// also only attempt if the refresh flow is not ongoing to regenerate the tokens again and again.
				// const sessionData = sessionStorage.getItem('isRefreshFlowOngoing');
				// const isRefreshFlowOngoing = sessionData ? JSON.parse(sessionData) : false;
				if (
					error?.response?.status === 401 &&
					!originalRequest._retry
					//&&  !isRefreshFlowOngoing
				) {
					originalRequest._retry = true;
					try {
						// sessionStorage.setItem('isRefreshFlowOngoing', JSON.stringify('true'));
						// Attempt to refresh the token
						await refreshTokenFlow();
						// If refresh successful, retry the original request
						return instance(originalRequest);
					} catch (refreshError) {
						// If refresh fails, attempt to logout
						await signOut();
						return Promise.reject(refreshError);
					} finally {
						// sessionStorage.removeItem('isRefreshFlowOngoing');
					}
				}
				return Promise.reject(error);
			}
		);

		return instance;
	};

	return { baseApi };
};
