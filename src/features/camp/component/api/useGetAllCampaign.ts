import { useQuery } from "@tanstack/react-query";
import { CampaignListFilters, CampaignListResponse } from "../campaign.type";
import { campaignService } from "../campaign.service";

export const useGetAllCampaign = (params?: CampaignListFilters) => useQuery<CampaignListResponse>({
    queryKey: ['campaigns', params],
    queryFn: () => campaignService.getAllCampaignsService(params),
    
})