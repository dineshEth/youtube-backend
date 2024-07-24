
/** ALGORITHM
* get usrname or email and password from frontend
* check if username and email are missing
* find user with email or username from db
* user not exist throw error
* user exist
* check password validation
* password wrong then throw error
* generate accessToken & Refresh Token 
* store refresh Token in user document in database
* store tokens in cookies
* response data and cookies to frontend
*/

import { ApiError } from "../../api/error.js";
import { ApiResponse } from "../../api/response.js";
import { User } from "../../model/user.model.js";
import { cookiesOptions } from "./util/cookieOptions.js";
import generateRefreshAndAccessTokens from "./util/token.js";

async function login(req,res,next){
    //* user details from frontend
    const { username, email, password } = req.body;
    //* details validation 
    if(!email && !username){
        throw new ApiError(403,"Username or email is required");
    }
    //* find user from DB
    const existedUser = await User.findOne({
        $or: [{username},{email}]
    });
    //* through error no user found
    if(!existedUser) throw new ApiError(404,"User not found")
    //* password validation
    const passwordValidation = await existedUser.isPasswordCorrect(password);
    //* through error if password doesn't match
    if(!passwordValidation) throw new ApiError(401,"invalid credentials");
    //* generate accessToken and refreshToken
    const { accessToken, refreshToken } = await generateRefreshAndAccessTokens(existedUser._id);
    ///* check if tokens aren't not generated
    if(!accessToken || !refreshToken) throw new ApiError(503,"Fail to generate tokens")

    //* store refreshToken in db
    const user = await User.findByIdAndUpdate
    (
        existedUser._id,
        {
            refreshToken:refreshToken
        },
        {
            new:true
        }
    ).select("-password -refreshToken");
 
    //* send response
    return res.status(200)
            .cookie("accessToken",accessToken,cookiesOptions)
            .cookie("refreshToken",refreshToken, cookiesOptions)
            .json(new ApiResponse(201,"user logged in",user))
}

export default login