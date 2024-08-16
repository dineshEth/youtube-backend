import {ApiError} from '../../api/error.js'
import {ApiResponse} from '../../api/response.js'
import { User } from '../../model/user.model.js';

/** Aggregation pipeline
 * An aggregation pipeline consist of one or more stages that process documents
 * Each stage performs opertions on the input document
 */



async function getUserChannelProfile(req,res){
    const {username} = req?.params;
    const _id = req?.user?._id;
    if(!username) throw new ApiError(404,"username not found");

    const user = await User.find({"username":username},{_id:0,name:1});

    if(!user) throw new ApiError(404,"User not Found");
    let userChannel;
    
    try {
        
        //* aggregate pipeline
        userChannel = await User.aggregate([
            {
                $match:{
                    "username":username
                }
            },
            {
                $lookup:{
                    from:"Subscription",
                    localField:"_id",
                    foreignField:"channel",
                    as: "Subscribers"
                }
            },
            {
                $lookup:{
                    from:"Subscription",
                    localField:"_id",
                    foreignField:"subscriber",
                    as:"Channels"
                }
            },
            {
                $addFields:{
                    subscribers: { $size : "$Subscribers"},
                    channels:{ $size : "$Channels"},
                    isSubscriber: { 
                        $cond:{
                            if:{$in : [_id , "$Subscribers.subscriber"]},
                            then:true,
                            else:false
                        }
                    }
                }
            },
            {
                $project:{
                    Subscribers : false,
                    Channels:false,
                    refreshToken:false,
                    password:false,
                    email:false
                }
            }
        ]);
    } catch (error) {
        console.log("Error", error)
        throw new ApiError(500,error.message || "server fail to fetch user")
    }
     
    if(!userChannel) throw new ApiError(404,"User not found");

    return res
        .status(200)
        .json( new ApiResponse(200,"OK",userChannel));
}

export default getUserChannelProfile