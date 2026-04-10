import { useEffect, useRef, useState } from 'react';
import {
  CampaignFormValues,
  Campaigns,
  CampaignType,
  step1Fields,
  step2Fields,
  step3Fields,
} from '../campaign.type';
import Step1CampaignBasics from './Step1CampaignBasics';
import Step3Scheduling from './Step3Scheduling';
import Step4Review from './Step4Review';
import styles from './CreateCampaignForm.module.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useCampaignCreate } from '../api/useCreateCampaign';
import { Modal } from '@/components/ui/Modal/Modal';
import { useUpdateCampaign } from '../api/useUpdateCampaign';
import { useCampaignById } from '../api/useCampaignById';
import { Skeleton, Steps, Tooltip } from 'antd';
import { useFileUpload } from '@/features/upload/useFileUpload';
import UploadFile from '@/components/upload/UploadFile';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { FormProvider, useForm } from 'react-hook-form';
import { campaignSchema } from '../../schema/Campaign.schema';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCampaignId: string | null | undefined;
}

function CreateCampaignForm({
  isOpen,
  onClose,
  selectedCampaignId,
}: CreateCampaignModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const campaignId = useRef<string | null>(null);

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

  const {
    file,
    fileInputRef,
    handleFileUpload,
    handleTruncateFile,
    isUploading,
    resetState,
    isSuccess,
  } = useFileUpload({ campaignId: campaignId.current || selectedCampaignId! });

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

  const STEPS = [
    { title: 'Campaign Basics' },
    { title: 'Scheduling' },
    { title: 'Review & Create' },
    {
      title: (
        <Tooltip
          title={
            !isCreateCampaignCompleted &&
            !selectedCampaignId &&
            'Please submit the form first'
          }
        >
          <span>Leads Upload</span>
        </Tooltip>
      ),
      disabled: !(selectedCampaignId || isCreateCampaignCompleted),
    },
  ];

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
    resetState();
    campaignId.current = null;
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
        campaignId.current = res?.id;
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

  return (
    <Modal
      open={isOpen}
      width={900}
      onCancel={handleCloseWithReset}
      closeIcon={<CloseCircleOutlined size={24} />}
      destroyOnHidden
      className={styles.modal}
      title={
        <div className={styles.headerContent}>
          <h3 className={styles.title}>
            {selectedCampaignId ? 'Update Campaign' : 'Create New Campaign'}
          </h3>
          <p className={styles.subtitle}>
            Configure the details for your calling campaign.
          </p>
        </div>
      }
      footer={
        currentStep === 3 ? null : (
          <div className={styles.footer}>
            {/* Previous Button */}
            {currentStep > 0 && (
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handlePrevious}
              >
                Previous Page
              </button>
            )}

            <div className={styles.footerSpacer} />

            {/* Next / Save & Proceed */}
            {currentStep < 2 && (
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleNext}
              >
                Save & Proceed
              </button>
            )}
            {currentStep === 2 && (
              // Submit button for final step
              <button
                type="submit"
                form="campaignForm"
                className={styles.primaryButton}
                disabled={isCreating || isUpdating}
              >
                {getButtonText()}
              </button>
            )}
          </div>
        )
      }
    >
      {/* Stepper */}
      <Steps current={currentStep} onChange={onChangeStep} items={STEPS} />

      {/* Content */}
      <div className={styles.content}>
        {isCreating || isUpdating ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <FormProvider {...methods}>
            {/* 🔥 ID needed for footer button */}
            <form onSubmit={handleSubmit(onSubmit)} id="campaignForm">
              {currentStep === 0 && <Step1CampaignBasics />}
              {currentStep === 1 && <Step3Scheduling />}
              {currentStep === 2 && <Step4Review />}

              {/* Optional step 3 (file upload) */}
              {currentStep === 3 && (
                <div className={styles.compactCard}>
                  {!isSuccess && !file && (
                    <>
                      <h3 className={styles.cardTitle}>Upload Contacts</h3>
                      <p className={styles.cardDescription}>
                        Upload CSV or Excel file.
                      </p>
                    </>
                  )}
                  {isUploading ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Spinner />
                    </div>
                  ) : (
                    <UploadFile
                      file={file}
                      onFileChange={handleFileUpload}
                      onRemoveFile={handleTruncateFile}
                      fileInputRef={fileInputRef}
                      uploadText="Upload file"
                      buttonText="Browse"
                      hintText="CSV: name, phone, appointment"
                      accept=".csv,.xls,.xlsx"
                    />
                  )}
                </div>
              )}
            </form>
          </FormProvider>
        )}
      </div>
    </Modal>
  );
}

export default CreateCampaignForm;
