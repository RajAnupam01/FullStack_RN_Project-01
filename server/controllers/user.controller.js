import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../utils/cloudinary.js";

export const getMyProfile = AsyncHandler(async(req,res)=>{
    const user = req.user
    if(!user){
        throw new ApiError(401,"user not found.")
    }
    return res.json(new ApiResponse(200,user,"Current User fetched successfully."))
})

export const updateMyProfile = AsyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {name,email} = req.body;

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,"user not found.")
    }
    if(name && name !== user.name){
        const nameExists = await User.findOne({name});
        if(nameExists && nameExists._id.toString() !== userId.toString()){
            throw new ApiError(409,"Name is already taken.")
        }
        user.name = name;
    }

    if(email && email.toLowerCase() !== user.email){
        const emailExists = await User.findOne({email: email.toLowerCase()})
        if(emailExists && emailExists._id.toString() !== userId.toString()){
            throw new ApiError(409,"Email is already in use.")
        }
        user.email = email.toLowerCase()
    }

    const buffer = req.file?.buffer;
    if(buffer){
        if(user.avatarPublicId){
            try {
                await deleteImageFromCloudinary(user.avatarPublicId);
            } catch (error) {
                throw new ApiError(500, "failed to delete old avatar.")
            }
        }
        const uploaded = await uploadImageToCloudinary(buffer)
        user.avatar = uploaded.url;
        user.avatarPublicId = uploaded.public_id;
    }

    await user.save({validateBeforeSave:true});
    const updatedUser = await User.findById(userId).select("-password -refreshToken").lean();
    return res.json(new ApiResponse(200,updatedUser,"User updated successfully."));
})