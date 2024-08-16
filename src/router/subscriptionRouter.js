import { Router } from "express";
import { subcribeAndUnsubscribeChannel } from "../controller/subscription/index.js";

const subscriptionRouter = Router()

//! ( :id || :username ) of user.
//? implement :username controller
subscriptionRouter.post('/subscribe/:id',subcribeAndUnsubscribeChannel);

export default subscriptionRouter;