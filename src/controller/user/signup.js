import { ApiError } from '../../api/error.js'
import { ApiResponse } from '../../api/response.js'
import { User } from '../../model/user.model.js'
import { cloudinaryUpload } from '../../util/cloudinary.js'
/**
 ** ALGORITHM
 ** get user data from frontend (eg. name, email, password ...);
 ** validate user details (not empty, wrong details etc..)
 ** Schema validation ()
 ** check if user already exist with username or email throw error
 ** upload user's images on cloudinary free storage
 ** create a user with user's data
 ** generate access tokens and refresh token
 ** return a response with userid
 */


async function signup(req,res,next){
    const { username, email, password, firstname, lastname } = req?.body;
    const avatar = res.files.avatar[0].path;
    const coverImage = res.files.coverImage[0].path;
    let avatarUrl;
    let coverImageUrl;

    if
    (
        [email,password,firstname,lastname,username].some(field => field.length < 0)
    )
    {
        return res.status(400).json(new ApiError(400,"All fields are required!"));
    }

    const existedUser = await User.findOne( {
        $or : [{username},{email}]
        //* find by username or email
    });
    if(existedUser){
        return res
        .status(400)
        .json(new ApiError(403,"User with username or email already exist"));
    }
    try {
        if(avatar.length < 0){
            return res.status(400).json(new ApiError(400,"All fields are required!"));
        } 
        //* upload files on cloudinary
        avatarUrl = await cloudinaryUpload(avatar,"image");
        coverImageUrl = await cloudinaryUpload(coverImage,"image");
    } catch (error) {
        res.status(500).json(new ApiError(503,"Sever Failed",error.message));
    }

    //* create new user
    const newUser = await User.create(
        {
            username,
            email,
            password,
            fullname: firstname + " " + lastname,
            avatar:avatarUrl,
            coverImage:coverImageUrl ? coverImageUrl : "",
            isPublicAccount:true
        },
        {
            new :true
        }
    );

    const user = User.findById(newUser._id).select("-password -refreshToken");
    if(!user) {
        return res.status(500).json(new ApiError(503,"Something went wrong while registering user"))
    }
    
    res.status(200).json(new ApiResponse(200,"User successfully registered", user));
}


export default signup;