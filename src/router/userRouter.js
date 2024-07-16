import { Router } from "express";


//* create a router
const userRouter = Router();

//*  add routes 
userRouter.post('/',(req,res,next)=>{
    res.json({
        message:"ok"
    });
})


export default userRouter;


