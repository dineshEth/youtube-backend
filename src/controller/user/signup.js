import { ApiError } from '../../api/error.js'
import { ApiResponse } from '../../api/response.js'
import { User } from '../../model/user.model.js'
import { cloudinaryUpload } from '../../util/cloudinary.js'
import fs from 'node:fs'
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
    const avatar = req?.files?.avatar?.at(0)?.path;
    const coverImage = req?.files?.coverImage?.at(0)?.path;
    let avatarUrl;
    let coverImageUrl;

    if
    (
        [email,password,firstname,lastname,username].some(field => field.length < 0)
    )
    {
        
        await fs.unlinkSync(avatar)
        if(coverImage) { await fs.unlinkSync(coverImage) }
        throw new ApiError(400,"All fields are required!");
    }

    const existedUser = await User.findOne( {
        $or : [{username},{email}]
        //* find by username or email
    });

    if(existedUser){
        await fs.unlinkSync(avatar)
        if(coverImage)  {await fs.unlinkSync(coverImage)};
        throw new ApiError(403,"User with username or email already exist");
    }

    try {
    if(avatar?.length < 0) throw new ApiError(400,"All fields are required!")
        //* upload files on cloudinary
    avatarUrl = await cloudinaryUpload(avatar,"image");
        if(coverImage?.length > 0){
            coverImageUrl = await cloudinaryUpload(coverImage,"image");
        }

    }catch (error) {
        console.log("ERROR :",error)
        throw new ApiError(503, error.message|| "Sever Failed");
    }

    //* create new user
    const newUser = await User.create(
        {
            username,
            email,
            password,
            fullname: firstname + " " + lastname,
            avatar:avatarUrl.secure_url,
            coverImage:coverImageUrl ? coverImageUrl.secure_url : "",
            isPublicAccount:true
        }
    );

    const user = await User.findById(newUser._id);
    if(!user) {
        throw new ApiError(503,"Something went wrong while registering user");
    }

    return res.status(201).json(new ApiResponse(200,"User successfully registered",user));
}


export default signup;