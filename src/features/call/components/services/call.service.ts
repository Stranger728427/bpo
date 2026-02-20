import { axiosInstance } from "@/lib/axios/axiosInstance";
import { AxiosRequestConfig } from "axios";


export const callService = {

    getCallLogs: async (config:AxiosRequestConfig) =>  await axiosInstance.get('/api/calls', config),
    getCallLogsById: async (id:string) =>  await axiosInstance.get(`/api/calls/${id}`),
    getTriggerCall: async () =>  await axiosInstance.get('/api/calls/triggered')
        
} 