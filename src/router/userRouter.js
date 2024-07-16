import { Router } from "express";
import { signup } from "../controller/user/index.js";


//* create a router
const userRouter = Router();

//*  add routes 
userRouter.post('/',signup)


export default userRouter;


