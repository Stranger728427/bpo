import { useRef, useState, useCallback } from 'react';
import { useTruncateFileMutation } from './components/api/useTruncateFile';
import { useUploadContactsMutation } from './components/api/useUploadContacts';

type UseFileUploadProps = {
  campaignId: string;
};

export const useFileUpload = ({ campaignId }: UseFileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileMutation = useUploadContactsMutation();
  const truncateFileMutation = useTruncateFileMutation();

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

      fileMutation.mutateAsync(
        { file: selectedFile, campaignId },
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
    isUploading: fileMutation.isPending,
    isTruncating: truncateFileMutation.isPending,
    isSuccess: fileMutation?.isSuccess,
  };
};
