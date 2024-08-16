import { model, Schema } from "mongoose";

const likeSchema = new Schema(
    {
        video:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        likeOwner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:false
    }
)

export const Like = model("Like",likeSchema);
