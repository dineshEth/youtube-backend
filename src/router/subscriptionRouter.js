import { Router } from "express";
import { subcribeAndUnsubscribeChannel } from "../controller/subscription/index.js";
import { auth } from "../middleware/auth.middleware.js";

const subscriptionRouter = Router()

//! ( :id || :username ) of user.
//? implement :username controller
subscriptionRouter.post('/subscribe/:id',auth, subcribeAndUnsubscribeChannel);

export default subscriptionRouter;