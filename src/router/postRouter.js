import {Router} from "express";
import {auth} from '../middleware/auth.middleware.js';
import {upload} from '../middleware/upload.middleware.js'
import {createPost, deletePost, getPost, getUserPosts, updatePost} from "../controller/post/index.js";


const postRouter = Router();


//* secure routes
// create post
postRouter.post(
    "/post",
    auth,
    upload.single("post"),
    createPost
)
// read post 
postRouter.get("/post/:id",auth, getPost);
// read all post of user
postRouter.get("/:username",auth,getUserPosts);
// update post
postRouter.patch("/post/:id", auth, updatePost);
// delete post
postRouter.delete("/post/:id",auth, deletePost);

export default postRouter