import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { AxiosError } from 'axios';
import { CreateCampaignRequest } from '../campaign.type';
import { CampaignService } from '../campaign.service';

const campaignService = CampaignService();

export const useCampaignCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['campaign_create'],
   mutationFn: (campaign: CreateCampaignRequest) => {
  const { campaignId, ...rest } = campaign;
  return campaignId
    ? campaignService.updateCampaignService({ ...rest, campaignId })
    : campaignService.createCampaign(campaign);
},
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      message.success(
        variables.campaignId
          ? 'Campaign updated successfully'
          : 'Campaign created successfully'
      );
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      console.error('Failed to save campaign', error);
      message.error(error.response?.data?.detail ?? 'Failed to save campaign');
    },
  });
};
