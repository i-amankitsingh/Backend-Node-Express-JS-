import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("No file path provided");
            return null;
        }

        console.log("Uploading file:", localFilePath);
        console.log("File exists:", fs.existsSync(localFilePath));

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("Cloudinary upload successful");
        console.log("Cloudinary URL:", response.secure_url);

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;

    } catch (error) {
        console.error("========== CLOUDINARY ERROR ==========");
        console.error(error);
        console.error("Message:", error.message);

        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

const destroyCloudinaryImage = async(publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, { resource_type: 'image' }, (error, result) => {
            if(error){
                reject(error)
            }
            else{
                resolve(result)
            }
        })
    })
}

const destroyCloudinaryVideo = async(publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, { resource_type: 'video' }, (error, result) => {
            if(error){
                reject(error)
            }
            else{
                resolve(result)
            }
        })
    })
}



export {
    uploadOnCloudinary,
    destroyCloudinaryImage,
    destroyCloudinaryVideo
}