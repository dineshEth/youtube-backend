/**
 * ALGORITHM
 * get user from auth
 * get user detail : firstname, lastname, bio { field allowed to update }
 * check no field is empty
 * find user 
 * update user details and save with 
 * generate new tokens
 * store new refresh token in user document
 * store new tokens in cookies
 * send response
 */

import { ApiError } from "../../api/error.js";
import { ApiResponse } from "../../api/response.js";
import { User } from "../../model/user.model.js";
import generateRefreshAndAccessTokens from './util/token.js'
import {cookiesOptions} from './util/cookieOptions.js'

async function updateUserData(req,res){
    const user = req.user;
    const {firstName, lastName} = req.body;
    if(!user) throw new ApiError(404,"User not found");
    if(!firstName || !lastName) throw new ApiError(401,"All fields are required");
    
    const updatedUser = await User.findByIdAndUpdate(user._id,
        {
            $set:{
                fullname:firstName + " " + lastName,
            }
        },
        {
            new:true
        }
    ).select('-password -refreshToken -email');

    const {accessToken, refreshToken} = await generateRefreshAndAccessTokens(updatedUser._id);
    if(!accessToken || !refreshToken) throw new ApiError(400,"Token not found");
    await User.findByIdAndUpdate(updatedUser.id,
        {
            $set:{
                refreshToken:refreshToken
            },
        },
        {new:true})
        
        // todo : update cookies with new accesstoken and refreshtoken
    return res.status(200)
    .cookie("accessToken",accessToken,cookiesOptions)
    .cookie("refreshToken",refreshToken,cookiesOptions)
    .json(new ApiResponse(200,"User updated",updatedUser));
}


export default updateUserData