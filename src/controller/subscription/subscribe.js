import { ApiError } from "../../api/error.js";
import { User } from "../../model/user.model.js";
import { Subscription } from '../../model/subscription.model.js';
import { ApiResponse } from "../../api/response.js";

async function subcribeAndUnsubscribeChannel(req,res) {
    const channelId = req?.params?.id;
    const user = req?.user;

    if(!channelId) throw new ApiError(400,"invalid channel id");
    const channel =  await User.findOne({_id:channelId});
    if(!channel?._id) throw new ApiError(404,"user profile not found");
    
    const isSubscriber = await Subscription.findOne({
        $and:[
            {
                subscriber : user._id
            },
            {
                channel: channel?._id,
            },
        ]
    });

    try {
        if(isSubscriber?._id){
            await Subscription.deleteOne({ _id : isSubscriber?._id});
            return res.status(200).json(new ApiResponse(200,"ok",[]));
        } 
        else {
            await Subscription.create({
                subscriber: user._id,
                channel: channel?._id
            });

            return res.status(200).json(new ApiResponse(200,"ok",[]));
        }
    } catch (error) {
        throw new ApiError(500, error.message || "Server failed");
    }
} 

export default subcribeAndUnsubscribeChannel