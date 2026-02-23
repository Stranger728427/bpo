import { useQuery } from "@tanstack/react-query";
import { campaignService } from "../campaign.service";

export const useCampaignById = (id: string) => useQuery({
    queryKey: ['campaigns', id],
    queryFn: () => campaignService.getCampaignByIdService(id),
    enabled: !!id,
})