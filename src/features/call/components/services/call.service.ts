import { axiosInstance } from "@/lib/axios/axiosInstance";
import { urlParams } from "../call.types";


export const callService = {

    getCallLogs: async (params: urlParams) =>  await axiosInstance.get('/api/calls', {params}),
    getCallLogsById: async (id:string) =>  await axiosInstance.get(`/api/calls/${id}`),
    getTriggerCall: async () =>  await axiosInstance.get('/api/calls/triggered')
        
} 