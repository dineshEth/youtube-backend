/**
 * ALGORITHM
 * get user from auth 
 * get user oldPassword and newPassword from frontend
 * find user from db
 * match oldPassword with user's stored password
 * update password with newPassword
 * and save it 
 * send response
 */

import { ApiError } from "../../api/error.js";
import { ApiResponse } from "../../api/response.js";
import { User } from "../../model/user.model.js";

async function updatePassword(req,res){
    const { oldPassword, newPassword } = req?.body;
    const user = req.user;

    if(!user) throw new ApiError(404,"User not found");
    if(!oldPassword || !newPassword) throw new ApiError(404,"all fields are required");

    const existedUser = await User.findById(user._id);
    if(!existedUser) throw new ApiError(404,"User not found");
    
    const validatePassword = await existedUser.isPasswordCorrect(oldPassword);
    if(!validatePassword) throw new ApiError(404,"user password not match");

    const updatedUser = await User.findByIdAndUpdate(user._id,
        { 
            $set:{
                password: newPassword
            }
        }, 
        {new :true})
        .select("-password -email -refreshToken");
    await updatedUser.save();

    return res.status(200).json(new ApiResponse(200,"password Updated",updatedUser));
}

export default updatePassword