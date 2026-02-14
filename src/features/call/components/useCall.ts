import { useQuery } from "@tanstack/react-query"
import { callService } from "./services/call.service"
import { Call, CallResponse, TriggerCallResponse, urlParams } from "./call.types"


export const useCall = (id:string, params: urlParams, isTriggerModalOpen?: boolean ) => {
    const getCallLogs = useQuery<CallResponse>({
        queryKey: ['call-logs', params],
        queryFn: async () => {
            const response = await callService.getCallLogs(params)
            return response.data
        },
        enabled: !!params.page && !!params.page_size
    })

    const getCallLogsById = useQuery<Call>({
        queryKey: ['call-logs', id],
        queryFn: async () => {
            const response = await callService.getCallLogsById(id)
            return response.data.data
        },
        enabled: !!id
    })

    const getTriggerCall = useQuery<TriggerCallResponse>({
        queryKey: ['trigger-call',isTriggerModalOpen],
        queryFn: async () => {
            const response = await callService.getTriggerCall()
            return response
        },
        enabled: !!isTriggerModalOpen,
    })

    return { getCallLogs, getCallLogsById, getTriggerCall }
    
}
