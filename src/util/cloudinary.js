import {v2 as cloudinary} from 'cloudinary';
import fs from 'node:fs';
import { ApiError } from '../api/error';

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
        throw new ApiError(500, error.message || "Server failed while uploading")
    }
}

async function cloudinaryDelete(publicUrl,type){
    try {
        if(!publicUrl) throw new ApiError(404,"PublicUrl not found");
        await cloudinary.uploader.destroy(publicUrl,{
            resource_type: type || "image"
        });
    } catch (error) {
        throw new ApiError(500,error.message || "Server failed while removing")
    }
}





export {cloudinaryUpload , cloudinaryDelete}