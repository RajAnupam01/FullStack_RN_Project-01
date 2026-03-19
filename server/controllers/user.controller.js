import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const getMyProfile = AsyncHandler(async(req,res)=>{
    const user = req.user
    if(!user){
        throw new ApiError(401,"user not found.")
    }
    return res.json(new ApiResponse(200,user,"Current User fetched successfully."))
})