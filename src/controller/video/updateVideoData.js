
//* get userdata data from body

import { ApiError } from "../../api/error.js";
import { ApiResponse } from "../../api/response.js";
import { Video } from "../../model/video.model.js";
import { cloudinaryDelete, cloudinaryUpload } from "../../util/cloudinary.js";

async function updateVideoData(req,res) {
    const { title ,description, isPubic }= req?.body;
    const thumbnailFile = req?.files?.thumbnail?.at(0)?.path || "";
    const videoId = req?.params?.id;
    const user = req.user;

    const video = await Video.findById(videoId);

    if(user._id !== video.owner) throw new ApiError(401,"Unauthorized request");

    let thumbnailUrl;
    try {
        if(thumbnailFile){
            thumbnailUrl = await cloudinaryUpload(thumbnailFile,"Thumbnail");
        }
    } catch (error) {
        throw new ApiError(500,error.message || "Server fail to upload thumbnail");
    }

    const updateVideo = await Video.updateOne(
        {
            _id : video._id
        },
        {
            $set:{
                title: title ? title : video.title,
                description: description ? description : video.description,
                isPublic:isPubic ? isPubic : video.isPublic,
                thumbnail: thumbnailUrl ? thumbnailUrl.secure_url : video.thumbnail
            }
        },
        {
            new: true,
        }
    );
    await updateVideo.save();

    try {
        if(thumbnailUrl){
            await cloudinaryDelete(video.thumbnail, "image");
        }
    } catch (error) {
        throw new ApiError(500,"Fail to upload file")
    }

    return res.status(200).json(new ApiResponse(200,"OK",updateVideo))

}

export default updateVideoData