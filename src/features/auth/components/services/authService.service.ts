import { useApi } from "@/lib/axios/interceptors";

export type validateTenantRequest = {
	tenantName: string;
};

export type AuthCodeRequest = {
	tenantName: string;
	authCode: string;
};
export const AuthService = () =>  {

  const { baseApi } = useApi();

	 const validateTennant = async (payload: validateTenantRequest) => {
		const result = await baseApi().post('/authcentral/login', payload);
		return result;
	}

	 const validateAuthCode = async (payload: AuthCodeRequest) => {
		const result = await baseApi().post('/authcentral/token', payload);
		return result;
	}
	
	 const getUserDetails = async () => {
		const result = await baseApi().get('/api/v1/users');
		return result?.data;
	}

    const refreshToken = async () => {
        const result = await baseApi().put('/authcentral/token');
        return result;
    }

	const logout = async () => {
		const result = await baseApi().delete('/authcentral/token',{
			withCredentials: true
		});
		return result?.data
	}
	return {
		validateTennant,
		validateAuthCode,
		getUserDetails,
		refreshToken,
		logout
	}
}