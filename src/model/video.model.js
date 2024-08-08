import mongoose, { Schema } from 'mongoose';

const videoSchema = new Schema(
    {
        title:{
            type:String,
            require:true,
            max:[60,"60 characters limited"],
        },
        description:{
            type:String,
            require:true,
            max:[250,"250 chearcters limited"]
        },
        owner:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            require:true,
        },
        videoFile:{
            type:String,
            require:true
        },
        thumbnail:{
            type:String,
            require: true
        },
        isPublic:{
            type:Boolean,
            default:true
        },
        duration:{
            type:Number,
            default:0
        }
    },
    {
        timestamps:{
            createdAt: true,
            updatedAt:false
        }
    }
);


export const Video = mongoose.model("Video",videoSchema);