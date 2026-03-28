import { useQuery } from "@tanstack/react-query";
import { CampaignListFilters, CampaignListResponse } from "../campaign.type";
import { CampaignService } from "../campaign.service";

export const useGetAllCampaign = (params?: CampaignListFilters) => useQuery<CampaignListResponse>({
    queryKey: ['campaigns', params],
    queryFn: () => CampaignService().getAllCampaignsService(params),
    refetchOnWindowFocus:true,
    enabled: !!params?.page && !!params?.page_size
    
})