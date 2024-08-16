import { ApiError } from "../../../api/error.js";
import { ApiResponse } from "../../../api/response.js";
import { Video } from "../../../model/video.model.js";

async function getVideo(req,res) {
    const videoId = req?.params?.id;
    const user = req?.user;

    const video = await Video.findById(videoId);
    if(!video) throw new ApiError(404,"video not found for id");

    const videoAndData = await Video.aggregate([
        {
            $match: {
                "_id" : video._id
            }
        },
        {
            $lookup:{
                from:"User",
                localField:"owner",
                foreignField:"_id",
                as:"owner"  // override the owner field
            }
        },
        {
            $lookup:{
                from:"Comment",
                localField:"_id",
                foreignField:"video",
                as:"Comments"
            }
        },
        {
            $lookup:{
                from:"Like",
                localField:"_id",
                foreignField:"likeOwner",
                as:"Likes"
            }
        },
        {
            $lookup:{
                from:"Subscription",
                localField:"owner",
                foreignField:"channel",
                as:"Subscribers"
            }

        },
        {
            $addFields:{
                likes: { $count: "$Likes"},
                susbcribers:{$count:"$Subscribers"},
                isSubscribed:{ 
                    $cond:{
                        if:["$Subscribers.subscriber",user._id],
                        then:true,
                        else:false
                    }
                },
                isLiked: {
                    $cond:{
                        if:["$Likes.likeOwner",user._id],
                        then:true,
                        else:false
                    }
                }
            }
        },
        {
            $project:{
                "$owner.email":0,
                "$owner.refreshToken":0,
                "$owner.password":0,
                "$owner.isPublicAccount":0,                
                "$owner.coverImage":0,
                "$Subscribers":0,
                "$Likes":0               
            }
        }
    ])
    // todo : add recommended video  and limit : 50 
    // todo : also get user details for all comments;

    if(!videoAndData) throw new ApiError(500,"Server internal error");
    
    return res
        .status(200)
        .json(new ApiResponse(202,"Ok",videoAndData));
}


export default getVideo