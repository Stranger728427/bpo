import { useRef, useState, useCallback, useEffect } from 'react';
import { useTruncateFileMutation } from './components/api/useTruncateFile';
import { useUploadContactsMutation } from './components/api/useUploadContacts';

type UseFileUploadProps = {
  campaignId: string;
};

export const useFileUpload = ({ campaignId }: UseFileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
   const [progress, setProgress] = useState(0);

  const fileMutation = useUploadContactsMutation();
  const truncateFileMutation = useTruncateFileMutation();

  // upload progress event
   useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const resetState = useCallback(() => {
    setFile(null);
    fileMutation.reset();

    const input = fileInputRef.current;
    if (!input) return;

    input.value = '';
  }, [fileMutation]);

  const handleFileUpload = useCallback(
    (selectedFile: File | null) => {
      if (!selectedFile) {
        resetState();
        return;
      }

      fileMutation.mutate(
        { file: selectedFile, campaignId, onProgress:setProgress },
        {
          onSuccess: () => {
            setFile(selectedFile);
          },
          onError: () => {
            resetState();
          },
        }
      );
    },
    [fileMutation, resetState, campaignId]
  );

  const handleTruncateFile = useCallback(() => {
    truncateFileMutation.mutate(campaignId!, {
      onSuccess: () => {
        resetState();
      },
    });
  }, [truncateFileMutation, resetState, campaignId]);

  return {
    file,
    fileInputRef,
    handleFileUpload,
    handleTruncateFile,
    resetState,
    progress,
    isUploading: fileMutation.isPending,
    isTruncating: truncateFileMutation.isPending,
    isSuccess: fileMutation?.isSuccess,
  };
};
