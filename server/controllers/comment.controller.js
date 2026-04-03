import Comment from "../models/comment.model.js";
import Pin from "../models/pin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const addComment = AsyncHandler(async (req, res) => {
    const userId = req.user._id;
    const pinId = req.params.id;

    const pin = await Pin.findById(pinId);
    if (!pin) {
        throw new ApiError(404, "No such pin exists.");
    }


    const { content } = req.body;

    if (!content || content.trim().length === 0) {
        throw new ApiError(400, "Please enter a valid comment.");
    }

    const comment = await Comment.create({
        content: content.trim(),
        user: userId,
        pin: pinId
    });

    const populatedComment = await Comment.findById(comment._id)
        .populate("user", "name avatar");

    return res
        .status(201)
        .json(new ApiResponse(201, populatedComment, "Comment added successfully."));
});


export const getComments = AsyncHandler(async (req, res) => {
    const pinId = req.params.id;

    const pin = await Pin.findById(pinId);
    if (!pin) {
        throw new ApiError(404, "No such pin exists.");
    }

    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const comments = await Comment.find({ pin: pinId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name avatar");

    return res.status(200).json(
        new ApiResponse(200, comments, "Comments fetched successfully")
    );
});

