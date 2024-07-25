/**
 ** ALGORITHM
 ** get user from authentication
 ** get avatar file from frontend
 ** check if user exist in db
 ** upload image on cloudinary and delete it from server
 ** update in user document 
 ** delete old file from cloudinary
 ** send response
 */ 

 import {ApiError} from '../../api/error.js';
 import {ApiResponse} from '../../api/response.js';
 import {User} from '../../model/user.model.js';
 import {cloudinaryUpload, cloudinaryDelete} from '../../util/cloudinary.js'
 import fs from 'node:fs'

 async function updateAvatar(req,res,_){
    const { avatar } = req.files.avatar[0].path;
    const user = req?.user;
    let avatarUrl;

    if(!user) {
        await fs.unlinkSync(avatar);
        throw new ApiError(404,"User not Found");
    }
    try {
        avatarUrl = await cloudinaryUpload(avatar,"image"); // upload new url
    } catch (error) {
        await fs.unlinkSync(avatar);
        res.status(500).json(new ApiError(503,error.message || "Server Failed while uploading avatar"));   
    }
    const newUser = await User.findByIdAndUpdate(user._id,{
        $set:{
            avatar: avatarUrl ? avatarUrl : avatar,
        }
    }, { new:true }).select("-password -refreshToken -email");

    try {
        await cloudinaryDelete(user.avatar); 
    } catch (error) {
        throw new ApiError(503,error.message || "Server Failed while deleting avatar")  
    }

    return res.status(200)
        .json(new ApiResponse(200,"avatar updated",newUser))
 }

 export default updateAvatar