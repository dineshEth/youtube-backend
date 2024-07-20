import { ApiError } from "../../../api/error.js";
import { User } from "../../../model/user.model.js";

async function generateRefreshAndAccessTokens(userId){
    try {
        const user = await User.findById(userId);
        if(!user) throw new ApiError(404,"User Not Found");
        const accessToken = await user.accessTokenGenerator();
        const refreshToken = await user.refreshTokenGenerator()
        if(!accessToken || !refreshToken) throw new ApiError(409,"Bad request");
        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500,error.message || "Server failed while generatins tokens");
    }
}

export default generateRefreshAndAccessTokens;