import mongoose, {Schema} from "mongoose";

/**
 ** User: 
 **      username,
 **      email,
 **      password,
 **      fullname,
 **      isPublicAccount,
 **      avatar,
 **      coverImage,
 **      refreshToken
 */

const userSchema = new Schema(
    {
        username:{
            type:String,
            unique:true,
            max:[30,"30 character atmost"],
            min:[6,"6 character atleast"],
            require:true,
        },
        fullname:{
            type:String,
            require:true,
            max:[30,"30 character atmost"],
        },
        email:{
            type:String,
            max:[50,"50 character atmost"],
            require:true,
        },
        password:{
            type:String,
            require:true,
        },
        avatar:{
            type:String,
            require:true,
            default:""
        },
        coverImage:{
            type:String,
            default:""
        },
        isPublicAccount:{
            type:Boolean,
            default:true,
            require:true,
        },
        refreshToken:{
            type:String,
            default:""
        }
    },
    {
        timestamps:true
    }
);

export const User = mongoose.model("User",userSchema);