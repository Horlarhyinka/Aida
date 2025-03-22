import axios from 'axios'
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes  } from 'firebase/storage';
import { firebaseConfig } from '../config/config';







const CLOUDINARY_PRESET = "thyh7ivb"
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/lahri/image/upload"





class Uploader{
    constructor(){
        
    }

    uploadFiles = async (fileList:File[]) => {
        if (!Array.isArray(fileList)) {
            fileList = [fileList];
        }
    
        const promises = fileList.map((file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_PRESET);
    
            return axios.post(CLOUDINARY_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        });
    
        try {
            const responses = await Promise.all(promises);
             return responses.map((response) => (response.data as {url: string}).url);
        } catch (error) {
            console.error("Error uploading files:", error);
            throw error;
        }
    };

    uploadAudio = async(blob: Blob)=>{
        const app = initializeApp(firebaseConfig)
        const storage = getStorage(app)
        const fileName = `${Math.floor(Math.random() * (10 ** 8))}.webm`
        try{
        const fileRef = ref(storage, fileName)
        new File([blob], fileName, {type: blob.type, lastModified: new Date().getTime()});

        const uploadRes = await uploadBytes(fileRef, blob,)      
        console.log({uploadRes})  

        }catch(err){
            console.log('audio file upload failed:', err)
        }
    }


}


export const uploadAudioBlob = async (audioBlob: Blob) => {
    // Create FormData object
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/lahri/upload"
    console.log({audioBlob})
    // const file = new File([audioBlob], `${Math.floor(Math.random() * (10 ** 8))}.webm`, {type: audioBlob.type, lastModified: new Date().getTime()});
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio-file');  // 'audio-file' is a placeholder name
    formData.append('upload_preset', CLOUDINARY_PRESET);
    formData.append('resource_type', 'raw'); // Cloudinary treats audio as 'video' resource
    console.log({formData})
    try {
        // Send the request to Cloudinary to upload the audio blob
        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Audio upload res',{response})
        // Return the secure URL of the uploaded audio
        return (response as { data: { secure_url: string} }).data.secure_url;
    } catch (error) {
        console.error('Error uploading audio blob:', error);
        throw error;
    }
};




export default Object.freeze(new Uploader())