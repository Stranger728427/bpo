import { PiFileTextDuotone, PiXCircleDuotone } from 'react-icons/pi';
import styles from './UploadFile.module.scss';

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
}: UploadFileProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileChange(selectedFile);
  };

  const openFileExplorer = () => fileInputRef.current?.click();

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

          <button
            type="button"
            className={styles.removeFile}
            onClick={() => {
              onFileChange(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            aria-label="Remove file"
          >
            <PiXCircleDuotone size={18} />
          </button>
        </div>
      )}
    </>
  );
}
