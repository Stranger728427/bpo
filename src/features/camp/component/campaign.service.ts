import { useApi } from '@/lib/axios/interceptors';
import {
  CampaignListFilters,
  CreateCampaignRequest,
} from './campaign.type';
import { LLM_TYPE } from '@/components/constants/Constant';

export const CampaignService = () => {
  const { baseApi } = useApi();

  const createCampaign= async(campaign: Omit<CreateCampaignRequest,'campaignId'>) => {
    const response = await baseApi().post(`/campaigns`, campaign,{params:{model:LLM_TYPE}});
    return response.data;
  }

  const getAllCampaignsService= async (params?: CampaignListFilters) => {
    const response = await baseApi().get(`/campaigns`, { params });
    return response.data;
  }

  const getCampaignByIdService=  async (id: string) => {
    const response = await baseApi().get(`/campaigns/${id}`);
    return response.data;
  }

const updateCampaignService = async (payload: CreateCampaignRequest) => {
  const response = await baseApi().put(`/campaigns/update`, payload, {
    params: { model: LLM_TYPE },
  });
  return response.data;
};
  return{
    createCampaign,
    getAllCampaignsService,
    getCampaignByIdService,
    updateCampaignService
  }
};
