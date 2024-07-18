import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcryptjs'

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

//* mongoose event
//** pre("save") =>  call event before save */
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});


export const User = mongoose.model("User",userSchema);