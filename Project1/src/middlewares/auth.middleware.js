const UserModel = require("../models/user.model")
const ApiError = require("../utils/apiError")
const jwt=require('jsonwebtoken')

let authMiddleware=async (req,res,next)=>{
  try {
    
    let accessToken=req.cookies.accessToken

    if(!accessToken)
       throw new ApiError(401,"Access token not found")

   let decode=jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY)

   if(!decode) throw new ApiError(401,"Unauthorized token")
    
    let user=await UserModel.findById(decode.id)

    if(!user) throw new ApiError(404,"User not found")

    req.user=user

    next()

  } catch (error) {
    next(error)
  }
}

module.exports=authMiddleware
