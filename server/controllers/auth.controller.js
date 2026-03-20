import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'


export const GenerateToken = async (userId) =>{
    try {
        const user = await User.findById(userId)
        if(!user){
            throw new ApiError(404,"User not found to generate Token");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({validateBeforeSave:false});

        const sanitizedUser = user.toObject();
        delete sanitizedUser.password;
        delete sanitizedUser.refreshToken;

        return {accessToken, refreshToken,user:sanitizedUser}

    } catch (error) {
        throw new ApiError(500,error.message || "something went wrong while generating tokens");
    }
}


const sendTokenResponse = async (userId,res,message="success",statusCode=200) =>{
    const {accessToken, refreshToken,user} = await GenerateToken(userId);
    return res
    .status(statusCode)
    .json(new ApiResponse(statusCode,{user,accessToken,refreshToken},message))
}

export const RegisterController = AsyncHandler(async (req,res)=>{
    const {name,email,password} = req.body;
    if([name,email,password].some((filed) => !filed || String(filed).trim()=== "")){
        throw new ApiError(400, "All fields are mandatory to fill.");
    }
    const existedUser = await User.findOne({email:email.toLowerCase().trim()})
    if(existedUser){
        throw new ApiError(409,"User with this email already exists.")
    }
    const userPayload = {
        name:name.trim(),
        email:email.toLowerCase().trim(),
        password,
    }
    const user = await User.create(userPayload);

    return sendTokenResponse(user._id,res,"User registered and logged in successfully.",201)
})

export const LoginController = AsyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new ApiError(400,"Email and Password is required.")
    }
    const user = await User.findOne({email:email.toLowerCase().trim()})
    if(!user){
        throw new ApiError(404,"User does not exist. ");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,"Incorrect password or Email.")
    }

    return sendTokenResponse(user._id,res,"User logged in successfully.",200)
})

export const LogoutController = AsyncHandler(async(req,res)=>{
    if(!req.user || req.user._id){
        throw new ApiError(401,"unauthorized request")
    }
    await User.findByIdAndUpdate(req.user._id,{
        $unset:{refreshToken:""}
    })
    res
    .status(200)
    .json(new ApiResponse(200,{},"User logged out successfully."))
})

export const RegenerateAccessTokenController = AsyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.header("Authorization")?.replace("Bearer ","");
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized Request.Refresh token missing.")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh Token is expired or used.")
        }
        const {accessToken,refreshToken} = await GenerateToken(user._id);
        return res
        .json(new ApiResponse(200,{accessToken,refreshToken},"AccessToken regenrated."))
    } catch (error) {
        throw new ApiError(401,error.message)
    }
})