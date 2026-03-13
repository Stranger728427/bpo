import { useState, useRef } from 'react';
import { message, Button } from 'antd';
import { useMutation } from '@tanstack/react-query';
import styles from './UploadPage.module.scss';
import { Modal } from '@/components/ui/Modal/Modal';
import { useUploadContactsMutation } from '../components/api/useUploadContacts';
import UploadFile from '@/components/upload/UploadFile';
import { useTruncateFileMutation } from '../components/api/useTruncateFile';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { useTriggerCalls } from '../components/api/useTriggerCall';

export default function UploadPage({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileMutation = useUploadContactsMutation();
  const truncateFileMutation = useTruncateFileMutation();
  const triggerCallsMutation = useTriggerCalls()


  const handleFileUpload = async (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      return;
    }

    try {
      await fileMutation.mutateAsync(selectedFile);
      message.success('Contacts uploaded successfully');
      setFile(selectedFile);
    } catch {
      message.error('Upload failed');
      setFile(null);
    }
  };

  const handleTriggerCalls = async () => {
    try {
      await triggerCallsMutation.mutateAsync();
      message.success('Calls triggered successfully');
      handleCloseAndReset();
    } catch {
      message.error('Trigger calls failed');
    }
  };

  const handleTruncateFile = async () => {
    try {
      await truncateFileMutation.mutateAsync();
      message.success('File removed successfully');
      resetState();
    } catch {
      message.error('Remove file failed');
    }
  };

  const resetState = () => {
    setFile(null);
    fileMutation.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
          {!fileMutation.isSuccess && !file && (
            <>
              <h3 className={styles.cardTitle}>Upload Contacts</h3>
              <p className={styles.cardDescription}>
                Upload CSV or Excel file.
              </p>
            </>
          )}

          {fileMutation.isPending ? (
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
        {fileMutation.isSuccess && file && (
          <div className={styles.compactCard}>
            <h3 className={styles.cardTitle}>
              Start calling uploaded contacts. Calls will be triggered
              automatically based on the uploaded schedule.
            </h3>

            <Button
              danger
              type="primary"
              block
              loading={triggerCallsMutation.isPending}
              disabled={triggerCallsMutation.isPending}
              onClick={handleTriggerCalls}
            >
              Trigger Calls
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
