import { useApi } from '@/lib/axios/interceptors';
import {
  CampaignListFilters,
  Campaigns,
  CreateCampaignRequest,
} from './campaign.type';
import { LLM_TYPE } from '@/components/constants/Constant';

export const CampaignService = () => {
  const { baseApi } = useApi();

  const createCampaign= async(campaign: CreateCampaignRequest) => {
    const response = await baseApi().post(`/${LLM_TYPE}/campaign`, campaign);
    return response.data;
  }

  const getAllCampaignsService= async (params?: CampaignListFilters) => {
    const response = await baseApi().get(`/${LLM_TYPE}/campaign`, { params });
    return response.data;
  }

  const getCampaignByIdService=  async (id: string) => {
    const response = await baseApi().get(`/${LLM_TYPE}/campaign/${id}`);
    return response.data;
  }

  const updateCampaignService= async (payload: Campaigns) => {
    const response = await baseApi().post(`/${LLM_TYPE}/campaign/update`, payload);
    return response.data;
  }
  return{
    createCampaign,
    getAllCampaignsService,
    getCampaignByIdService,
    updateCampaignService
  }
};
