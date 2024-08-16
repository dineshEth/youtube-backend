import { ApiError } from "../../api/error.js";
import { ApiResponse } from '../../api/response.js'
import { Comment } from "../../model/comment.model.js"
import { Video } from "../../model/video.model.js";

async function commentOnVideo(req,res) {
    const videoId = req?.params?.id;
    const user = req?.user;
    const commentText = req?.body?.comment;
    if(!commentText) throw new ApiError(400,"all fields are required");

    if(!videoId) throw new ApiError(404,"invalid video url");
    const video = await Video.findOne({"_id":videoId});

    if(!video) throw new ApiError(404,"Video not found");

    let comment;
    try {
        comment = await Comment.create({
            video:video._id,
            comment:commentText,
            owner:user._id
        });
    } catch (error) {
        throw new ApiError(500,error.message || "Server failed")
    }

    comment.save();

    if(!comment) throw new ApiError(404,"comment unsuccessfull");

    return res.status(200).json(new ApiResponse(201,"ok",comment));
    
}

export default commentOnVideo;