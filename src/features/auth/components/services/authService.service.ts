import { axiosInstance } from "@/lib/axios/axiosInstance";
import { ValidateTenantResponse } from "@/features/multi-tenancy/tenant.types";

export const authService = {
    validateTenant: async (tenantName: string) => {
        return await axiosInstance.post<ValidateTenantResponse>(`/authcentral/login`, { tenantName });
    },

    validateAuthCode: async (payload: { tenantName: string; authCode: string }) => {
        return await axiosInstance.post(`/authcentral/token`, payload);
    },

    refreshToken: async () => {
        return await axiosInstance.put(`/authcentral/token`, { tokenType: 'Refresh' });
    },

    logout: async () => {
        return await axiosInstance.delete(`/authcentral/token`);
    },

    getUserDetails: async () => {
        return await axiosInstance.get(`/api/v1/users`);
    }
};