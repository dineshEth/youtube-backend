import { model, Schema } from "mongoose";

const postSchema = new Schema({
    post:{
        type:String,
        require:true,
        max:[1, "maximum 1 post"]
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type:String,
        default:"",
        max:[250," maximum 250 characters"]
    },
    
}, 
{ timestamps: true})

export const Post = model("Post", postSchema);