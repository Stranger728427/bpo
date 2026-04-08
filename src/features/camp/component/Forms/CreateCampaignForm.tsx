import { useEffect, useRef, useState } from 'react';
import { Campaigns, CreateCampaignRequest } from '../campaign.type';
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
import { useNavigate } from 'react-router-dom';

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
  const initialState: CreateCampaignRequest = {
    csvId: null,
    name: null,
    type: null,
    start_date: null,
    end_date: null,
    calling_days: [],
    start_time: null,
    end_time: null,
    time_zone: null,
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CreateCampaignRequest>(initialState);
  const campaignId = useRef<string>('');
  const navigate = useNavigate();

  const {
    mutateAsync: CreateCampaign,
    isPending: isCreating,
    isSuccess: isCreateCampaignCompleted,
  } = useCampaignCreate();
  const { mutateAsync: updateCampaign, isPending: isUpdating } =
    useUpdateCampaign();
  const { data } = useCampaignById(selectedCampaignId!);
  const campaign = data?.campaign;

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const onChangeStep = (value: number) => {
    setCurrentStep(value);
  };

  const {
    file,
    fileInputRef,
    handleFileUpload,
    handleTruncateFile,
    isUploading,
    resetState,
    isSuccess,
  } = useFileUpload({ campaignId: campaignId.current || selectedCampaignId! });

  console.log(campaignId)

  const STEPS = [
    { title: 'Campaign Basics' },
    { title: 'Scheduling' },
    { title: 'Review & Create' },
    {
      title: (
          <Tooltip
            title={(!isCreateCampaignCompleted && !selectedCampaignId) && 'Please submit the form first'}
          >
            <span>Leads Upload</span>
          </Tooltip>
      ),
      disabled: !(selectedCampaignId || isCreateCampaignCompleted),
    },
  ];

  // Reset form when opening in create mode
  useEffect(() => {
    if (isOpen && !selectedCampaignId) {
      setCurrentStep(0);
      setFormData(initialState);
    }
  }, [isOpen, selectedCampaignId]);

  // Populate formData for edit mode only
  useEffect(() => {
    if (!campaign || !selectedCampaignId) return;
    setFormData({
      csvId: campaign?.id,
      name: campaign?.name ?? null,
      type: campaign?.type ?? null,
      start_date: campaign?.start_date ?? null,
      end_date: campaign?.end_date ?? null,
      calling_days: campaign?.calling_days ?? [],
      start_time: campaign?.start_time ?? null,
      end_time: campaign?.end_time ?? null,
      time_zone: campaign?.time_zone ?? null,
    });
  }, [campaign, selectedCampaignId]);

//   const onFileChange = (file: File | null) => {
//     if(!file) return;
//   handleFileUpload(file);
  
//   // setTimeout(() => {
//     handleCloseWithReset();
//   // }, 500); // slight delay ensures trigger
// };

  const payload: CreateCampaignRequest = {
    csvId: formData.csvId || crypto.randomUUID(),
    name: formData.name,
    type: formData.type,

    start_date: formData.start_date || null,
    end_date: formData.end_date || null,

    calling_days: formData.calling_days,

    start_time: formData.start_time || null,
    end_time: formData.end_time || null,

    time_zone: formData.time_zone || null,
  };

  const handleCloseWithReset = () => {
    onClose();
    setCurrentStep(0);
    setFormData(initialState);
    resetState();
  };

  const handleSubmit = async () => {
    try {
      if (selectedCampaignId) {
        await updateCampaign({
          id: selectedCampaignId,
          campaign: payload as Campaigns,
        });
      } else {
         const res = await CreateCampaign(payload);
         campaignId.current=res?.id;
      }
      setCurrentStep(3);
    } catch (error) {
      console.error('Campaign submit error:', error);
    }
  };

  const updateFormData = (updates: Partial<CreateCampaignRequest>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      calling_days: prev?.calling_days?.includes(day)
        ? prev?.calling_days?.filter((d) => d !== day)
        : [...(prev?.calling_days || []), day],
    }));
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
      footer={
  currentStep === 3 ? null : (
    <div className={styles.footer}>
      {currentStep > 0 && (
        <button className={styles.secondaryButton} onClick={handlePrevious}>
          Previous Page
        </button>
      )}
      <div className={styles.footerSpacer} />
      {currentStep < 2 ? (
        <button className={styles.primaryButton} onClick={handleNext}>
          Save & Proceed
        </button>
      ) : (
        <button
          className={styles.primaryButton}
          onClick={handleSubmit}
          disabled={isCreating || isUpdating}
        >
          {getButtonText()}
        </button>
      )}
    </div>
  )
}
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
    >
      <Steps current={currentStep} onChange={onChangeStep} items={STEPS} />

      {/* Content */}
      <div className={styles.content}>
        {isCreating || isUpdating ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <>
            {currentStep === 0 && (
              <Step1CampaignBasics
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {/* {currentStep === 2 && (
          <Step2LeadsResources
            formData={formData}
            updateFormData={updateFormData}
          />
        )} */}
            {currentStep === 1 && (
              <Step3Scheduling
                formData={formData}
                updateFormData={updateFormData}
                toggleDay={toggleDay}
              />
            )}
            {currentStep === 2 && <Step4Review formData={formData} />}

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
          </>
        )}
      </div>
    </Modal>
  );
}

export default CreateCampaignForm;
