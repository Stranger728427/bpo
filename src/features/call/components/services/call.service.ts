import { LLM_TYPE } from "@/components/constants/Constant";
import { useApi } from "@/lib/axios/interceptors";
import { AxiosRequestConfig } from "axios";


export const CallService = () => {
    const { baseApi } = useApi();

    const getCallLogs = async (config:AxiosRequestConfig) =>  await baseApi().get(`/${LLM_TYPE}/api/calls`, config)
    const getCallLogsById = async (id:string) =>  await baseApi().get(`/${LLM_TYPE}/api/calls/${id}`)
    const getTriggerCall = async () =>  await baseApi().get('/${LLM_TYPE}/api/calls/triggered')

    return {
    getCallLogs,
    getCallLogsById,
    getTriggerCall
    }
}