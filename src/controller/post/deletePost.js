import { ApiError } from "../../api/error.js";
import { ApiResponse } from '../../api/response.js';
import { Post } from '../../model/post.model.js'

async function deletePost(req,res) {
    const postId = req?.params?.id;
    const user = req?.user;

    if(!postId) throw new ApiError(400,"post is require");
    if(!user) throw new ApiError(400,"user not found");

    const post = await Post.findOne({_id:postId});

    if(!post) throw new ApiError(404,"Post not found");
    if(user?._id !== post?.owner) throw new ApiError(401,"Unauthorized request");

    try {
        await Post.deleteOne({_id:post._id});
    } catch (error) {
        throw new ApiError(500,error.message || "Server failed while deleting post")
    }

    return res.status(200).json(new ApiResponse(200,"ok",[]));
}

export default deletePost