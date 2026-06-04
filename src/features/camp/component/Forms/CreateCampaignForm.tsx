import Step1CampaignBasics from './Step1CampaignBasics';
import Step3Scheduling from './Step3Scheduling';
import Step4Review from './Step4Review';
import styles from './CreateCampaignForm.module.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from '@/components/ui/Modal/Modal';
import { Skeleton, Steps, Tooltip } from 'antd';
import { useFileUpload } from '@/features/upload/useFileUpload';
import UploadFile from '@/components/upload/UploadFile';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { FormProvider } from 'react-hook-form';
import { useCreateCampaign } from '../../Hooks/useCampaign';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCampaignId: string | null;
}

function CreateCampaignForm({
  isOpen,
  onClose,
  selectedCampaignId,
}: CreateCampaignModalProps) {
  
  const {
    isCreateCampaignCompleted,
    handleCloseWithReset,
    handleNext,
    handlePrevious,
    handleSubmit,
    onChangeStep,
    onSubmit,
    campaignIdRef,
    getButtonText,
    currentStep,
    isCreating,
    methods

  } = useCreateCampaign({
    selectedCampaignId,
    onClose,
  });

  const {
    file,
    fileInputRef,
    handleFileUpload,
    handleTruncateFile,
    isUploading,
    resetState,
    isSuccess,
  } = useFileUpload({
    campaignId: campaignIdRef.current || selectedCampaignId!,
  });

  const handleClose = () => {
    handleCloseWithReset();
    resetState();
  }

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

  return (
    <Modal
      open={isOpen}
      width={900}
      onCancel={handleClose}
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
                disabled={isCreating}
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
        {isCreating ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <FormProvider {...methods}>
            {/* ID needed to submit form by button */}
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
