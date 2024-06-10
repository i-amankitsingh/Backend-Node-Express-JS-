import {v2 as cloudinary} from 'cloudinary';
import { Console } from 'console';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        //upload the file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("File is uploaded on cloudinary ", res.url)
        fs.linkSync(localFilePath)
        return res;
    }
    catch(error){
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
        console.log("File uploda error: ", error);
    }
}

export default uploadOnCloudinary; 