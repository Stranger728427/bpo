import { useQuery } from "@tanstack/react-query";
import { getCampaignByIdService } from "../getCampaignById.service";

export const useCampaignById = (id: string) => useQuery({
    queryKey: ['campaigns', id],
    queryFn: () => getCampaignByIdService(id),
})