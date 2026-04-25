import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCampaignRequest } from "../campaign.type";
import { CampaignService } from "../campaign.service";
import { message } from "antd";
import { AxiosError } from "axios";

export const useCampaignCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['campaign_create'],
    mutationFn: (campaign: CreateCampaignRequest) => CampaignService().createCampaign(campaign),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['campaigns'] });
        message.success("Campaign created successfully");
    },
    onError: (error:AxiosError<any>) => {
        console.error("Failed to create campaign", error);
       
        const message = error.response?.data?.detail;
        message.error(message || "Failed to create campaign");
   
    }
    
  });
};
