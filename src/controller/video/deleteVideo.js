import { ApiError } from "../../api/error.js";
import { ApiResponse } from "../../api/response.js";
import { Video } from "../../model/video.model.js";
import { cloudinaryDelete, cloudinaryUpload } from "../../util/cloudinary.js";

async function deleteVideo(req,res) {
    const videoId = req.params.id;
    const user = req.user;

    const video = await Video.findById(videoId);

    if(user._id !== video.owner) throw new ApiError(401,"Unauthorised user requesr");

    await Video.deleteOne({_id:video._id});

    try {
        if(video?.thumbnail){
            await cloudinaryDelete(video?.thumbnail, "video");
        }
        await cloudinaryDelete(video?.videoFile, "video");
    } catch (error) {
        throw new ApiError(500,error.message || "Fail to delete video");
    }

    return res.status(200).json(new ApiResponse(202,"ok",[]));
}

export default deleteVideo;