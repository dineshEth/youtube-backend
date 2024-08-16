import {ApiError} from '../../api/error.js'
import {Like} from '../../model/like.model.js'
import { Video } from '../../model/video.model.js';

async function likeVideo(req,res) {
    const videoId = req?.params?.id;
    const user = req?.user;

    if(!videoId) throw new ApiError(404,"invalid video url");
    const video = await Video.findOne({"_id":videoId});

    if(!video) throw new ApiError(404,"Video not found");

    //* if video already liked by user then unlike (grab your ike back)
    //* if video is not liked then like the video 

    const checkLikedOrNot = await Like.findOne({
        $and: [
            {"video":video._id},
            {"likedOwner":user._id}
        ]
    });

    if(checkLikedOrNot){
        await Like.deleteOne({"_id":checkLikedOrNot._id});
        return res.status(200).json(new ApiError(200,"OK",[]));
    } 
    else{
        const liked = await Like.create({
            "video":video._id,
            "likeOwner":user._id
        });
        await liked.save()
        return res.status(200).json(new ApiError(200,"OK",liked));
    }
}

export default likeVideo;