import { User } from "../../../model/user.model.js";
import { Video } from "../../../model/video.model.js";
import {ApiError} from '../../../api/error.js';

async function videos(req,res) {
    const user = req.user;

    const subscribers = await User.aggregate([
        {
            $lookup:{
                from:"Subscriptions",
                localField:"_id",
                foreignField:"channels",
                as:"Subscribers"
            }
        },
        {
            $project:{
                "$Subscribers.subscriber":1,
                "$Subscriber._id":0
            }
        }
    ]);
    let subscribersArrays = [];

    subscribers?.map(subscriber => {
        subscribersArrays.push(subscriber);
    } );

    let Videos = await Video([
        {
            $match:{
                "owner":{
                    $in:subscribersArrays
                }
            }
        },
        {
            sort: {
                "createdAt":-1
            }
        },
        {
            $limit:200
        }
    ]);

    if(!Videos) {
        //* if no videos found for subscribed channels
        //* then select random videos 
        Videos = await Video.aggregate([
            {
                $sample: {
                    size: 500,
                }
            },
            {
                $sort:{
                    "createdAt":-1
                }
            }
        ])
    }
}

export default videos;