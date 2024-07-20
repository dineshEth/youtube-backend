/**
 * ALGORITHM
 * get user token from cookies or headers
 * decode token
 * find user from id decoded from decodedToken
 * add user to req class
 * call next()
 */

import jwt from "jsonwebtoken";
import {conf} from '../config/conf.js'
import { ApiError } from '../api/error.js'
import { User } from '../model/user.model.js'



async function auth(req,res,next){
    try {
        const token = req.cookies?.acccessToken || req.headers["authentication"]?.split(" ").at(1);
        if(!token) throw new ApiError(404, "User token not found");

        const decodedToken = await jwt.verify(token,conf.access_token_secret);

        if(!decodedToken) throw new ApiError(401, "Unauthorized request");

        const user = await User.findById(decodedToken?._id).select("-refreshToken -email -passord");
        if(!user) throw new ApiError(404,"User not found");
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(500,error.message || "Server Internal Error")
    }
}

export { auth }