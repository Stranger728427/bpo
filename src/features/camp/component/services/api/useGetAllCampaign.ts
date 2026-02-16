import { getAllCampaignsService } from "../getAllCampaigns.service";
import { useQuery } from "@tanstack/react-query";
import { CampaignListFilters, CampaignListResponse } from "../../campaign.type";

export const useGetAllCampaign = (params?: CampaignListFilters) => useQuery<CampaignListResponse>({
    queryKey: ['campaigns', params],
    queryFn: () => getAllCampaignsService(params),
    
})  