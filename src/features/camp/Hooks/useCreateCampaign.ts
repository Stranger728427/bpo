import { useEffect, useRef, useState } from 'react';
import { useForm, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CampaignFormValues,
  CampaignType,
  CreateCampaignRequest,
  step1Fields,
  step2Fields,
  step3Fields,
} from '../component/campaign.type';
import { campaignSchema } from '../schema/Campaign.schema';
import { useCampaignCreate } from '../component/api/useCreateCampaign';
import { useCampaignById } from '../component/api/useCampaignById';

 const INITIAL_VALUES: CampaignFormValues = {
    campaignId: '',
    name: '',
    type: '' as CampaignType
    ,
    start_date: '',
    end_date: '',
    calling_days: [],
    start_time: '',
    end_time: '',
    time_zone: '',
  };

const STEP_FIELDS: Record<number, Path<CampaignFormValues>[]> = {
  0: step1Fields as Path<CampaignFormValues>[],
  1: step2Fields as Path<CampaignFormValues>[],
  2: step3Fields as Path<CampaignFormValues>[],
};

type CampaignPropsType = {
  selectedCampaignId: string | null;
  onClose: () => void;
};

export const useCreateCampaign = ({
  selectedCampaignId,
  onClose,
}: CampaignPropsType) => {

  const [currentStep, setCurrentStep] = useState(0);
  const campaignIdRef = useRef<string | null>(null);

  const methods = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: INITIAL_VALUES,
  });

  const { handleSubmit, reset, trigger } = methods;

  const {
    mutateAsync: createCampaign,
    isPending: isCreating,
    isSuccess: isCreateCampaignCompleted,
  } = useCampaignCreate();

  const { data } = useCampaignById(selectedCampaignId!);
  const campaign = data?.campaign;

  // Populate form in edit mode — only when campaign data is actually loaded
  useEffect(() => {
    if (!selectedCampaignId || !campaign) return;

    reset({
      campaignId: campaign.id,
      name: campaign.name ?? '',
      type: campaign.type ?? undefined,
      start_date: campaign.start_date ?? '',
      end_date: campaign.end_date ?? '',
      calling_days: campaign.calling_days ?? [],
      start_time: campaign.start_time ?? '',
      end_time: campaign.end_time ?? '',
      time_zone: campaign.time_zone ?? undefined,
    });
  }, [selectedCampaignId, campaign, reset]);

  const handleNext = async () => {
    const fields = STEP_FIELDS[currentStep];
    if (!fields) return;

    const isValid = await trigger(fields);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onChangeStep = (value: number) => {
    setCurrentStep(value);
  };

  //   const onFileChange = (file: File | null) => {
  //     if(!file) return;
  //   handleFileUpload(file);

  //   // setTimeout(() => {
  //     handleCloseWithReset();
  //   // }, 500); // slight delay ensures trigger
  // };

  const handleCloseWithReset = () => {
    onClose();
    setCurrentStep(0);
    reset(INITIAL_VALUES);
    campaignIdRef.current = null;
  };

const onSubmit = async (values: CampaignFormValues) => {
  if (currentStep < 2) return;

  try {
    const payload: CreateCampaignRequest = {
       ...values,
        ...(selectedCampaignId && { campaignId: selectedCampaignId }),
    };

    const res = await createCampaign(payload);

    if (!selectedCampaignId && res?.id) {
      campaignIdRef.current = res.id;
    }
    setCurrentStep(3);
  } catch (error) {
    console.error('Campaign submit error:', error);
  }
};

  const getButtonText = () => {
    if (isCreating) return selectedCampaignId ? 'Updating...' : 'Creating...';
    return selectedCampaignId ? 'Update Campaign' : 'Create Campaign';
  };

  return {
    methods,
    handleSubmit,
    handleNext,
    handlePrevious,
    onChangeStep,
    handleCloseWithReset,
    onSubmit,
    getButtonText,
    isCreateCampaignCompleted,
    campaignIdRef,
    currentStep,
    isCreating,
  };
};