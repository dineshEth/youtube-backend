import { ApiError } from "../../api/error.js";
import { ApiResponse } from '../../api/response.js';
import { Post } from '../../model/post.model.js';


async function updatePost(req,res) {
    const { description } = req?.body;
    const user = req?.user;
    const postId = req?.params;

    if(!description) throw new ApiError(400,"All fields are require");
    if(!user) throw new ApiError(404,"user not found");
    
    const post = await Post.findOne({_id:postId});
    
    if(!post) throw new ApiError(404,"Post not found");

    if(post.owner !== user._id) throw new ApiError(401, "Unauthorized user");

    const updatedPost = await Post.updateOne(
        {"_id":post._id },
        {
            $set:{
                description,
            }
        });

    return res.status(200).json(new ApiResponse(200,"ok", updatedPost));
}

export default updatePost;