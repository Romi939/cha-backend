import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser= asyncHandler(async (req,res)=>{
   

    const {fullname,email,username,password}=req.body;
    console.log("email:",email);

    if([fullname,email,username,password].some((field)=> field?.trim()==="")){
        throw new ApiError(400,"all fields are required")
    }

    const existedUser = User.findone({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username aleady exist")
    }

    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverImageLocalpath=req.files?.coverImage[0]?.path;

    if(!avatarLocalpath){
        throw new ApiError(400,"avatar file is required")
    }

    const avatar= await uploadOnCloudinary(avatarLocalpath)
    const coverImage= await uploadOnCloudinary(coverImageLocalpath)

    if(!avatar){
        throw new ApiError(400,"avatar is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser =await User.findById(user._id).select(
        "-password -refreshToken"    
    )

    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )

})

export {registerUser}
