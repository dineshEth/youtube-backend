import { ApiError } from "../../api/error.js";
import { ApiResponse } from '../../api/response.js';
import { Post } from '../../model/post.model.js'

async function getPost(req,res) {
    const postId = req?.params?.id;
    if(!postId) throw new ApiError(404,"Post not found");
    
    const post = await Post.findById(postId);

    return res.status(200).json(new ApiResponse(200,"ok",post));
}

export default getPost