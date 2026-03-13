import { useApi } from "@/lib/axios/interceptors";


export const UploadService = () => {
    const { baseApi } = useApi();

const uploadContacts = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return baseApi().post('/feedback/upload-contacts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const truncateFile = async () => {
    return baseApi().post('/truncate_data');
}

const triggerCalls = async () => {
    return baseApi().post('/get_num_feedback');
}

    return {
        uploadContacts,
        truncateFile,
        triggerCalls,
    }
}
