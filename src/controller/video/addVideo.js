import { ApiError } from "../../api/error.js";
import { ApiResponse } from "../../api/response.js";
import { Video } from "../../model/video.model.js";
import { cloudinaryUpload } from "../../util/cloudinary.js";

// todo: Algorithm
//* get videofile and thumbnail? from multer
//* get title, description?, isPublic? from body
//* get if user exist 
//* upload video file and get url and duration of video
//* upload thumbnail if exist
//* create a document and store it in video collection
//* send response


async function addVideo(req,res) {
    const { title, description, isPublic} =  req?.body;
    const videoFile = req?.files?.videoFile?.at(0)?.path;
    const thumbnailFile = req?.files?.thumbnail?.at(0)?.path || "";

    if(!videoFile || !title ) throw new ApiError("video file or title are required")

    const user = req?.user;
    if(!user) throw new ApiError(404,"User not found");
    
    //* upload on cloudinary
    let videoData;
    let thumbnailUrl;
    try {
        if(videoFile){
            videoData = await cloudinaryUpload(videoFile, "Video");
        }
        if(thumbnailFile){
            thumbnailUrl = await cloudinaryUpload(thumbnailFile, "Thumbnail")
        }
        
    } catch (error) {
        throw new ApiError(500,error.message || "Server fail to upload video");
    }

    if(!videoData) throw new ApiError(500,"Server fail to upload")

    const video = await Video.create({
        title,
        description,
        videoFile: videoData?.secure_url,
        thumbnail: thumbnailUrl ? thumbnailUrl.secure_url : "",
        isPublic,
        owner:user._id,
    });

    if(!video) throw new ApiError(500,"Server fail to upload");

    return res.status(200).json(new ApiResponse(201,"OK",video));
}

export default addVideo