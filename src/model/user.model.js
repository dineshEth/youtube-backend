import mongoose, { Schema} from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { conf } from '../config/conf.js'

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
    console.log(this.modifiedPaths().includes("password"));
    if(!this.modifiedPaths().includes('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});


//** methods defining */
//* compares password
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}

//* AccessToken generator
userSchema.methods.accessTokenGenerator = async function(){
    return await jwt.sign(
        {
            _id : this._id,
            fullname: this.fullname,
            email:this.email,
            avatar:this.avatar,
            coverImage:this.coverImage,
            username:this.username
        },
        conf.access_token_secret,
        { 
            expiresIn:conf.access_token_expiry
        }
    );
}
//* RefreshToken generator
userSchema.methods.refreshTokenGenerator = async function (){
    return await jwt.sign(
        {
            _id:this._id
        },
        conf.refresh_token_secret,
        {
            expiresIn:conf.refresh_token_expiry
        }
    );
}

export const User = mongoose.model("User",userSchema);