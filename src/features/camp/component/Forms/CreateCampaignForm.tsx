import { useState } from 'react';
import { CreateCampaignRequest } from '../campaign.type';
import Step1CampaignBasics from './Step1CampaignBasics';
import Step2LeadsResources from './Step2LeadsResources';
import Step3Scheduling from './Step3Scheduling';
import Step4Review from './Step4Review';
import styles from './CreateCampaignForm.module.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useCampaignCreate } from '../api/useCreateCampaign';
import { Modal } from '@/components/ui/Modal/Modal';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: 1, label: 'Campaign Basics' },
  { id: 2, label: 'Leads & Resources' },
  { id: 3, label: 'Scheduling' },
  { id: 4, label: 'Review & Create' },
];

function CreateCampaignForm({ isOpen, onClose }: CreateCampaignModalProps) {
  const initialState: CreateCampaignRequest = {
    name: null,
    status: null,
    type: null,

    start_date: null,
    end_date: null,

    contacts_count: 0,

    ai_assistant_id: null,
    ai_assistant_name: null,

    leads_list_id: null,

    phone_number: null,

    calling_days: [],
    start_time: null,
    end_time: null,

    retry_attempts: null,
    retry_interval: null,

    time_zone: null,
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreateCampaignRequest>(initialState);

  const { mutateAsync: CreateCampaign } = useCampaignCreate();

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const payload: CreateCampaignRequest = {
    name: formData.name,
    status: formData.status,
    type: formData.type,

    start_date: formData.start_date || null,
    end_date: formData.end_date || null,

    contacts_count: formData.contacts_count,

    ai_assistant_id: formData.ai_assistant_id || null,
    ai_assistant_name: formData.ai_assistant_name || null,
    leads_list_id: formData.leads_list_id || null,

    phone_number: formData.phone_number,

    calling_days: formData.calling_days,

    start_time: formData.start_time || null,
    end_time: formData.end_time || null,

    retry_attempts: Number(formData.retry_attempts),
    retry_interval: Number(formData.retry_interval),

    time_zone: formData.time_zone || null,
  };

  const handleCloseWithReset = () => {
    onClose();
    setCurrentStep(1);
    setFormData(initialState);
  };

  const handleSubmit = async () => {
    try {
      console.log('Creating campaign:', payload);
      await CreateCampaign(payload);
      handleCloseWithReset();
    } catch (error) {
      console.error('Error creating campaign:', error);
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
      open={isOpen}
      width={900}
      onCancel={handleCloseWithReset}
      closeIcon={<CloseCircleOutlined size={24} />}
      footer={
        <div className={styles.footer}>
          {currentStep > 1 && (
            <button className={styles.secondaryButton} onClick={handlePrevious}>
              Previous Page
            </button>
          )}
          <div className={styles.footerSpacer} />
          {currentStep < 4 ? (
            <button className={styles.primaryButton} onClick={handleNext}>
              Save & Proceed
            </button>
          ) : (
            <button className={styles.primaryButton} onClick={handleSubmit}>
              Create Campaign
            </button>
          )}
        </div>
      }
      className={styles.modal}
      title={
        <div className={styles.headerContent}>
          <h3 className={styles.title}>Create New Campaign</h3>
          <p className={styles.subtitle}>
            Configure the details for your calling campaign.
          </p>
        </div>
      }
    >
      {/* Step Indicator */}
      <div className={styles.stepIndicator}>
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
      </div>

      {/* Content */}
      <div className={styles.content}>
        {currentStep === 1 && (
          <Step1CampaignBasics
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 2 && (
          <Step2LeadsResources
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 3 && (
          <Step3Scheduling
            formData={formData}
            updateFormData={updateFormData}
            toggleDay={toggleDay}
          />
        )}
        {currentStep === 4 && <Step4Review formData={formData} />}
      </div>
    </Modal>
  );
}

export default CreateCampaignForm;
