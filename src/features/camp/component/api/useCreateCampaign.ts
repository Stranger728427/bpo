import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCampaignRequest } from "../campaign.type";
import { CampaignService } from "../campaign.service";
import { message } from "antd";

export const useCampaignCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['campaign_create'],
    mutationFn: (campaign: CreateCampaignRequest) => CampaignService().createCampaign(campaign),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['campaigns'] });
        message.success("Campaign created successfully");
    },
    onError: (error) => {
        console.error("Failed to create campaign", error);
        message.error("Failed to create campaign");
    }
  });
};
