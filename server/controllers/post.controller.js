import mongoose from "mongoose";
import Pin from "../models/pin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";


export const createPin = AsyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
        throw new ApiError(400, "Please enter the necessary details to create a pins")
    }
    const buffer = req.file?.buffer;
    if (!buffer) {
        throw new ApiError(400, "Image field is required to create a pin.")
    }
    const image = await uploadImageToCloudinary(buffer);
    if (!image) {
        throw new ApiError(500, "Failed to upload the image.")
    }
    const pin = await Pin.create({
        title,
        description,
        category,
        owner:req.user.id,
        image:image.url,
        imagePublicId:image.public_id,
    })
    return res.status(201).json(
        new ApiResponse(201,pin,"Pin Created Successfully.")
    )
})


export const getAllPins = AsyncHandler(async(req,res)=>{
    const pins = await Pin.find().sort({createdAt:-1});

    if(!pins || pins.length == 0){
        throw new ApiError(404,"No Pins exist.")
    }

    return res.json(
        new ApiResponse(200,pins,"All Pin fetched successfully.")
    )
})

export const getOnePin = AsyncHandler(async(req,res)=>{
    const pinId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(pinId)){
        throw new ApiError(400,"Invalid Pin Id")
    }
    const pin = await Pin.findById(pinId)

    if(!pin){
        throw new ApiError(404,"No such Pin Exists.")
    }
    return res.json(
        new ApiResponse(200,pin,"Single pin fetched successfully.")
    )
})

export const getCategoryPins = AsyncHandler(async (req, res) => {
    const { category } = req.query;

    if (!category) {
        throw new ApiError(400, "Category is required.");
    }

    const normalizedCategory = category.toLowerCase();

    const categoryPins = await Pin.find({
        category: normalizedCategory
    })
    .populate("owner", "name avatar")
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            categoryPins,
            categoryPins.length > 0
                ? "Pins fetched successfully."
                : "No pins found for this category."
        )
    );
});

