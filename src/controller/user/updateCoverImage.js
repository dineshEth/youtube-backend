/**
 * ALGORITHM
 * get user from auth
 * get coverimage from frontend
 * find user from db
 * upload image to cloudinary and delete it from server
 * update userimage url in user document
 * delete old coverimage from cloudinary
 * send response
 */
import {ApiError} from "../../api/error.js"
import {ApiResponse} from "../../api/response.js"
import {cloudinaryDelete,cloudinaryUpload} from '../../util/cloudinary.js';
import {User} from '../../model/user.model.js'

async function updateCoverImage(req,res,){
    const user = req.user;
    const coverImage = req?.files?.coverImage?.at(0)?.path;
    let coverImageUrl = "";
    if(!user) throw new ApiError(404,"User not found");
    try {
        if(!coverImage) throw new ApiError(404,"User not found");
        coverImageUrl = await cloudinaryUpload(coverImage);
    } catch (error) {
        throw new ApiError(404, error.message || "User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { 
            $set:{
                coverImage: coverImageUrl ? coverImageUrl.secureUrl : user.coverImage
            }
        },
        {new :true}
    ).select("-password -email -refreshToken");

    try {
        await cloudinaryDelete(user.coverImage, "image")
    } catch (error) {
        throw new ApiError(500,"server failed to delete old coverimage");
    }

    return res.status(200).json( new ApiResponse(200,"coverImageUpdated",updatedUser));
}

export default updateCoverImage