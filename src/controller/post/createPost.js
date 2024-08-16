import { ApiError } from "../../api/error.js";
import { ApiResponse } from '../../api/response.js';
import { Post } from '../../model/post.model.js'
import { cloudinaryUpload, cloudinaryDelete } from '../../util/cloudinary.js'


async function createPost(req,res) {
    const {description} = req?.body;
    const postImage = req?.files?.post?.at(0).path;
    const user = req.user;

    if(!description || !postImage) throw new ApiError(400,"Al fields are require");
    if(!user) throw new ApiError(404,"user not found");

    let postUrl;
    try {
        if(!postImage) throw new ApiError(400,"Post is required");
        postUrl = await cloudinaryUpload(postImage,"Posts");
    } catch (error) {
        throw new ApiError(500,error.message || "Server failed")
    }

    const post = await Post.create({
        description,
        post:postUrl?.secure_url,
        owner: user?._id
    });

    if(!post){
        await cloudinaryDelete(postUrl?.secure_url);
        throw new ApiError(500,"Failed to create post");
    }

    return res.status(200).json(new ApiResponse(201,"ok",post));
}

export default createPost