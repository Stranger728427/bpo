import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateCampaignService } from "../updateCampaign.service";
import { Campaigns } from "../../campaign.type";
import { message } from "antd";
import { AxiosError } from "axios";

interface UpdateCampaignParams {
    id: string;
    campaign: Campaigns;
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  const updateCampaign = ({ id, campaign }: UpdateCampaignParams) =>
    updateCampaignService(id, campaign);

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
