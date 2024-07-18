import {v2 as cloudinary} from 'cloudinary';
import fs from 'node:fs';

cloudinary.config({
    cloud_name:"",
    api_key:"",
    api_secret:"",
});


async function cloudinaryUpload(localFilePath,folder){
    try {
        if(!localFilePath) return null;
        // TODO: configure folder structure
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:folder == "image" ? "image" : "video",
            folder:folder == "image" ? "image" : "video",
        });
        await fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        await fs.unlinkSync(localFilePath);
        console.log("CLOUDINARY API ERROR :: ",error.message);
        throw new Error("CLOUDINARY API ERROR :: ",error.message)
    }
}



export {cloudinaryUpload}