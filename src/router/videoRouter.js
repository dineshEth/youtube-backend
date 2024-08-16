import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import {addVideo, commentOnVideo, deleteComment, deleteVideo, getVideo, getVideosForUsername, likeVideo, updateVideoData, videos,} from "../controller/video/index.js";


const videoRouter = Router();

//* secure routes

// addvideo Route
videoRouter
.post(
    "/:username/upload",
    auth, 
    upload.fields([
        { name: "videoFile", maxCount:1},
        {name:"thumbnail", maxCount:1}
    ]),
    addVideo
);
// deleteVideo Route
videoRouter
.delete("/:username/:id/delete",auth, deleteVideo);

// updateVideo Route
videoRouter
.put(
    "/:username/:id/edit",
    auth,
    upload.fields([
        {name:"thumbnail", maxCount:1}
    ]),
    updateVideoData
);

// getVideo single video and its all informations Router
videoRouter.get("/:id", auth, getVideo);
// get all videos for channel
videoRouter.get("/:username", auth, getVideosForUsername);
// get videos for all subscribed channels;
videoRouter.get("/",auth, videos)

//like or unlike video
videoRouter.patch("/video/:id/like",auth,likeVideo);
// comment on Video
videoRouter.patch("/video/:id/comment",auth, commentOnVideo);
// delete comment on video
videoRouter.delete("/video/:id/comment", auth, deleteComment); 
//! here :id is a comment id


export default videoRouter