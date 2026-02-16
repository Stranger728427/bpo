import { axiosInstance } from "@/lib/axios/axiosInstance";

export const authService = {

   login: (payload: { email: string; password: string }) => {
        return axiosInstance.post('/login', payload);
    },

    logout: () => {
        return axiosInstance.post('/logout');
    },

    register: (payload: { email: string; password: string }) => {
        return axiosInstance.post('/register', payload);
    }
}