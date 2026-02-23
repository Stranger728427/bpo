import { useMutation } from "@tanstack/react-query";
import { CreateCampaignRequest } from "../campaign.type";
import { campaignService } from "../campaign.service";


export const useCampaignCreate = () => useMutation({
    mutationKey: ['campaigns'],
    mutationFn: (campaign: CreateCampaignRequest) => campaignService.createCampaign(campaign),
    onSuccess: () => {
        console.log("Campaign created successfully");
    },
    onError: (error) => {
        console.log("Failed to create campaign", error);
    }
})
    
