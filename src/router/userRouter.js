import { Router } from "express";
import { signup } from "../controller/user/index.js";
import { upload } from "../middleware/upload.middleware.js";

//* create a router
const userRouter = Router();



//*  add routes 
userRouter.post('/',
    upload.fields([
        { name:"avatar", maxCount:1},
        { name:"coverImage", maxCount:1}
    ]),
    signup)

export default userRouter;


