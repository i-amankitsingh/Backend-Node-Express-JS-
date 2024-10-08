import mongoose, { isValidObjectId } from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

    const userId = req.user?._id
    
    if(!isValidObjectId(userId)){
        throw new ApiError(401, "Invalid Channel ID!")
    }

    const totalSubs = await Subscription.find({channel: userId})

    const totalVideos = await Video.find({owner: userId})

    const allVideos = await Video.find({owner: userId})

    const totalLikes = await Like.find({video: {$in: allVideos}})
    
    return res
    .status(200)
    .json(
        new ApiResponse(200, {
            totalLikes: totalLikes.length,
            totalSubscribers: totalSubs.length,
            totalVideos: totalVideos.length
        }, "Channel status data fetched successfully!")
    )

})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel

    const  userId  = req.user?._id
    
    if(!isValidObjectId(userId)){
        throw new ApiError(401, "Invalid User ID!")
    }

    const videos = await Video.find({owner: userId})

    if(!videos){
        throw new ApiError(404, "No videos found!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, videos, "Videos fetched successfully!")
    )

})

export {
    getChannelStats, 
    getChannelVideos
}