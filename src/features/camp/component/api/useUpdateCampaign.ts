import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError } from "axios";
import { Campaigns } from "../campaign.type";
import { CampaignService } from "../campaign.service";

interface UpdateCampaignParams {
    id: string | null;
    campaign: Campaigns;
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();
  const campaignService = CampaignService();

  const updateCampaign = ({ campaign }: UpdateCampaignParams) =>
    campaignService.updateCampaignService(campaign);

  return useMutation({
    mutationFn: updateCampaign,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      message.success('Campaign updated successfully');
    },

    onError: (error: AxiosError<any>) => {
      message.error(error?.response?.data?.message || 'Failed to update campaign');
    },
  });
}
