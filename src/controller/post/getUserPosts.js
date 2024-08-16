import { ApiError } from "../../api/error.js";
import { ApiResponse } from '../../api/response.js';
import { Post } from '../../model/post.model.js'
import { User } from "../../model/user.model.js";

async function getUserPosts(req,res) {
    const username = req?.params?.username;
    if(!username) throw new ApiError(400,"username cannot be empty");
    const user = await User.findOne( {"username":username} , { _id:1,username:1,name:1});
    
    if(!user) throw new ApiError(404, "user not found");

    const posts = await Post.find({owner:user._id});

    return res.status(200).json(new ApiResponse(200,"ok",posts));
}

export default getUserPosts