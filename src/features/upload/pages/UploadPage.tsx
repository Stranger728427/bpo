import styles from './UploadPage.module.scss';
import { Modal } from '@/components/ui/Modal/Modal';
import UploadFile from '@/components/upload/UploadFile';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { useFileUpload } from '../useFileUpload';

export default function UploadPage({
  open,
  onClose,
  selectedCampaignId,
  
}: {
  open: boolean;
  onClose: () => void;
   selectedCampaignId: string | null;
}) {
  const {
    file,
    fileInputRef,
    handleFileUpload,
    handleTruncateFile,
    isUploading,
    isSuccess,
    resetState,
  } = useFileUpload({campaignId:selectedCampaignId! });

 const handleCloseAndReset = () => {
    resetState();
    onClose();
  };
 

  return (
    <Modal
      open={open}
      onCancel={handleCloseAndReset}
      width={700}
      centered
      title="Upload & Trigger Calls"
      footer={null}
      destroyOnHidden
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Upload Section - Only before upload success */}

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

        {/* Trigger Section - Only after upload success */}
      </div>
    </Modal>
  );
}
