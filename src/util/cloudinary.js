import {v2 as cloudinary} from 'cloudinary';
import fs from 'node:fs';
import { ApiError } from '../api/error.js';
import { resolveObjectURL } from 'node:buffer';

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
        const publicId = await extractPublicUrlIdFromPublicUrl(publicUrl);
        await cloudinary.uploader.destroy(publicId,{
            resource_type: type || "image"
        });
    } catch (error) {
        throw new ApiError(500,error.message || "Server failed while removing")
    }
}

function extractPublicUrlIdFromPublicUrl(publicUrl = ""){
    try {
        if(!publicUrl) throw new ApiError(500,"Server fail to extract publicId");
        const publicId = publicUrl.split('/').at(-2) + "/" + publicUrl.split('/').at(-1).split('.').at(-2);
        return publicId
    } catch (error) {
        throw new ApiError(500,error.message || "Server fail to extract publicId")
    }
}



export {cloudinaryUpload , cloudinaryDelete}