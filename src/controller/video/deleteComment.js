import { ApiError } from "../../api/error.js";
import { ApiResponse } from "../../api/response.js";
import { Comment } from "../../model/comment.model.js";

async function deleteComment(req,res) {
    const commentId = req?.params?.id;
    const user = req?.user;

    if(!commentId) throw new ApiError(400, "invalid comment id");
    const comment = await Comment.findById(commentId);
    if(!comment?._id) throw new ApiError(404,"comment not found");
    if(user._id != comment.owner) throw new ApiError(400,"Unauthorized request");

    try {
        await Comment.findByIdAndDelete(comment?._id);
    } catch (error) {
        throw new ApiError(500, error.message || "Server fail to delete comment");
    }

    return res.status(200).json(new ApiResponse(200,"ok",[]));
 
}

export default deleteComment