import { Router } from "express";
import { getCurrentUser, getUserChannelProfile, login, logout, signup, updateAvatar, updateCoverImage, updatePassword, updateUserData } from "../controller/user/index.js";
import { upload } from "../middleware/upload.middleware.js";
import {auth} from '../middleware/auth.middleware.js'

//* create a router
const userRouter = Router();



//*  add routes 
userRouter.post('/signup',
    upload.fields([
        { name:"avatar", maxCount:1},
        { name:"coverImage", maxCount:1}
    ]),
    signup);
    
userRouter.post('/login',login);

//* secure routes
userRouter.post('/logout',auth,logout);
userRouter.get('/user',auth,getCurrentUser);
userRouter.patch('/password',auth,updatePassword);
userRouter.patch('/userdata',auth,updateUserData);
userRouter.patch('/avatar',upload.fields([{name:"avatar",maxCount:1}]),auth,updateAvatar);
userRouter.patch('/coverimage',upload.fields([{name:"coverImage", maxCount:1}]),auth,updateCoverImage);
userRouter.get('/profile/:username',auth, getUserChannelProfile);


// todo : add delete user account along with all data (videos, posts, comments, likes... etc)

export default userRouter;


