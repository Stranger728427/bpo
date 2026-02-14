import { PiFileTextDuotone, PiXCircleDuotone } from 'react-icons/pi';
import styles from './UploadFile.module.scss';
import { Popconfirm } from 'antd';

type UploadFileProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  accept?: string;
  uploadText?: string;
  buttonText?: string;
  hintText?: string;
  sampleLink?: {
    label: string;
    href: string;
  };
  FileIcon?: React.ReactNode;
  onRemoveFile?: () => Promise<void>; // truncate from parent
  isRemoving?: boolean; // loading state from parent
};

export default function UploadFile({
  file,
  onFileChange,
  fileInputRef,
  accept = '.csv,.xls,.xlsx',
  uploadText = 'Drop files to upload',
  buttonText = 'Choose File',
  hintText = 'CSV or Excel file with name and phone number columns.',
  sampleLink,
  FileIcon = <PiFileTextDuotone size={24} />,
  onRemoveFile,
  isRemoving = false,
}: UploadFileProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileChange(selectedFile);
  };

  const openFileExplorer = () => {
    if (!isRemoving) {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = async () => {
    if (isRemoving) return;

    try {
      if (onRemoveFile) {
        await onRemoveFile(); // wait for truncate success
      } else {
        onFileChange(null);
      }

      // clear input only after success
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch {
      // do nothing (parent handles error message)
    }
  };

  return (
    <>
      {!file ? (
        <div className={styles.uploadArea}>
          <p className={styles.uploadText}>{uploadText}</p>
          <span className={styles.uploadOr}>or</span>

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            hidden
            onChange={handleChange}
          />

          <button
            type="button"
            className={styles.chooseFileButton}
            onClick={openFileExplorer}
            disabled={isRemoving}
          >
            {buttonText}
          </button>

          <p className={styles.uploadHint}>
            {hintText}{' '}
            {sampleLink && (
              <a
                href={sampleLink.href}
                className={styles.sampleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sampleLink.label}
              </a>
            )}
          </p>
        </div>
      ) : (
        <div className={styles.uploadedFile}>
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>{FileIcon}</span>
            <span className={styles.fileName}>{file.name}</span>
          </div>

          <Popconfirm
            title="Remove file?"
            description="This will remove the uploaded file from server."
            onConfirm={handleRemove}
            okText="Yes"
            cancelText="No"
            disabled={isRemoving}
          >
            <button
              type="button"
              className={styles.removeFile}
              disabled={isRemoving}
              aria-label="Remove file"
            >
              <PiXCircleDuotone size={18} />
            </button>
          </Popconfirm>
        </div>
      )}
    </>
  );
}
