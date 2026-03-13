import { useEffect, useState } from 'react';
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
import { Steps } from 'antd';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCampaignId: string | null | undefined;
}

const STEPS = [
  { title: 'Campaign Basics' },
  { title: 'Scheduling' },
  { title: 'Review & Create' },
];


function CreateCampaignForm({
  isOpen,
  onClose,
  selectedCampaignId,
}: CreateCampaignModalProps) {
  const initialState: CreateCampaignRequest = {
    campaignId: null,
    name: null,
    // status: 'active',
    type: null,

    start_date: null,
    end_date: null,

    // contacts_count: 0,

    // ai_assistant_id: null,
    // ai_assistant_name: null,

    // leads_list_id: null,

    // phone_number: null,

    calling_days: [],
    start_time: null,
    end_time: null,

    // retry_attempts: null,
    // retry_interval: null,

    time_zone: null,
    csvId: null,
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CreateCampaignRequest>(initialState);

  const { mutateAsync: CreateCampaign } = useCampaignCreate();
  const { mutateAsync: updateCampaign, isPending: isUpdating } =
    useUpdateCampaign();
  const { data } = useCampaignById(selectedCampaignId!);
  const campaign = data?.campaign;

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const onChangeStep = (value: number) => {
    setCurrentStep(value);
  };

  useEffect(() => {
    if (!campaign) return;
    setFormData({
      campaignId: campaign?.id,
      name: campaign.name ?? null,
      // status: campaign.status ?? 'active',
      type: campaign.type ?? null,

      start_date: campaign.start_date ?? null,
      end_date: campaign.end_date ?? null,

      // contacts_count: campaign.contacts_count ?? 0,

      // ai_assistant_id: campaign.ai_assistant_id ?? null,
      // ai_assistant_name: campaign.ai_assistant_name ?? null,
      // leads_list_id: campaign.leads_list_id ?? null,

      // phone_number: campaign.phone_number ?? null,

      calling_days: campaign.calling_days ?? [],

      start_time: campaign.start_time ?? null,
      end_time: campaign.end_time ?? null,

      // retry_attempts: campaign.retry_attempts ?? null,
      // retry_interval: campaign.retry_interval ?? null,

      time_zone: campaign.time_zone ?? null,
      csvId:campaign?.id
    });
  }, [campaign]);

  const payload: CreateCampaignRequest = {
    campaignId: crypto.randomUUID(),
    name: formData.name,
    // status: 'active',
    type: formData.type,

    start_date: formData.start_date || null,
    end_date: formData.end_date || null,

    // contacts_count: formData.contacts_count,

    // ai_assistant_id: formData.ai_assistant_id || null,
    // ai_assistant_name: formData.ai_assistant_name || null,
    // leads_list_id: formData.leads_list_id || null,

    // phone_number: formData.phone_number,

    calling_days: formData.calling_days,

    start_time: formData.start_time || null,
    end_time: formData.end_time || null,

    // retry_attempts: Number(formData.retry_attempts),
    // retry_interval: Number(formData.retry_interval),

    time_zone: formData.time_zone || null,
    csvId:crypto.randomUUID()
  };

  const handleCloseWithReset = () => {
    onClose();
    setCurrentStep(1);
    setFormData(initialState);
  };

  const handleSubmit = async () => {
    try {
      if (selectedCampaignId) {
        await updateCampaign({
          id: selectedCampaignId,
          campaign: payload as Campaigns,
        });
      } else {
        await CreateCampaign(payload);
      }

      handleCloseWithReset();
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

  return (
    <Modal
      open={isOpen ? isOpen : Boolean(selectedCampaignId)}
      loading={isUpdating}
      width={900}
      onCancel={handleCloseWithReset}
      closeIcon={<CloseCircleOutlined size={24} />}
      footer={
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
            <button className={styles.primaryButton} onClick={handleSubmit}>
              {selectedCampaignId ? 'Update Campaign' : 'Create Campaign'}
            </button>
          )}
        </div>
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
      {/* Step Indicator */}
      {/* <div className={styles.stepIndicator}>
        <div className={styles.stepLabels}>
          {STEPS.map((step) => (
            <span
              key={step.id}
              className={`${styles.stepLabel} ${currentStep >= step.id ? styles.active : ''}`}
            >
              {step.label}
            </span>
          ))}
        </div>
        <div className={styles.stepProgress}>
          <div className={styles.progressLine}>
            <div
              className={styles.progressFill}
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
          </div>
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`${styles.stepDot} ${currentStep >= step.id ? styles.active : ''} ${currentStep === step.id ? styles.current : ''}`}
            />
          ))}
        </div>
      </div> */}

       <Steps
        current={currentStep}
        onChange={onChangeStep}
        items={STEPS}
      />
    
      {/* Content */}
      <div className={styles.content}>
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
      </div>
    </Modal>
  );
}

export default CreateCampaignForm;
