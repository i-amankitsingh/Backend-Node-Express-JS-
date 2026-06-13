import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const healthcheck = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(
            {
                "message": "OK"
            }
        )
    //TODO: build a healthcheck response that simply returns the OK status as json with a message
})

export {
    healthcheck
}
