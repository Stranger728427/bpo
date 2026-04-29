import { useEffect, useRef, useState } from 'react';
import {
  CampaignFormValues,
  Campaigns,
  CampaignType,
  step1Fields,
  step2Fields,
  step3Fields,
} from '../component/campaign.type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { campaignSchema } from '../schema/Campaign.schema';
import { useCampaignCreate } from '../component/api/useCreateCampaign';
import { useUpdateCampaign } from '../component/api/useUpdateCampaign';
import { useCampaignById } from '../component/api/useCampaignById';

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

  const initialValues: CampaignFormValues = {
    campaignId: '',
    name: '',
    type: '' as CampaignType,
    start_date: '',
    end_date: '',
    calling_days: [],
    start_time: '',
    end_time: '',
    time_zone: '',
  };

  // React Hook Form setup
  const methods = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit, reset } = methods;

  const {
    mutateAsync: CreateCampaign,
    isPending: isCreating,
    isSuccess: isCreateCampaignCompleted,
  } = useCampaignCreate();

  const { mutateAsync: updateCampaign, isPending: isUpdating } =
    useUpdateCampaign();

  const { data } = useCampaignById(selectedCampaignId!);

  const campaign = data?.campaign;

  // Populate formData for edit mode only
  useEffect(() => {
    if (!campaign || !selectedCampaignId) return;

    reset({
      campaignId: campaign?.id,
      name: campaign?.name ?? '',
      type: campaign?.type ?? '',
      start_date: campaign?.start_date ?? '',
      end_date: campaign?.end_date ?? '',
      calling_days: campaign?.calling_days ?? [],
      start_time: campaign?.start_time ?? '',
      end_time: campaign?.end_time ?? '',
      time_zone: campaign?.time_zone ?? '',
    });
  }, [campaign, selectedCampaignId, reset]);

  const handleNext = async () => {
    let fieldsToValidate = [] as any;

    if (currentStep === 0) fieldsToValidate = step1Fields;
    if (currentStep === 1) fieldsToValidate = step2Fields;
    if (currentStep === 2) fieldsToValidate = step3Fields;

    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
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
    reset(initialValues);
    campaignIdRef.current = null;
  };

  const onSubmit = async (values: CampaignFormValues) => {
    if (currentStep < 2) return;

    try {
      if (selectedCampaignId) {
        await updateCampaign({
          id: selectedCampaignId,
          campaign: {
            ...values,
            campaignId: selectedCampaignId,
          } as Campaigns,
        });
      } else {
        const res = await CreateCampaign({
          ...values,
        });
        campaignIdRef.current = res?.id;
      }
      setCurrentStep(3);
    } catch (error) {
      console.error('Campaign submit error:', error);
    }
  };

  const getButtonText = () => {
    if (isCreating || isUpdating) {
      return selectedCampaignId ? 'Updating...' : 'Creating...';
    }
    return selectedCampaignId ? 'Update Campaign' : 'Create Campaign';
  };

  return {
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
    isUpdating,
    methods

  };
};
