import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError } from "axios";
import { Campaigns } from "../campaign.type";
import { CampaignService } from "../campaign.service";

interface UpdateCampaignParams {
    id: string;
    campaign: Campaigns;
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();
  const campaignService = CampaignService();

  const updateCampaign = ({ id, campaign }: UpdateCampaignParams) =>
    campaignService.updateCampaignService(id, campaign);

  return useMutation({
    mutationFn: updateCampaign,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },

    onError: (error: AxiosError<any>) => {
      message.error(error?.response?.data?.message || 'Failed to update campaign');
    },
  });
}
