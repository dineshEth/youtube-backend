import { ApiError } from "../../../api/error.js";
import { ApiResponse } from "../../../api/response.js";
import { User } from "../../../model/user.model.js";
import { Video } from "../../../model/video.model.js";


async function getVideosForUsername(req,res) {
    const {username} = req?.params;
    
    if(!username) throw new ApiError(404,"invalid username");
    const user = await User.findOne({"username":username},{ email:0,refreshToken:0,password:0});
    if(!user) throw new ApiError(404,"User not found");


    let userVidoes;
    try {
        userVidoes = await Video.find({"owner":user._id}).sort({"createdAt":-1});
    } catch (error) {
        throw new ApiError(500,error.message || "Server failed");
    };

    return res.status(200).json(new ApiResponse(200,"ok",userVidoes));

}

 export default getVideosForUsername