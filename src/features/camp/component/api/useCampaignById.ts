import { useQuery } from "@tanstack/react-query";
import { CampaignService } from "../campaign.service";

export const useCampaignById = (id: string) => useQuery({
    queryKey: ['campaigns', id],
    queryFn: () => CampaignService().getCampaignByIdService(id),
    enabled: !!id,
})