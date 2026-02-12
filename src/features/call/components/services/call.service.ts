import { axiosInstance } from "@/lib/axios/axiosInstance";

export const callService = {

    getCallLogs: async (params: {page?: number, page_size?: number}) =>  await axiosInstance.get('/api/calls', {params}),
    getCallLogsById: async (id:string) =>  await axiosInstance.get(`/api/calls/${id}`),
    getTriggerCall: async () =>  await axiosInstance.get('/api/calls/triggered')
        
} 