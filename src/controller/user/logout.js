/** ALGORTIHM
 * get user from auth middleware
 * find user from DB
 * user doesn't exist throw error
 * user existed then
 * overide refresh token from DB {empty tokens}
 * also overide tokens from cookie {empty tokens}
 * send response
 */

import { ApiError } from "../../api/error.js";
import { ApiResponse } from "../../api/response.js";
import { User } from "../../model/user.model.js";
import {cookiesOptions} from './util/cookieOptions.js'

async function logout(req,res){
    const user = req?.user;
    if(!user) throw new ApiError(404,"User not found");
    
    await User.findByIdAndUpdate(user._id, 
        { 
            $unset: { 
                refreshToken : 1 // removes field from document
            } 
        }, 
        {
            new:true
        });

    return res
            .status(200)
            .clearCookie("accessToken",cookiesOptions)
            .clearCookie("refreshToken",cookiesOptions)
            .json(new ApiResponse(200,"User successfully logged out",[]));   
}

export default logout