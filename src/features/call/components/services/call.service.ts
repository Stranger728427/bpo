import { useApi } from "@/lib/axios/interceptors";
import { AxiosRequestConfig } from "axios";


export const CallService = () => {
    const { baseApi } = useApi();

    const getCallLogs = async (config:AxiosRequestConfig) =>  await baseApi().get('/api/calls', config)
    const getCallLogsById = async (id:string) =>  await baseApi().get(`/api/calls/${id}`)
    const getTriggerCall = async () =>  await baseApi().get('/api/calls/triggered')

    return {
    getCallLogs,
    getCallLogsById,
    getTriggerCall
    }
}