import { useMutation } from "@tanstack/react-query";
import { createCampaignService } from "../createCampaign.service";
import { CreateCampaignRequest } from "../../campaign.type";

export const useCampaignCreate = () => useMutation({
    mutationKey: ['campaigns'],
    mutationFn: (campaign: CreateCampaignRequest) => createCampaignService(campaign),
    onSuccess: () => {
        console.log("Campaign created successfully");
    },
    onError: (error) => {
        console.log("Failed to create campaign", error);
    }
})
    
