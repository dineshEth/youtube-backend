/**
 ** ALGORITHM
 ** get user from auth
 ** return user
 */

import { ApiError } from "../../api/error.js";
import { ApiResponse } from "../../api/response.js";
import {User} from '../../model/user.model.js'

async function getCurrentUser(req,res){
    const user = req.user;
    if(!user) throw new ApiError(404,"User not found");
    const currentUser = await User.findOne({_id: user._id}).select('-password -refreshToken -email');
    if(!currentUser) throw new ApiError(404,"User not found");
    return res.status(200).json(new ApiResponse(203,"OK",user));
}

export default getCurrentUser