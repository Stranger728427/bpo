import { useState, useRef } from 'react';
import { message, Button } from 'antd';
import { useMutation } from '@tanstack/react-query';
import styles from './UploadPage.module.scss';
import { Modal } from '@/components/ui/Modal/Modal';
import { useUploadContactsMutation } from '../components/api/useUploadContacts';
import { triggerCalls } from '../components/services/triggerCall.service';
import UploadFile from '@/components/upload/UploadFile';

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

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await fileMutation.mutateAsync(file);
      message.success('Contacts uploaded successfully');
      setFile(null);
    } catch {
      message.error('Upload failed');
    }
  };

  const triggerCallsMutation = useMutation({
    mutationFn: triggerCalls,
  });

  const handleTriggerCalls = async () => {
    try {
      await triggerCallsMutation.mutateAsync();
      message.success('Calls triggered successfully');
      onClose();
    } catch {
      message.error('Trigger calls failed');
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={700}
      centered
      title="Upload & Trigger Calls"
      footer={null}
      destroyOnClose
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Upload Section */}
        <div className={styles.compactCard}>
          <h3 className={styles.cardTitle}>Upload Contacts</h3>
          <p className={styles.cardDescription}>Upload CSV or Excel file.</p>

          <UploadFile
            file={file}
            onFileChange={handleFileSelect}
            fileInputRef={fileInputRef}
            uploadText="Upload file"
            buttonText="Browse"
            hintText="CSV: name, phone, appointment"
            accept=".csv,.xls,.xlsx"
          />

          <Button
            type="primary"
            block
            disabled={!file}
            loading={fileMutation.isPending}
            onClick={handleUpload}
            style={{ marginTop: 12 }}
          >
            Upload
          </Button>
        </div>

        {/* Trigger Section */}
        <div className={styles.compactCard}>
          <h3 className={styles.cardTitle}>Trigger Calls</h3>

          <Button
            danger
            type="primary"
            block
            loading={triggerCallsMutation.isPending}
            onClick={handleTriggerCalls}
          >
            Trigger
          </Button>
        </div>
      </div>
    </Modal>
  );
}
