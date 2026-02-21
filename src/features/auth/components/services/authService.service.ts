import { axiosInstance } from "@/lib/axios/axiosInstance";

export type validateTenantRequest = {
	tenantName: string;
};

export type AuthCodeRequest = {
	tenantName: string;
	authCode: string;
};
export const authService =  {

	 validateTennant: async (payload: validateTenantRequest) => {
		const result = await axiosInstance.post('/authcentral/login', payload);
		return result;
	},

	 validateAuthCode: async (payload: AuthCodeRequest) => {
		const result = await axiosInstance.post('/authcentral/token', payload);
		return result;
	},

	 getUserDetails: async () => {
		const result = await axiosInstance.get('/api/v1/users');
		return result?.data;
	},


    refreshToken: async () => {
        const result = await axiosInstance.put('/authcentral/token');
        return result?.data;
    },

	logout: async () => {
		const result = await axiosInstance.delete('/authcentral/token');
		return result?.data
	}
}