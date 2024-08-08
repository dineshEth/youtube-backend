import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        video:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        comment:{
            type:String,
            require:true,
            max:[120,"120 characters limited"]
        }
    },
    {
        timestamps:{
            createdAt:true,
            updatedAt:false
        }
    }
);

export const Comment = model("Comment",commentSchema)