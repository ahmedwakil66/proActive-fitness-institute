import { uploadDirect } from '@uploadcare/upload-client';


const imageUploader = async (imageFile) => {
    try {
        const result = await uploadDirect(
            imageFile,
            {
                publicKey: import.meta.env.VITE_imgUpload_Public_key,
                store: 'auto',
            }
        )
        return result;
    }
    catch (error) {
        return error;
    }
};

export default imageUploader;