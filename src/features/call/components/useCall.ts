import { useQuery } from "@tanstack/react-query"
import { callService } from "./services/call.service"
import { Call, CallResponse, TriggerCallResponse } from "./call.types"

export const useCall = (id:string, page?: number, page_size?: number, isTriggerModalOpen?: boolean) => {
    const getCallLogs = useQuery<CallResponse>({
        queryKey: ['call-logs', page, page_size],
        queryFn: async () => {
            const response = await callService.getCallLogs({page, page_size})
            return response.data
        },
        enabled: !!page && !!page_size
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
